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
					return res.json({ code: 0, message: '数据加载成功', data: { list: doc, total: total } })
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