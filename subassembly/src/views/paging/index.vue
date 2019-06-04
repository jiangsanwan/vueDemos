<template>
	<div class="paging">
		<div>分也组件</div>
		<mine-paging :total="total" :pagegroup="pagegroup" :pagingIndex="pagingIndex" @pagechange="pagechange"></mine-paging>
	</div>
</template>

<script>
	import minePaging from '@/components/paging/index'
	export default {
		name: 'Home',
		components: {
			minePaging
		},
		data () {
			return {
				total: 100,
				pagegroup: 10,
				pagingIndex: 12
			}
		},
		methods: {
			pagechange (val) {
				console.log(val)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.paging {
	}
</style>