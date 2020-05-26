import Layout from '@/views/layout/index.vue'
let echertRouter: any = {
	path: '/layout',
	name: 'Layout',
	component: Layout,
	children: [
		{
			path: '/echart',
			component: () => import('@/views/echarts/index.vue'),
			name: 'Echart'
		},
		{
			path: '/e_histogram',
			component: () => import('@/views/echarts/histogram/index.vue'),
			name: 'Ehistogram'
		}
	]
}

export default echertRouter