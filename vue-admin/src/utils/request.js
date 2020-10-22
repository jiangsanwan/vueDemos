/* eslint-disable */
import axios from 'axios'
import store from './../store/index'
import router from './../router/index'
import qs from 'qs'
import { isArray } from '@/utils/validate'
import { message } from 'ant-design-vue'
import {
	// baseURL,// 开发环境会出现跨域问题
	contentType,
	debounce,
	requestTimeout,
	successCode,
	tokenName
} from '@/config'
let loadingInstance,
	instance = null,
	handleCode = (code, msg) => {
		switch (code) {
			case 401:
				message.error(msg || '登录失效')
				store.dispatch('user/resetAll').catch(() => {})
				break
			case 403:
				router.push({ path: '401' }).catch(() => {})
				break
			default:
				message.error(msg || `后端接口${code}异常`)
				break
		}
	};
instance = axios.create({
	// baseURL,// 开发环境会出现跨域问题，不设置的时候，会直接走代理
	timeout: requestTimeout,
	headers: {
		'Content-Type': contentType
	}
})
/**
 * 请求拦截
 */
instance.interceptors.request.use(
	config => {
		if (store.getters['user/accessToken'])
			config.headers[tokenName] = store.getters['user/accessToken']
		if ((config.method === 'get' || config.method === 'GET') && config.data)
			config.url = `${config.url}?${qs.stringify(config.data)}`
		if(debounce.some(item => config.url.includes(item))) {
			// 这里写加载动画
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
/**
 * 响应拦截
 */
instance.interceptors.response.use(
	response => {
		if (loadingInstance) loadingInstance.close()
		let { data, config } = response,
			{ code, msg } = data,
			// 操作正常的code数组
			codeVerificationArray = isArray(successCode) ? [ ...successCode ] : [ ...[successCode] ];
		// 是否操作正常
		if(code == 200) {
			router.push('/login')
		} else {
			if(codeVerificationArray.includes(code)) {
				return data
			} else {
				handleCode(code, msg)
				return Promise.reject(`vue-admin请求异常拦截${JSON.stringify({ url: config.url, code, msg }) || 'Error'}`)
			}
		}
	},
	error => {
		if (loadingInstance) loadingInstance.close()
		let { response, message } = error
		if (error.response && error.response.data) {
			let { status, data } = response
			handleCode(status, data.msg || message)
			return Promise.reject(error)
		} else {
			let { message } = error
			if (message === 'Network Error') {
				message = '后端接口连接异常'
			}
			if (message.includes('timeout')) {
				message = '后端接口请求超时'
			}
			if (message.includes('Request failed with status code')) {
				let code = message.substr(mesage.length - 3)
				message = `后端接口${code}异常`
			}
			message.error(message || `后端接口未知异常`)
			return Promise.reject(error)
		}
	}
)

export default instance