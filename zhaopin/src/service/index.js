const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const JwtUtil = require('./utils/jwt')

const model = require('./model')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
// io相关的逻辑还没有写

const userRouter = require('./routers/user')
const comRouter = require('./routers/common')
const positionRouter = require('./routers/position')

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

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/common', comRouter)
app.use('/position', positionRouter)

server.listen(9093, function() {
	console.log('Node app start at port 9093')
})