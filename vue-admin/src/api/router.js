import request from "@/utils/request"
let api = '/api'
/**
 * 根据用户标识获取其权限对应的路由
 */
export function getRouterList (params) {
    return request.get(`${api}/common/userRouter`, params)
}