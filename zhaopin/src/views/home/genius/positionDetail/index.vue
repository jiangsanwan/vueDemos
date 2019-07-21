<template>
	<div class="position-detail">
		哈哈哈
	</div>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	export default {
		name: 'PositionDetail',
		data () {
			return {
				id: this.$route.params.id
			}
		},
		mounted () {
			this.$store.commit('SET_SHOWMINEFOOTER', false)
			this.initData()
		},
		methods: {
			initData () {
				this.$store.dispatch('getPositionDetailById', { _id: this.id })
				.then(d => {
					console.log(d)
				})
				.catch(err => {
					console.og(err)
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.position-detail {}
</style>