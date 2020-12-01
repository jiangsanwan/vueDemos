import { createRouter, createWebHashHistory } from 'vue-router'

import commonRouter from './modules/common'

import dashboardRouter from './modules/dashboard'
import learnRouter from './modules/learn'
import userRouter from './modules/user'
import errorRouter from './modules/error'

export let constantRouterMap = [
    ...commonRouter
]

export let asyncRouterMap = [
    dashboardRouter,
    learnRouter,
    userRouter,
    errorRouter
]
let router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(process.env.BASE_URL),
    routes: constantRouterMap
})
export default router