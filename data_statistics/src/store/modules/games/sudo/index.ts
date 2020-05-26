import request from './../../../../utils/request'
let qs = require('qs'),
    api = '/api';

export default {
    state: {
        level_number: '3'
    },
    mutations: {
        SET_LEVELNUMBER (state: any, str: string): void {
            state.level_number = str
        }
    },
    actions: {
        sudo (contex: any, data: any) {
            return request.post(`${api}/game/sudo`, data, {
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            })
        }
    }
}