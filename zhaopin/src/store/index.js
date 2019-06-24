import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import request from './../utils/request.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		duration: 1500,
		userInfo: {}
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
