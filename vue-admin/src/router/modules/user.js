import Layout from '@/views/layout/index'
let userRouter = {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: {
        noCache: true,
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            name: 'UserIndex',
            component: () => import('@/views/user/index/index'),
            meta: {
                title: '用户列表',
                type: 1,
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'role',
            name: 'UserRole',
            component: () => import('@/views/user/role/index'),
            meta: {
                title: '角色权限',
                type: 2,
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}

export default userRouter