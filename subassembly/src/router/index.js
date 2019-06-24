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
			component: () => import('@/views/components/paging/index')
		},
		{
			path: '/paging2',
			name: 'Paging2',
			component: () => import('@/views/components/paging2/index')
		},
		{
			path: '/v-slot',
			name: 'VSlot',
			component: () => import('@/views/attributes/vslot/index')
		}
	]
})