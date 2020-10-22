import request from "@/utils/request"
let api = '/api'
/**
 * 获取验证码
 */
export function getImgVerify(data) {
    return request({
        url: `${api}/common/getImgVerify`,
        method: 'get',
        data
    })
}
/**
 * 登录
 */
export function login(data) {
    return request({
        url: `${api}/user/login`,
        method: 'post',
        data
    })
}
/**
 * 注册的时候验证用户名
 */
export function checkUsername (data) {
    return request({
        url: `${api}/user/checkUsername`,
        method: 'get',
        data
    })
}
/**
 * 注册
 */
export function register (data) {
    return request({
        url: `${api}/user/register`,
        method: 'post',
        data
    })
}
/**
 * 退出
 */
export function logout () {
    return request({
        url: `${api}/user/logout`,
        method: 'post'
    })
}
/**
 * 获取用户信息
 */
export function getUserInfo () {
    return request({
        url: `${api}/user/getUserInfo`,
        method: 'post'
    })
}