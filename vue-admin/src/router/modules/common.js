let commonRouter = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index'),
        meta: {
            title: '登录',
            type: 1,
            noCache: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register/index'),
        meta: {
            title: '注册',
            type: 2,
            noCache: true
        }
    },
    {
        path: '/403',
        name: 'Forbiden',
        component: () => import('@/views/error/403/index'),
        meta: {
            title: '403',
            type: 3,
            noCache: true
        }
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/error/404/index'),
        meta: {
            title: '403',
            type: 4,
            noCache: true
        }
    }
]

export default commonRouter