let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

let Chat = model.getModel('chat')

Router.post('/changeMsgRead', (req, res) => {// 根据chatId和传入的from修改聊天记录的已读状态
	let { to, chatid } = req.body
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) {
			return res.json(status.code_3)
		} else {
			let dbo = db.db("fremember")
			let whereStr = { $and: [ { to: to }, { chatid: chatid } ] }// 查询条件
			let updateStr = { $set: { read: true } }
			dbo.collection("chats").updateMany(whereStr, updateStr, function(_err, _res) {
				if (_err) {
					return res.json(status.code_17)
				} else {
					return res.json({ code: 0, message: '修改成功' })
				}
			})
		}
	})
})

module.exports = Router