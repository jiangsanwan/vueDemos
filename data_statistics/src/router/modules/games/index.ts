import Layout from '@/views/layout/index.vue'
let gameRouter: any = {
	path: '/layout',
	name: 'Layout',
	component: Layout,
	children: [
		{
			path: '/game',
			component: () => import('@/views/games/index.vue'),
			name: 'Games'
		},
		{
			path: '/sudo',
			component: () => import('@/views/games/sudo/index.vue'),
			name: 'Sudo'
		}
	]
}

export default gameRouter