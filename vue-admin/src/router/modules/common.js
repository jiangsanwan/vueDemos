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
    }
]

export default commonRouter