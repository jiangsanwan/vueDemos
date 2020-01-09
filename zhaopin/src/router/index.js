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
					path: '/allPositions/:id',
					name: 'AllPositions',
					component: () => import('@/views/home/genius/allPositions/index')
				},
				{
					path: '/companyDetail/:id',
					name: 'CompanyDetail',
					component: () => import('@/views/home/genius/companyDetail/index')
				},
				{
					path: '/boss',
					name: 'Boss',
					component: () => import('@/views/home/boss/index')
				},
				{
					path: '/addPosition',
					name: 'AddPosition',
					component: () => import('@/views/home/boss/addPosition/index')
				},
				{
					path: '/editCompany',
					name: 'EditCompany',
					component: () => import('@/views/home/boss/editCompany/index')
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
					path: '/chatRoom/:chatid',
					name: 'Chatroom',
					component: () => import('@/views/message/chatRoom/index')
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