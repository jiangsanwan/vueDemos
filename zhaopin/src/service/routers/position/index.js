let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

let Position = model.getModel('position')
let encry = require('./../../utils/encryption')
let status = require('./../../comment')


const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

/**
 * 牛人获取职位列表
 */
Router.get('/list', (req, res) => {
	let pageSize = 20,
		pageNum = req.query.pageNum,
		data = { ...req.query };
	delete data.pageNum
	if(data.recommendLatest) {
		data.recommendLatest = Number(data.recommendLatest)
	}
	if(data.positionType) {
		data.positionType = Number(data.positionType)
	}
	// let { pageNum, pageSize = 20 } = req.query
	/* 第一个花括号中是查询条件，需要做&&或者||的处理 */
	Position.find(data, (err, doc) => {
		if(err) {
			return res.json(status.code_1)
		} else {
			Position.countDocuments(data, (e, count) => {
				if(e) {
					return res.json(status.code_1)
				} else {
					let total = count == 0 ? 0 : Math.ceil(count / pageSize)
					return res.json({ code: 0, message: '数据加载成功', data: { list: doc, total: total, length: count } })
				}
			})
		}
	}).limit(pageSize).skip(pageSize * (pageNum - 1))// 分页条件
})
/**
 * 牛人根据职位的id值获取职位的详情
 */
Router.get('/detail', (req, res) => {
	let { _id } = req.query
	Position.findOne({ _id: _id }, (err, doc) => {
		if(err) {
			return res.json(status.code_8)
		} else {
			return res.json({ code: 0, message: '职位信息获取成功', data: doc })
		}
	})
})

/**
 * 修改职位被浏览次数
 */
Router.get('/changeVisitors', (req, res) => {
	let { _id } = req.query
	Position.findOne({ _id: _id }, (err, doc) => {
		if(err) {
			return res.json(status.code_8)
		} else {
			let _doc = doc._doc,
				_visitorsNumber = _doc.visitorsNumber + 1,
				setObj = {
					$set: { visitorsNumber: _visitorsNumber }
				};
			MongoClient.connect(url, { useUnifiedTopology: true }, function(_err, db) {
				if (_err) {
					return res.json(status.code_14)
				} else {
					let dbo = db.db("fremember")
					let whereStr = { positionId: _doc.positionId } // 查询条件
					let updateStr = { $set: { visitorsNumber: _visitorsNumber } }
					dbo.collection("positions").updateOne(whereStr, updateStr, function(_e, _r) {
						if (_e) {
							return res.json(status.code_9)
						} else {
							return res.json({ code: 0, message: '修改成功', data: '' })
						}
						db.close()
					})
				}
			})
		}
	})
})
/**
 * 新增职位
 */
Router.post('/addPosition', (req, res) => {
	Position.countDocuments({}, (e, count) => {
		if(e) {
			return res.json(status.code_1)
		} else {
			let positionId = count + 1,
				positionModel = new Position({ ...req.body, positionId: positionId }, false);
			positionModel.save((err, doc) => {
				if(err) {
					return res.json(status.code_13)
				} else {
					return res.json({ code: 0, message: '新增职位成功', data: '' })
				}
			})
		}
	})
})


module.exports = Router