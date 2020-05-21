import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import gameRouter from './modules/games'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '/home',// 首页
                name: 'Home',
                component: () => import('@/views/home/index.vue')
            }
        ]
    },
    gameRouter
]


const router = new VueRouter({
    linkExactActiveClass: 'active',
    mode: 'history',
    base: process.env.BASE_URL,
    routes 
})

export default router