// 路由守卫
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import { loginInterception, routesWhiteList, recordRoute } from '@/config'
import { validAddress } from '@/utils/routes'

router.beforeEach(async (to, from, next) => {
    let hasToken = store.getters['user/accessToken'],
        rolename = store.getters['user/rolename'];
    if (!loginInterception) hasToken = true
    if (routesWhiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if (hasToken) {
            let hasRole = to.meta.roles && to.meta.roles.includes(rolename)
            if (hasRole) {
                next()
            } else {
                try {
                    if (loginInterception && !rolename) {
                        await store.dispatch('user/getUserInfo')
                    }
                    let accessRoutes = []
                    if (rolename == 'tourist') {// 游客登录
                    } else if(rolename !== 'editer') {
                        accessRoutes = await store.dispatch('routes/setStaticRoutes')
                    } else {// 编辑人员有更多的操作路由的权限
                        accessRoutes = await store.dispatch('routes/setDynamicRoutes')
                    }
                    accessRoutes.forEach(item => {
                        router.addRoute(item)
                    })
                    // 路由重定向，如果合法的地址，可以正常走流程，不是合法的地址，重定向到404页面
                    if(validAddress(accessRoutes, to.path)) {
                        next({ ...to, replace: true })
                    } else {
                        next({ path: '/error/404', replace: true })
                    }
                } catch(e) {
                    await store.dispatch('user/resetAll')
                    if (recordRoute) // token失效回退到登录页时是否记录本次的路由
                        next({ path: '/login', query: { redirect: to.path }, replace: true })
                    else next({ path: '/login', replace: true })
                }
            }
        } else {
            if (recordRoute) // token失效回退到登录页时是否记录本次的路由
                next({ path: '/login', query: { redirect: to.path }, replace: true })
            else next({ path: '/login', replace: true })
        }
    }
})

router.afterEach((to) => {
    document.title = getPageTitle(to.meta.title)
})