import axios from 'axios';
/**
 * 二次封装请求
 * @params method String 请求方式，默认是GET请求
 * @params url String 请求地址
 * @params params Object 需要拼接到url上的参数
 * @params data 
 */
let ajax = ({ method = 'GET', url = '', params = {}, data, local = false } = {}) => {
	let promise = new Promise((resolve, reject) => {
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
	return promise
}

axios.interceptors.request.use(config => {
	if(config.url.indexOf('/common/createTempData') < 0) {// 不是产生临时数据的接口
		if(config.data.value) {// 判断临时数据是否存在
			config.headers['tempValue'] = config.data.value// 临时数据作为header传给后台
			delete config.data.value// 删除临时数据字段
		} else {// 没有临时数据
		}
	}
	return config
})

ajax.get = (url, params, local) => ajax({ url, params, local })
ajax.post = (url, data, local) => ajax({ method: 'POST', url, data, local })

export default ajax