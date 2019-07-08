let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

let User = model.getModel('user')
let Chat = model.getModel('chat')
let encry = require('./../../utils/encryption')
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
	let { user, pwd, type } = req.body
	let userModel = new User({ user, type, pwd: encry.md5(pwd) })
	userModel.save((err, doc) => {
		if(err) {
			return res.json(status.code_2)
		}
		let { user, type, _id } = doc
		res.cookie('userid', _id)
		return res.json({ code: 0, message: '注册成功', data: doc })
	})
})

// 用户登录
Router.post('/login', (req, res) => {
	let { user, pwd, type } = req.body
	User.findOne({ user: user, pwd: encry.md5(pwd)}, _filter, (err, doc) => {
		if(err) {
			return res.json(status.code_3)
		} else {
			if(doc) {
				if(doc.type != type) {
					return res.json(status.code_5)
				} else {
					res.cookie('userid', doc._id)
					return res.json({ code: 0, message: '登录成功', data: doc })
				}
			} else {
				return res.json(status.code_4)
			}
		}
	})
})

// 用户退出
Router.post('/logout', (req, res) => {
})


module.exports = Router