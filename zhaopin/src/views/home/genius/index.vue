<template>
	<div class="genius">
		<pos-header @changeCondition="changeCondition"></pos-header>
		<div class="mt81px" :style="{ height: wrapperHeight + 'px' }">
			<mt-spinner class="flex-center" v-show="dataLists.length == 0 && InitialLoading" color="#26a2ff" type="fading-circle"></mt-spinner>
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul>
					<li v-for="item in dataLists" :key="item._id">{{ item._id }}</li>
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
<!-- <script type="text/ecmascript-6"> -->
<script>
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
			this.wrapperHeight = document.documentElement.clientHeight - 97 - 81;
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
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.genius {
		overflow: scroll;
	}
</style>