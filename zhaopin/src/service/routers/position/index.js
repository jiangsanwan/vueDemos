let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

let Position = model.getModel('position')
let encry = require('./../../utils/encryption')
let status = require('./../../comment')

Router.get('/list', (req, res) => {
	let { pageNum, pageSize = 20 } = req.query
	Position.find({}, (err, doc) => {
		if(err) {
			return res.json(status.code_1)
		} else {
			Position.count({}, (e, count) => {
				if(e) {
					return res.json(status.code_1)
				} else {
					return res.json({ code: 0, message: '数据加载成功', data: { list: doc, total: Math.ceil(count / pageSize) } })
				}
			})
		}
	}).limit(pageSize).skip(pageSize * (pageNum - 1))
})

module.exports = Router