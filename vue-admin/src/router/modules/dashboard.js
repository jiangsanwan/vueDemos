import Layout from '@/views/layout/index'
let dashboardRouter = {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
        title: '首页',
        noCache: true,
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {
                title: '首页',
                type: 1,
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}


export default dashboardRouter