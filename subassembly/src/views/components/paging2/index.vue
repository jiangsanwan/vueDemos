<template>
	<div>
		<paging :total="total" :pageNum="pageNum" :pageSize="pageSize" :pageSizes="pageSizes" :pagegroup="pagegroup"  @pageNumChange="pageNumChange" @pageSizeChange="pageSizeChange"></paging>
	</div>
</template>
<script>
	import Paging from '@/components/paging/index2'
	export default {
		name: 'Paging2',
		components: {
			Paging
		},
		data () {
			return {
				total: 128,
				pageNum: 1,
				pageSize: 10,
				pageSizes: [10, 20, 50, 100],
				pagegroup: 5,
			}
		},
		methods: {
			pageNumChange (val) {
				this.pageNum = val;
			},
			pageSizeChange (val) {
				this.pageSize = val;
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>