<template>
	<div class="genius">
		<pos-header @changeCondition="changeCondition"></pos-header>
		<div class="outer-wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-spinner class="flex-center" v-show="dataLists.length == 0 && InitialLoading" color="#26a2ff" type="fading-circle"></mt-spinner>
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul class="position-wrapper">
					<li v-for="item in dataLists" :key="item._id" @click="goToDetail(item)">
						<div class="position-title">
							<p class="t">{{ item.title }}</p>
							<p class="s">
								<span>{{ item.salary }}</span>
								<span v-show="item.salaryNumber"> · </span>
								<span v-show="item.salaryNumber">{{ item.salaryNumber }}薪</span>
							</p>
						</div>
						<div class="company-info">
							<p class="c">{{ item.company }}</p>
							<p class="f">{{ item.finance }}</p>
						</div>
						<div class="company-address">
							<p class="b">{{ item.briefAddress }}</p>
							<p class="w">{{ item.workingYears }}</p>
							<p class="e">{{ item.education }}</p>
						</div>
						<div class="boss-info">
							<img class="avatar" src="./../../../assets/imgs/defaultAvatar.png" alt="">
							<p class="p">{{ item.publisherNickName }}</p>
							<p class="dot"> · </p>
							<p class="p">{{ item.publisherPosition }}</p>
						</div>
					</li>
				</ul>
				<div slot="top" class="mint-loadmore-top">
					<mt-spinner class="flex-center" v-show="topStatus !== 'loading'" color="#26a2ff" type="fading-circle"></mt-spinner>
					<span v-show="topStatus === 'loading'">数据刷新中...</span>
				</div>
				<div v-if="allLoaded" style="text-align:center;" class="p-tb-01rem data-none">没有更多数据了</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<mt-spinner class="flex-center" v-show="bottomStatus !== 'loading'" color="#26a2ff" type="fading-circle"></mt-spinner>
					<span v-show="bottomStatus === 'loading'">数据加载中...</span>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import posHeader from './pos-header/index'
	export default {
		name: 'Genius',
		components: {
			posHeader
		},
		data () {
			return {
				topStatus: '',
				bottomStatus: '',
				allLoaded: false,
				max: 0,
				pageNum: 1,
				totalPage: 0,
				InitialLoading: true,
				wrapperHeight: 0,
				dataLists: [],
				total: 0
			}
		},
		mounted () {
			this.$store.commit('SET_SHOWMINEFOOTER', true)
			this.wrapperHeight = document.documentElement.clientHeight - 57 - 41
			this.loadTop()
		},
		methods: {
			topStop () {// 上拉刷新结束
				this.handleTopChange('loadingEnd')// 数据加载完毕 修改状态码
				this.$refs.loadmore.onTopLoaded()
			},
			botStop () {// 下拉加载更多结束
				this.handleBottomChange("loadingEnd")// 数据加载完毕 修改状态码
				this.$refs.loadmore.onBottomLoaded()
			},
			getLists (type) {
				this.$store.dispatch('positionList', { pageNum: this.pageNum })
				.then(d => {
					if(d.data.code == 0) {
						this.total = d.data.data.total
						if(type == 'refresh') {
							this.dataLists = d.data.data.list
							this.topStop()
						} else if(type == 'more') {
							this.dataLists = this.dataLists.concat(d.data.data.list)
							this.botStop()
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			handleTopChange (status) {
				this.topStatus = status
			},
			loadTop () {// 下拉刷新
				this.handleTopChange('loading') // 下拉时 改变状态码
				this.pageNum = 1;
				this.allLoaded = false;// 下拉刷新时解除上拉加载的禁用
				this.getLists('refresh')
			},
			handleBottomChange (status) {
				this.bottomStatus = status
			},
			loadBottom () {// 上拉加载更多
				this.handleBottomChange("loading")// 上拉时 改变状态码
				this.pageNum += 1;
				if (this.pageNum <= this.total) {// 最多下拉三次
					this.getLists('more')
				} else {
					this.allLoaded = true// 模拟数据加载完毕 禁用上拉加载
					this.botStop()
				}
			},
			changeCondition (result) {
				// 条件修改，重新获取数据
				this.loadTop()
			},
			goToDetail (item) {
				this.$router.push(`/positionDetail/${item._id}`)
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
	.genius {
		overflow: scroll;
		.outer-wrapper {
			margin-top(81px)
			.position-wrapper {
				li {
					padding: .18rem .16rem;
					border-bottom: .08rem solid #f3f3f3;
					div {
						display: flex;
						margin-bottom(.08rem);
						align-items(center);
						&.position-title {
							justify-content(space-between);
							font-color(#333)
							.t {
								font-size(.16rem);
								font-weight(600);	
							}
							.s {
								font-color(#26a2ff);
								font-weight(550);
							}
						}
						&.company-info, &.company-address, &.boss-info {
							font-color(#666)
							.b, .c, .e, .f, .p, .w {
								font-size(.12rem)
							}
							.f {
								margin-left(.04rem)
							}
							.w {
								margin-l-r(.06rem)
							}
						}
						&.company-address {
							margin-bottom(.12rem)
						}
						&.boss-info {
							margin-bottom(0)
							.avatar {
								width(.24rem);
								height(.24rem);
								margin-right(.06rem);
							}
							.dot {
								padding-l-r(.04rem)
							}
						}
					}
				}
			}
		}
	}
</style>