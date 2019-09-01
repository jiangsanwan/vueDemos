<template>
	<div class="position-detail">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="common-header-wrapper">
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
			<div>1234</div>
		</div>
		<mine-communicate-footer :id="id"></mine-communicate-footer>
	</div>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import MineCommunicateFooter from '@/components/mine-communicate-footer/index'
	export default {
		name: 'PositionDetail',
		components: { MineBtnsHeader, MineCommunicateFooter },
		data () {
			return {
				id: this.$route.params.id,
				headerObj: {
					title: '',
					more: [ 'icon-favorite', 'icon-warning', 'icon-share' ]
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
	@import './../../../../assets/stylus/common_header_wrapper'
	.position-detail {
		.common-header-wrapper {
			position(fixed);
			all(0);
			bottom(60px);
			overflow-y(scroll);
		}
	}
</style>