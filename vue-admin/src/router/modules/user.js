import Layout from '@/views/layout/index'
let userRouter = {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: {
        noCache: true,
        title: '用户管理',
        roles: ['admin'],
        componentName: 'SolutionOutlined'
    },
    children: [
        {
            path: 'index',
            name: 'UserIndex',
            component: () => import('@/views/user/index/index'),
            meta: {
                title: '用户列表',
                componentName: 'UserOutlined',
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
                componentName: 'TeamOutlined',
                type: 2,
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}

export default userRouter