import { createRouter, createWebHashHistory } from 'vue-router'

import commonRouter from './modules/common'

import dashboardRouter from './modules/dashboard'
import userRouter from './modules/user'

export let constantRouterMap = [
    ...commonRouter
]

export let asyncRouterMap = [
    dashboardRouter,
    userRouter
]
let router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(process.env.BASE_URL),
    routes: constantRouterMap
})
export default router