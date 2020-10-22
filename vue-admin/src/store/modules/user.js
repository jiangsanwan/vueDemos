/**
 * 登录、获取用户信息、退出登录、清除accessToken逻辑
 */
import { getUserInfo, login, logout } from '@/api/user'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken'
import { title, tokenName, roleName } from '@/config'
import { message, notification } from 'ant-design-vue'

let state = {
        accessToken: getAccessToken(),
        username: '',
        rolename: '',
        avatar: ''
    },
    getters = {
        accessToken: state => state.accessToken,
        username: state => state.username,
        rolename: state => state.rolename,
        avatar: state => state.avatar
    },
    mutations = {
        setAccessToken (state, accessToken) {// 设置accessToken
            state.accessToken = accessToken
            setAccessToken(accessToken)
        },
        setUsername (state, username) {// 设置用户名
            state.username = username
        },
        setRolename (state, rolename) {// 设置权限名
            state.rolename = rolename
        },
        setAvatar (state, avatar) {// 设置头像
            state.avatar = avatar
        }
    },
    actions = {
        async login ({ commit }, userInfo) {// 登录
            let { data } = await login(userInfo),
                accessToken = data[tokenName],
                rolename = data[roleName];
            if (accessToken) {
                commit('setAccessToken', accessToken)
                commit('setRolename', rolename || '')
                let hour = new Date().getHours(),
                    thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
                notification.open({
                    message: `欢迎登录${title}`,
                    description: `${thisTime}`
                })
            } else {
                message.error(`登录接口异常，未正确返回${tokenName}...`)
            }
        },
        async getUserInfo ({ commit }) {
            let { data } = await getUserInfo()
            if(!data) {
                message.error(`登录失败，请重新登录...`)
                return false
            }
            let { username, avatar, roleName } = data
            if (username) {
                commit('setUsername', username)
                commit('setAvatar', avatar)
                commit('setRolename', roleName || '')
            } else {
                message.error('用户信息接口异常')
            }
        },
        async logout ({ state, dispatch }) {// 退出
            await logout(state.accessToken)
            await dispatch('resetAll')
        },
        async resetAll ({ dispatch }) {// 重置accessToken
            await dispatch('setAccessToken', '')
            removeAccessToken()
        },
        setAccessToken ({ commit }, accessToken) {// 设置accessToken
            commit('setAccessToken', accessToken)
        }
    };

export default { state, getters, mutations, actions }