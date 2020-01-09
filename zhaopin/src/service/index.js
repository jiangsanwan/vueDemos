const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const JwtUtil = require('./utils/jwt')

const model = require('./model')
const Chat = model.getModel('chat')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
// io相关的逻辑还没有写

const userRouter = require('./routers/user')
const comRouter = require('./routers/common')
const positionRouter = require('./routers/position')
const chatRouter = require('./routers/chat')

// 全局校验接口的token
app.use((req, res, next) => {
	if (req.url.indexOf('/user/login') < 0 && req.url.indexOf('/user/register') < 0 && req.url.indexOf('/user/checkUser') < 0 && req.url.indexOf('/common/getImgVerify?') < 0) {// 排除不需要校验token的接口
		let token = req.headers.token
			jwt = new JwtUtil(token)
			result = jwt.verifyToken()
		// 如果考验通过就next，否则就返回登陆信息不正确
		if (result == 'err') {
			return res.send({ code: 200, message: '登录已过期,请重新登录' })
		} else {
			next();
		}
	} else {
		next();
	}
})

io.on('connection', (socket) => {
	socket.on('getChatList', (data) => {// 消息入口获取未读信息列表，只要to这个字段就可以了
		let { from, to } = data
		Chat.find({ $or: [{ from: from }, { to: to }] }, (err, doc) => {
			if(err) {
				io.emit('receiveCreateErr', code_16)
			} else {
				// 利用对象的属性将返回的数据根据chatId进行分类，并且返回每一类中timeStamp最大的那一条记录，以及每个分类中未读的条数
				let temp = {},// 利用对象的属性将返回的数据根据chatId进行分类
					res = [];// 并且返回每一类中timeStamp最大的那一条记录
				doc.forEach(v => {
					if(!temp[v.chatid]) {
						temp[v.chatid] = [v]
					} else {
						temp[v.chatid].push(v)
					}
				})
				Object.keys(temp).forEach(v => {
					let readNo = 0;
					temp[v].forEach(_v => {
						if(!_v.read && _v.to == from) {
							readNo += 1
						}
					})
					let _res = temp[v].reduce((v1, v2) => {
						return v1.timeStamp > v2.timeStamp ? v1 : v2
					})
					res.push({ ..._res._doc, readNo: readNo })
				})
				// 这个时候可以根据数据库获得的数据的from或者to跟传入的参数做对比，如果不相同获取其头像和昵称
				io.emit('receiveList', res)
			}
		})
		io.emit('receiveList', [{ to: data.to, msg: '123' }])
	})

	socket.on('getChatListByChatId', (data) => {// 聊天页面根据from和to获取聊天内容
		let { from, to, pageNum } = data,
			chatid = [ from, to ].sort().join('_'),
			pageSize = 50;
		Chat.find({ chatid: chatid }, (err, doc) => {
			if(err) {
				io.emit('receiveCreateErr', code_16)
			} else {
				io.emit('receiveMsgByChatId', doc)
			}
		}).limit(pageSize).skip(pageSize * (pageNum - 1))// 分页条件
	})

	socket.on('createMsg', (data) => {// 聊天过程中，创建并返回单条数据
		let createObj = data
			createObj.chatid = [ createObj.from, createObj.to ].sort().join('_')
			createObj.timeStamp = new Date().getTime()
			createObj.read = false
			chatModel = new Chat({ ...createObj })
		chatModel.save((err, doc) => {
			if(err) {
				io.emit('receiveCreateErr', code_15)
			} else {
				io.emit('receiveMsg', { ...createObj })
			}
		})
	})
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/common', comRouter)
app.use('/position', positionRouter)
app.use('/chat', chatRouter)

server.listen(9093, function() {
	console.log('Node app start at port 9093')
})