<template>
	<div class="position-detail">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="common-header-wrapper">
			<div class="padding-l-r-10px">
				<div class="title-wrapper">
					<div class="flex hw-com flex-c-sb">
						<div class="fs02rem fw550">{{ detailObj.title }}</div>
						<div class="color26a2ff">{{ detailObj.salary }}</div>
					</div>
					<div class="flex hw-com flex-c-fs">
						<div class="flex flex-a-c"><i class="iconfont icon-position"></i>{{ detailObj.briefAddress }}</div>
						<div class="flex flex-a-c"><i class="iconfont icon-company"></i>{{ detailObj.workingYears }}</div>
						<div class="flex flex-a-c"><i class="iconfont icon-idcard"></i>{{ detailObj.education }}</div>
					</div>
					<div class="thin-width"></div>
				</div>
				<div class="publib-wrapper">
					<div>123</div>
				</div>
			</div>
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
				},
				detailObj: {}
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
					if(d.data.code == 0) {
						this.detailObj = d.data.data
					}
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
	@import './../../../../assets/stylus/common'
	.position-detail {
		.common-header-wrapper {
			position(fixed);
			all(0);
			bottom(60px);
			overflow-y(auto);
			.title-wrapper {
				padding-top(.24rem);
				padding-bottom(.1rem);
				.hw-com {
					align-items(center);
					&.flex-c-sb {
						padding-t-b(.06rem);
						justify-content(space-between);
					}
					&.flex-c-fs {
						padding-top(.1rem);
						padding-bottom(.24rem);
						justify-content(flex-start);
						.flex-a-c {
							align-items(center);
							font-color(#666);
							font-size(.12rem);
							.iconfont {
								margin-right(.02rem);
								font-size(.12rem);
							}
							&:not(:last-child) {
								margin-right(.1rem);
							}
						}
					}
				}
				
			}
		}
	}
</style>