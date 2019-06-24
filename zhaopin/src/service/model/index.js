const mongoose = require('mongoose')
// 连接数据库
const DB_URL = 'mongodb://localhost:27017/fremember'
mongoose.connect(DB_URL, { useNewUrlParser: true })

var user = require('./user')
var chat = require('./chat')

const models = {
	...user,
	...chat
}

for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name)
	}
}