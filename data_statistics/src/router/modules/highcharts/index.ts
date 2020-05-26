import Layout from '@/views/layout/index.vue'
let highchartsRouter: any = {
	path: '/layout',
	name: 'Layout',
	component: Layout,
	children: [
		{
			path: '/highcharts',
			component: () => import('@/views/highcharts/index.vue'),
			name: 'Highcharts'
		},
		{
			path: '/h_histogram',
			component: () => import('@/views/highcharts/histogram/index.vue'),
			name: 'Hhistogram'
		}
	]
}

export default highchartsRouter