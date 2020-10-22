import { constantRouterMap, asyncRouterMap } from '@/router'
import { getRouterList } from '@/api/router'
import { filterRoleRoutes, convertRouter } from '@/utils/routes'

let state = {
        routes: []
    },
    getters = {
        routes: state => state.routes,
    },
    mutations = {
        setRoutes (state, routes) {
            state.routes = routes
        }
    },
    actions = {
        async setStaticRoutes({ commit }) {// 根据角色名，匹配静态路由
            let roleRoutes = filterRoleRoutes(asyncRouterMap),
                finallyRoutes = [ ...constantRouterMap, ...roleRoutes];
            commit('setRoutes', finallyRoutes)
            return [ ...roleRoutes ]
        },
        /**
         * 根据接口数据返回，设置权限路由
         * @param {*} param0 
         */
        async setDynamicRoutes ({ commit }) {
            let { data } = await getRouterList(),
                _asyncRouterMap = data.length > 0 ? convertRouter(data) : [],// 将动态数据加入到
                roleRoutes = filterRoleRoutes(asyncRouterMap),
                finallyRoutes = [ ...constantRouterMap, ...roleRoutes, ..._asyncRouterMap ];
            commit('setRoutes', finallyRoutes)
            return [ ...roleRoutes, ..._asyncRouterMap ]
        }
    };

export default { state, getters, mutations, actions }