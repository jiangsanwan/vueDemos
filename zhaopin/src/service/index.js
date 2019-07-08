const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const model = require('./model')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
// io相关的逻辑还没有写

const userRouter = require('./routers/user')
const comRouter = require('./routers/common')
const positionRouter = require('./routers/position')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/common', comRouter)
app.use('/position', positionRouter)

server.listen(9093, function() {
	console.log('Node app start at port 9093')
})