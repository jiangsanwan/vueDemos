import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'Home',
			component: () => import('@/views/home/index')
		},
		{
			path: '/paging',
			name: 'Paging',
			component: () => import('@/views/paging/index')
		}
	]
})