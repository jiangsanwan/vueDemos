import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from './../store/index'
import router from './../router/index'

axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig => {
	return config
})

axios.interceptors.response.use((response:AxiosResponse<any>):AxiosResponse<any> => {
	return response
})

export default axios