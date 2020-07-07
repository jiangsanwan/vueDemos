import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hcMenu: [
            { link: '/introduce', text: '介绍' },
            { link: '/home', text: '常用组件' }
        ],
        routerList: [
            { link: '/home/pagination', text: '分页' },
            { link: '/home/slider', text: '滑块' }
        ]
    },
    mutations: {},
    actions: {},
    modules: {}
})