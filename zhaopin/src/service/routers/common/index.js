let express = require('express')
let svgCaptcha = require('svg-captcha')
let Router = express.Router()
let encry = require('./../../utils/encryption')

// 需要加密处理一下这个临时数据data字段，
// 需要加上失效验证
Router.get('/createTempData', (req, res) => {
	return res.json({ code: 0, message: '临时数据产生成功', data: 'pxy_fremember_18769567910' })
})
/**
 * 图形验证码
 */
Router.get('/getImgVerify', (req, res) => {
	let date = { ...req.query },
		code = svgCaptcha.create(date);
	res.cookie('randomcode', encry.md5(code.text.toLowerCase()))
	return res.json({ code: 0, data: code.data, message: '验证码获取成功' })
})

module.exports = Router