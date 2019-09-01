import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login/index')
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('@/views/register/index')
		},
		{
			path: '/webview',
			name: 'Webview',
			component: () => import('@/views/webview/index'),
			children: [
				{
					path: '/genius',
					name: 'Genius',
					component: () => import('@/views/home/genius/index')
				},
				{
					path: '/positionDetail/:id',
					name: 'PositionDetail',
					component: () => import('@/views/home/genius/positionDetail/index')
				},
				{
					path: '/boss',
					name: 'Boss',
					component: () => import('@/views/home/boss/index')
				},
				{
					path: '/follow',
					name: 'Follow',
					component: () => import('@/views/follow/index')
				},
				{
					path: '/message',
					name: 'Message',
					component: () => import('@/views/message/index')
				},
				{
					path: '/user',
					name: 'User',
					component: () => import('@/views/user/index')
				}
			]
		}
	]
})