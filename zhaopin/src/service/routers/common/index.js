let express = require('express')
let Router = express.Router()

// 需要加密处理一下这个临时数据data字段，
// 需要加上失效验证
Router.get('/createTempData', (req, res) => {
	return res.json({ code: 0, message: '临时数据产生成功', data: 'pxy_fremember_18769567910' })
})


module.exports = Router