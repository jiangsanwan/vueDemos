import store from '@/store/index'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

socket.on('receiveList', (data) => {// 消息入口获取未读信息列表，只要to这个字段就可以了
	store.commit('SET_CHATLISTS', data)
})

socket.on('receiveMsgByChatId', (data) => {// 聊天页面根据from和to获取聊天内容
	store.commit('SET_CHATLISTSCHATID', data)
})

socket.on('receiveMsg', (data) => {// 聊天过程中，创建并返回单条数据
	store.commit('SET_CHATMSGS', data)
})

export default socket