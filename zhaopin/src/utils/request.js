import axios from 'axios'
import store from './../store/index'
import router from './../router/index'
let qs = require('qs')
/**
 * 二次封装请求
 * @params method String 请求方式，默认是GET请求
 * @params url String 请求地址
 * @params params Object 需要拼接到url上的参数
 * @params data Object 放在body体里面的参数
 */
let ajax = ({ method = 'GET', url = '', params, data } = {}) => {
	/*let promise = new Promise((resolve, reject) => {
		axios.get('/api/common/createTempData')
		.then(d => {
			if(d.data.code == 0) {
				resolve(d.data.data)
			} else {
				reject()
			}
		})
		.catch(err => {
			throw new Error('临时数据产生失败')
			reject()
		})
	}).then(value => {
		data = { ...data, value}
		return axios(url, {
			method,
			data
		})
	})
	return promise*/
	let _url = params ? `${url}?${qs.stringify(params)}` : url;
	return axios(_url, {
		method,
		data
	})
}

axios.interceptors.request.use(config => {
	/*if(config.url.indexOf('/common/createTempData') < 0) {// 不是产生临时数据的接口
		if(config.data.value) {// 判断临时数据是否存在
			config.headers['tempValue'] = config.data.value// 临时数据作为header传给后台
			delete config.data.value// 删除临时数据字段
		} else {// 没有临时数据
		}
		config.headers['token'] = store.state.userInfo.token
	}*/
	if(window.location.href.indexOf('/register') < 0 && window.location.href.indexOf('/login') < 0) {
		if(config.url.indexOf('/user/login') < 0 || config.url.indexOf('/user/register') < 0 || config.url.indexOf('/user/checkUser') < 0 || config.url.indexOf('/common/getImgVerify?') < 0) {
			if(store.state.token) {
				config.headers['token'] = store.state.token
			} else {
				router.replace({
					path: 'login'
				})
			}
		}
	}
	return config
})

axios.interceptors.response.use(response => {
	if(router.history.current.path != '/login') {
		if(response.data.code == 200) {
			localStorage.clear()
			sessionStorage.clear()
			router.replace({
				path: 'login'
			})
		}
	}
	return response
})


ajax.get = (url, params) => ajax({ url, params })
ajax.post = (url, data) => ajax({ method: 'POST', url, data })

export default ajax