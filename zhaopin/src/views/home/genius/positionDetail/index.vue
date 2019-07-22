<template>
	<div class="position-detail">
		<mine-btns-header :titleObj="titleObj"></mine-btns-header>
	</div>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	export default {
		name: 'PositionDetail',
		components: { MineBtnsHeader },
		data () {
			return {
				id: this.$route.params.id,
				titleObj: {
					title: 'hah',
					more: [ 'icon-favorite', 'icon-warning', 'icon-share' ]
					/*favorite: true,
					warning: true,
					share: true*/
				}
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