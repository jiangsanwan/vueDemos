import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    { path: '/', name: 'Home', component: () => import('@/views/home/index') },
    { path: '/home2', name: 'Home2', component: () => import('@/views/home2/index') },
    { path: '/home3', name: 'Home3', component: () => import('@/views/home3/index') }
],
router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router