// tagsBar多标签页逻辑
let state = {
        visitedRoutes: []
    },
    getters = {
        visitedRoutes: state => state.visitedRoutes
    },
    mutations = {
        /**
         * 添加标签页
         * @param {*} state 
         * @param {*} route 
         * @return
         */
        addVisitedRoute (state, route) {
            let target = state.visitedRoutes.find((item) => item.path === route.path)
            if(target) {
                if(route.fullPath !== target.fullPath) Object.assign(target, route)
                return
            }
            state.visitedRoutes.push(Object.assign({}, route))
        },
        /**
         * 删除当前标签页
         * @param {*} state 
         * @param {*} route 
         */
        delVisitedRoute (state, route) {
            state.addVisitedRoute.forEach((item, index) => {
                if(item.path === route.path) state.visitedRoutes.splice(index, 1)
            })
        },
        /**
         * 删除当前标签页以外其他全部多余标签页
         * @param {*} state 
         * @param {*} route 
         */
        delOtherVisitedRoute (state, route) {
            state.addVisitedRoute = state.addVisitedRoute.filter(item => item.meta.affix || item.path === route.path)
        },
        /**
         * 删除当前标签页左边的全部多标签页
         * @param {*} state 
         * @param {*} route 
         */
        delLeftVisitedRoute (state, route) {
            let index = state.visitedRoutes.length
            state.visitedRoutes = state.visitedRoutes.filter(item => {
                if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
                return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
            })
        },
        /**
         * 删除当前标签页右边的全部多标签页
         * @param {*} state
         * @param {*} route
         */
        delRightVisitedRoute (state, route) {
            let index = state.visitedRoutes.length
            state.visitedRoutes = state.visitedRoutes.filter(item => {
                if(item.name === route.name) index = state.visitedRoutes.indexOf(item)
                return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
            })
        },
        /**
         * 删除全部多标签页
         * @param {*} state 
         */
        delAllVisitedRoute (state) {
            state.addVisitedRoute = state.addVisitedRoute.filter(item => item.meta.affix)
        }
    },
    actions = {
        /**
         * 添加标签页
         * @param {*} param0 
         * @param {*} route 
         */
        addVisitedRoute ({ commit }, route) {
            commit('addVisitedRoute', route)
        },
        /**
         * 删除当前标签页
         * @param {*} param0 
         * @param {*} route 
         */
        delVisitedRoute ({ commit }, route) {
            commit('delVisitedRoute', route)
        },
        /**
         * 删除当前标签页以外其他全部多标签页
         * @param {*} param0
         * @param {*} route
         */
        delOtherVisitedRoute ({ commit }, route) {
            commit('delOtherVisitedRoute', route)
        },
        /**
         * 删除当前标签页左边全部多标签页
         * @param {*} param0
         * @param {*} route
         */
        delLeftVisitedRoute ({ commit }, route) {
            commit('delLeftVisitedRoute', route)
        },
        /**
         * 删除当前标签页右边全部多标签页
         * @param {*} param0 
         * @param {*} route 
         */
        delRightVisitedRoute ({ commit }, route) {
            commit('delRightVisitedRoute', route)
        },
        /**
         * 删除全部多标签页
         * @param {*} param0 
         */
        delAllVisitedRoute ({ commit }) {
            commit('delAllVisitedRoute')
        }
    };

export default { state, getters, mutations, actions }