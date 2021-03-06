const mongoose = require('mongoose')
// 连接数据库
const DB_URL = 'mongodb://localhost:27017/fremember'
// mongoose.connect(DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(DB_URL)

let user = require('./user')
let chat = require('./chat')
let position = require('./position')
let company = require('./company')

const models = {
	...user,
	...chat,
	...position,
	...company
}

for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name)
	}
}