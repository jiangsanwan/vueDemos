import store from '@/store'
/**
 * 根据角色名称处理路由，返回的是有权限的路由
 * @param {*} routes 
 */
export function filterRoleRoutes (routes) {
    let rolename = store.getters['user/rolename']
    return routes
        .filter(route => {
            return route.meta.roles.includes(rolename)
        })
        .map(route => {
            if (route.children && route.children.length > 0)
                route.children = filterRoleRoutes(route.children)
            return route
        })
}
/**
 * 将路由数组转成合法的路由数组
 */
export function convertRouter (routes) {
    return routes.map(route => {
        return route
    })
}
/**
 * 判断routes是不是含有url
 * @param {*} routes 
 * @param {*} url 只做两种格式判断：/xx/xx 或者/xx
 * @return { Boolean }
 */
export function validAddress (routes, url) {
    let flag = false,
        _urlArr = url.split('/').filter(item => { return item }).map((item, index) => { return index == 0 ? `/${item}` : item });
    routes.forEach(route => {
        if(route.path == url) {
            !flag && (flag = true)
        } else {
            if (route.path == _urlArr[0] && _urlArr.length > 1) {
                if (route.children && route.children.length > 0) {
                    route.children.forEach(itm => {
                        if (itm.path == _urlArr[1])
                            !flag && (flag = true)
                    })
                }
            }
        }
    })
    return flag
}