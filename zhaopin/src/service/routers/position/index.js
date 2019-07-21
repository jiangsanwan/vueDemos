let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

let Position = model.getModel('position')
let encry = require('./../../utils/encryption')
let status = require('./../../comment')

/**
 * 牛人获取职位列表
 */
Router.get('/list', (req, res) => {
	let { pageNum, pageSize = 20 } = req.query
	/* 第一个花括号中是查询条件，需要做&&或者||的处理 */
	Position.find({}, (err, doc) => {
		if(err) {
			return res.json(status.code_1)
		} else {
			Position.countDocuments({}, (e, count) => {
				if(e) {
					return res.json(status.code_1)
				} else {
					return res.json({ code: 0, message: '数据加载成功', data: { list: doc, total: Math.ceil(count / pageSize) } })
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


module.exports = Router