import Layout from '@/views/layout/index'
let learnRouter = {
    path: '/learn',
    component: Layout,
    redirect: '/learn/vue',
    meta: {
        noCache: true,
        title: '技术栈学习',
        roles: ['admin'],
        componentName: 'SmileOutlined'
    },
    children: [
        {
            path: 'vue',
            name: 'Vue',
            component: () => import('@/views/learn/vue/index'),
            meta: {
                title: 'vue3.0',
                componentName: 'HighlightOutlined',
                type: 1,
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'vuex',
            name: 'Vuex',
            component: () => import('@/views/learn/vuex/index'),
            meta: {
                title: 'vuex4.0',
                componentName: 'HighlightOutlined',
                type: 2,
                noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'router',
            name: 'VueRouter',
            component: () => import('@/views/learn/router/index'),
            meta: {
                title: 'vue-router4.0',
                componentName: 'HighlightOutlined',
                type: 3,
                noCache: true,
                roles: ['admin']
            }
        },
    ]
}

export default learnRouter