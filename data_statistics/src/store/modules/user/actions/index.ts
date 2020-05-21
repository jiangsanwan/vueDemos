import request from './../../../../utils/request'
let qs = require('qs'),
    api = '/api';

export default {
    // userGetById (contex: any, data: any) {
    //     return request.get(`${api}/user/getById?${qs.stringify(data)}`)
    // }
    login (contex: any, data: any) {
        return request.post(`${api}/user/login`, data, {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        })
    }
}