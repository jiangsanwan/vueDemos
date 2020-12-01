import Layout from '@/views/layout/index'
let errorRouter = {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    meta: {
        noCache: true,
        title: '错误页',
        componentName: 'InfoCircleOutlined',
        roles: ['admin']
    },
    children: [
        {
            path: '404',
            name: 'NotFound',
            component: () => import('@/views/error/404/index'),
            meta: {
                title: '404',
                componentName: 'FrownOutlined',
                type: 1,
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: '403',
            name: 'Forbiden',
            component: () => import('@/views/error/403/index'),
            meta: {
                title: '403',
                componentName: 'ExclamationCircleOutlined',
                type: 2,
                noCache: true,
                roles: ['admin']
            }
        }
    ]
}

export default errorRouter