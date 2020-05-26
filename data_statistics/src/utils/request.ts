import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from './../store'
import router from './../router'

axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig => {
	let _token = localStorage.getItem('fremember_dataStatistics_token'),
		_url = config.url ? config.url : '';
	if(_token && _url.indexOf('/login') < 0) {
		config.headers.token = _token
	}
	return config
})

axios.interceptors.response.use((response:AxiosResponse<any>):AxiosResponse<any> => {
	if(response.data.code == 200) {
		router.push('/login')
	}
	return response
})

export default axios