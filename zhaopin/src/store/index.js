import Vue from 'vue'
import Vuex from 'vuex'
import request from './../utils/request.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		duration: 1500,
		userInfo: {},
		commonTitle: {
			title: '首页',// 头部文字
			left: false,// 是否显示头部左边信息
			right: false,// 是否显示头部右边信息
			leftIcon: '',// 头部左边icon
			leftText: '',// 头部左边显示文字
			leftLink: '',// 头部左边链接
			rightIcon: '',// 头部右边icon
			rightText: '',// 头部右边显示文字
			rightLink: ''// 头部右边链接
		}
	},
	mutations: {
	},
	actions: {
		checkUser ({ commit, dispatch, state }, user) {// 验证用户名是否存在
			return request.get('/api/user/checkUser?user=' + user)
		},
		register ({ commit, dispatch, state }, data) {
			return request.post('/api/user/register', data)
		},
		login ({ commit, despatch, state }, data) {
			return request.post('/api/user/login', data)
		}
	}
})
