import Layout from '@/views/layout/index.vue'
let editRouter: any = {
	path: '/layout',
	name: 'Layout',
	component: Layout,
	children: [
		{
			path: '/edit',
			component: () => import('@/views/edits/index.vue'),
			name: 'Edits'
		},
		{
			path: '/gameEdit',
			component: () => import('@/views/edits/game/index.vue'),
			name: 'GameEdit'
		}
	]
}

export default editRouter