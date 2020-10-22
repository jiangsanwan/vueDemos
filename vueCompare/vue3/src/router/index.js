import { createRouter, createWebHistory } from 'vue-router'

let routes = [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/home/index')
        }
    ],
    router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    });

export default router