let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

let User = model.getModel('user')
let encry = require('./../../utils/encryption')
let JwtUtil = require('./../../utils/jwt')
let status = require('./../../comment')

let _filter = { 'pwd': 0, '__v': 0 }

// 获取get参数使用:req.query
// 获取post参数使用:req.body

// 验证用户名
Router.get('/checkUser', (req, res) => {
	let { user } = req.query
	User.findOne({ user: user }, (err, doc) => {
		if(err) {
			return res.json(status.code_1)
		} else {
			return res.json({ code: 0, message: '用户名可用' })
		}
	})
})

// 新用户注册
Router.post('/register', (req, res) => {
	let { user, pwd, type, imgCode } = req.body
		insertObj = { ...req.body }
	let { randomcode } = req.cookies
	insertObj.pwd = encry.md5(insertObj.pwd)

	delete insertObj.imgCode
	if(randomcode === encry.md5(imgCode)) {
		let userModel = new User({ ...insertObj, applyReadStory: '', applyViewPartners: '', logo: '', timeStamp: 0, active: 0, avatar: '' })
		userModel.save((err, doc) => {
			if(err) {
				return res.json(status.code_2)
			}
			res.cookie('userid', doc._id)
			let _id = doc._id.toString(),
				jwt = new JwtUtil(_id),// 将用户id传入并生成token
				token = jwt.generateToken();
			res.clearCookie('randomcode')
			return res.json({ code: 0, message: '注册成功', data: { ...doc._doc, token: token } })// 将 token 返回给客户端
		})
	} else {
		return res.json(status.code_7)
	}
})

// 用户登录
Router.post('/login', (req, res) => {
	let { user, pwd, type, imgCode } = req.body
	let { randomcode } = req.cookies
	if(randomcode === encry.md5(imgCode)) {
		User.findOne({ user: user, pwd: encry.md5(pwd)}, _filter, (err, doc) => {
			if(err) {
				return res.json(status.code_3)
			} else {
				if(doc) {
					if(doc.type != type) {
						return res.json(status.code_5)
					} else {
						// 设置active字段为1
						let timeStamp = new Date().getTime()
						User.updateOne({ user: user }, { $set: { active: 1, timeStamp: timeStamp } }, (e, d) => {
							if(e) {
								return res.json(status.code_3)
							} else {
								if(type == 'Boss') {
									MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
										if (err) {
											return res.json(status.code_3)
										} else {
											let dbo = db.db("fremember")
											let whereStr = { publisherNickName: user } // 查询条件
											let updateStr = { $set: { active: 1, timeStamp: timeStamp } }
											dbo.collection("positions").updateMany(whereStr, updateStr, function(_err, _res) {
												if (_err) {
													return res.json(status.code_3)
												} else {
													res.cookie('userid', doc._id)
													let _id = doc._id.toString(),
														jwt = new JwtUtil(_id),// 将用户id传入并生成token
														token = jwt.generateToken();
													res.clearCookie('randomcode')
													return res.send({ code: 0, message:'登陆成功', data: { ...doc._doc, token: token } })// 将 token 返回给客户端
												}
												db.close()
											})
										}
									})
								} else {
									res.cookie('userid', doc._id)
									let _id = doc._id.toString(),
										jwt = new JwtUtil(_id),// 将用户id传入并生成token
										token = jwt.generateToken();
									res.clearCookie('randomcode')
									return res.send({ code: 0, message:'登陆成功', data: { ...doc._doc, token: token } })// 将 token 返回给客户端
								}
							}
						})
						
					}
				} else {
					return res.json(status.code_4)
				}
			}
		})
	} else {
		return res.json(status.code_7)
	}
})

// 用户退出
Router.post('/logout', (req, res) => {
	// 设置active字段为0
})
// 通过ID获取用户信息
Router.get('/getBaseInfo', (req, res) => {
	let { _id } = req.query
	User.findOne({ _id: _id }, (err, doc) => {
		if(err) {
			return res.json(status.code_12)
		} else {
			return res.json({ code: 0, message: '用户信息获取成功', data: doc })
		}
	})
})
/*
* 想看他的故事或者工作伙伴
* params index Number 0想看故事，1想看工作伙伴
* params _id String 登录用户的ID
* params targetId String 想看的人的ID
 */
Router.post('/setApply', (req, res) => {
	let { index, _id, targetId } = req.body
	User.findOne({ _id: _id }, (err, doc) => {
		if(err) {
			return res.json(status.code_12)
		} else {
			let _doc = doc._doc,
				setObj = {},
				rsArr = _doc.applyReadStory.split('###'),
				vpArr = _doc.applyViewPartners.split('###'),

				readStory = rsArr.includes(targetId),
				viewParners = vpArr.includes(targetId);
			if(index == 0) {
				if(!readStory) {
					rsArr.push(targetId)
					let _rsArr = rsArr.join('###')
					setObj = {
						$set: { applyReadStory: _rsArr }
					}
				} else {
					setObj = {
						$set: { applyReadStory: rsArr.join('###')}
					}
				}
			} else {
				if(!viewParners) {
					vpArr.push(targetId)
					let _vpArr = vpArr.join('###')
					setObj = {
						$set: { applyViewPartners: _vpArr}
					}
				} else {
					setObj = {
						$set: { applyViewPartners: vpArr.join('###')}
					}
				}
			}
			User.updateOne({ _id: _id }, setObj, { lean: true }, (e, d) => {
				if(e) {
					return res.json(status.code_9)
				} else {
					User.findOne({ _id: _id }, (_err, _doc) => {
						if(_err) {
							return res.json(status.code_12)
						} else {
							return res.json({ code: 0, message: '设置成功', data: _doc })
						}
					})
				}
			})
		}
	})
})

module.exports = Router