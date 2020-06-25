import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
        {
            path: '/',
            redirect: '/introduce'
        },
        {
            path: '/introduce',
            name: 'Introduce',
            components: () => import('@/views/introduce/index')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/index'),
            children: [
                {
                    path: '/home/pagination',
                    name: 'Pagination',
                    component: () => import('@/views/pagination/index')
                },
                {
                    path: '/home/slider',
                    name: 'Slider',
                    component: () => import('@/views/slider/index')
                }
            ]
        }
    ],
    router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    });

export default router