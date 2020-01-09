<template>
	<div class="company-detail">
		company-detail
	</div>
</template>

<script>
	export default {
		name: 'CompanyDetail',
		data () {
			return {
				publicId: this.$route.params.id,
			}
		},
		mounted () {
			this._initData()
		},
		methods: {
			_initData () {}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>