import Vue from 'vue'
import Vuex from 'vuex'
import request from './../utils/request.js'

Vue.use(Vuex)

let api = '/api'

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
		},
		type: '',
		token: sessionStorage.getItem('token') || '',
		showMineFooter: true
	},
	mutations: {
		SET_USERINFO (state, value) {
			state.userInfo = value
		},
		SET_TYPE (state, value) {
			state.type = value
		},
		SET_TOKEN (state, value) {
			state.token = value
		},
		SET_SHOWMINEFOOTER (state, value) {
			state.showMineFooter = value
		}
	},
	actions: {
		getImgVerify ({ commit, dispatch, state }, params) {// 获取图形验证码
			return request.get(`${api}/common/getImgVerify`, params)
		},
		checkUser ({ commit, dispatch, state }, params) {// 验证用户名是否存在
			return request.get(`${api}/user/checkUser`, params)
		},
		register ({ commit, dispatch, state }, data) {// 新用户注册
			return request.post(`${api}/user/register`, data)
		},
		login ({ commit, despatch, state }, data) {// 用户登录
			return request.post(`${api}/user/login`, data)
		},
		positionList ({ commit, despatch, state }, params) {// 牛人获取职位列表
			return request.get(`${api}/position/list`, params)
		},
		getPositionDetailById({ commit, despatch, state }, params) {// 牛人根据id值获取职位详情
			return request.get(`${api}/position/detail`, params)
		}
	}
})
