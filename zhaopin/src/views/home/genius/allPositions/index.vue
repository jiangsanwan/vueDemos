<template>
	<div class="all-positions">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="has-content" v-if="noContent">
			<div class="brief-info">
				<div class="flex info">
					<div class="l">
						<div class="name">{{ briefInfo.user }}</div>
						<div class="company">{{ briefInfo.company }} · {{ briefInfo.recruit }}</div>
					</div>
					<div class="r">
						<img src="@/assets/imgs/defaultAvatar.png" alt="">
					</div>
				</div>
				<ul class="flex tags">
					<li v-for="(item, index) in briefInfo.tags" :key="index">{{ item }}</li>
				</ul>
			</div>
			<div class="tab-list">
				<ul class="flex tab-wrapper">
					<li class="flex tac his-pos" :class="{'color26a2ff': active == 'tab-container1'}" @click="active = 'tab-container1'">TA的职位<span>{{ listLen }}</span></li>
					<li class="tac his-dyn" :class="{'color26a2ff': active == 'tab-container2'}" @click="active = 'tab-container2'">TA的动态</li>
				</ul>
				<mt-tab-container v-model="active" :swipeable="true">
					<mt-tab-container-item id="tab-container1">
						<div class="pos-outer-wrapper" :style="{ height: wrapperHeight + 'px' }">
							<mt-spinner class="flex-center" v-show="dataLists.length == 0 && InitialLoading" color="#26a2ff" type="fading-circle"></mt-spinner>
							<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
								<ul class="position-wrapper">
									<li v-for="(item, index) in dataLists" :key="index" @click="$router.push(`/positionDetail/${item._id}`)">
										<div class="position-title">
											<p class="t">{{ item.title }}</p>
											<p class="s">
												<span>{{ item.salaryMin | formatSalaryToK(false) }}-{{ item.salaryMax | formatSalaryToK(true) }}</span>
											</p>
										</div>
										<div class="boss-info">
											<p class="p">{{ item.city }}</p>
											<p class="dot"> · </p>
											<p class="p">{{ item.salaryMin | formatSalaryToK(false) }}-{{ item.salaryMax | formatSalaryToK(true) }}</p>
											<p class="dot"> · </p>
											<p class="p">{{ item.education | educationFilter }}</p>
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
					</mt-tab-container-item>
					<mt-tab-container-item id="tab-container2">
						<div class="flex dyn-outer-wrapper color606266">
							<div @click="applyEvent(0, readStory)">
								<i class="iconfont icon-my fs028rem"></i>
								<p class="m-t-b08rem fs012rem fw550">他的故事</p>
								<p class="btn-wrapper">
									<span v-show="!readStory" class="has-shadow fs012rem color000"><i class="iconfont icon-like fs012rem"></i>想看</span>
									<span v-show="readStory" class="no-shadow fs012rem">已经表示想看</span>
								</p>
							</div>
							<div @click="applyEvent(1, viewParners)">
								<i class="iconfont icon-group fs028rem"></i>
								<p class="m-t-b08rem fs012rem fw550">工作伙伴</p>
								<p class="btn-wrapper">
									<span v-show="!viewParners" class="has-shadow fs012rem color000"><i class="iconfont icon-like fs012rem"></i>想看</span>
									<span v-show="viewParners" class="no-shadow fs012rem">已经表示想看</span>
								</p>
							</div>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<div class="no-content" v-else>
			<no-content></no-content>
		</div>
	</div>
</template>

<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import NoContent from '@/components/no-content/index'
	import { mapState } from 'vuex'
	export default {
		name: 'AllPositions',
		components: { MineBtnsHeader, NoContent },
		computed: {
			...mapState({
				duration: state => state.duration
			})
		},
		data () {
			return {
				headerObj: {
					title: '',
					more: []
				},
				query: {
					pageNum: 1,
					publicId: this.$route.params.id,
				},
				briefInfo: {},
				noContent: true,
				active: 'tab-container1',
				listLen: 0,
				total: 0,
				dataLists: [],
				InitialLoading: true,
				wrapperHeight: 0,
				topStatus: '',
				bottomStatus: '',
				allLoaded: false,
				readStory: false,
				viewParners: false,
				loginUserInfo: sessionStorage.getItem('loginUserInfo') ? JSON.parse(sessionStorage.getItem('loginUserInfo')) : null
			}
		},
		mounted () {
			if(this.loginUserInfo != null) {
				let rsArr = this.loginUserInfo.applyReadStory.split('###'),
					vpArr = this.loginUserInfo.applyViewPartners.split('###');

				this.readStory = rsArr.includes(this.query.publicId)
				this.viewParners = vpArr.includes(this.query.publicId)
			}
			this._initCommon()
		},
		methods: {
			_initCommon () {
				sessionStorage.setItem('vuezhaopin_showminefooter', false)
				this.wrapperHeight = document.documentElement.clientHeight - 40 - 176 - 52.5
				this._initUserInfo()
				this.loadTop()
			},
			_initUserInfo () {
				this.$store.dispatch('getBaseInfo', { _id: this.query.publicId })
				.then(d => {
					if(d.data.code == 0) {
						this.noContent = true
						this.briefInfo = d.data.data
						let temp = JSON.parse(this.briefInfo.desc)
						this.briefInfo.tags = temp.tags.split('###')
						this.briefInfo.recruit = temp.recruit

						this.readStory = this.loginUserInfo.applyReadStory.split('###').includes(this.briefInfo._id)
						this.viewParners = this.loginUserInfo.applyViewPartners.split('###').includes(this.briefInfo._id)


					} else {
						this.noContent = false
						this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
					}
				})
				.catch(err => {
					this.noContent = false
					console.log(err)
				})
			},
			topStop () {// 上拉刷新结束
				this.handleTopChange('loadingEnd')// 数据加载完毕 修改状态码
				this.$refs.loadmore.onTopLoaded()
			},
			botStop () {// 下拉加载更多结束
				this.handleBottomChange("loadingEnd")// 数据加载完毕 修改状态码
				this.$refs.loadmore.onBottomLoaded()
			},
			getLists (type) {
				this.$store.dispatch('positionList', this.query)
				.then(d => {
					if(d.data.code == 0) {
						this.total = d.data.data.total
						this.listLen = d.data.data.length
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
				this.query.pageNum = 1;
				this.allLoaded = false;// 下拉刷新时解除上拉加载的禁用
				this.getLists('refresh')
			},
			handleBottomChange (status) {
				this.bottomStatus = status
			},
			loadBottom () {// 上拉加载更多
				this.handleBottomChange("loading")// 上拉时 改变状态码
				this.query.pageNum += 1;
				if (this.query.pageNum <= this.total) {
					this.getLists('more')
				} else {
					this.allLoaded = true// 模拟数据加载完毕 禁用上拉加载
					this.botStop()
				}
			},
			applyEvent (index, bol) {
				if(!bol) {
					this.$store.dispatch('setApply', { index: index, _id: this.loginUserInfo._id, targetId: this.query.publicId })
					.then(d => {
						if(d.data.code == 0) {
							let ajaxData = d.data.data,
								temp = JSON.parse(sessionStorage.getItem('loginUserInfo'))
							temp.applyReadStory = ajaxData.applyReadStory
							temp.applyViewPartners = ajaxData.applyViewPartners
							this.readStory = ajaxData.applyReadStory.split('###').includes(this.briefInfo._id)
							this.viewParners = ajaxData.applyViewPartners.split('###').includes(this.briefInfo._id)
							sessionStorage.setItem('loginUserInfo', JSON.stringify(temp))
						} else {
							this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
						}
					})
					.catch(err => {
						console.log(err)
					})
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/reset'
	@import './../../../../assets/stylus/common'
	@import './../../../../assets/stylus/position_wrapper'
	.all-positions {
		.has-content {
			margin-top(40px)
			.brief-info {
				height(176px)
				padding-l-r(.14rem)
				// background(#f00)
				background(url('./../../../../assets/imgs/bossImgs/all_pos_bg.png')  no-repeat)
				background-size: 100% 100%
				.info {
					padding-top(.3rem)
					align-items(center)
					justify-content(space-between)
					.l {
						font-color(#fff)
						.name {
							margin-bottom(.06rem)
							font-size(.24rem)
							font-weight(550)
						}
						.company {}
					}
					.r {
						width(.8rem)
						height(.8rem)
						border-radius(50%)
						img {
							width(100%)
						}
					}
				}
				.tags {
					align-items(center)
					font-color(#fff)
					li {
						padding-l-r(.06rem)
						height(.24rem)
						line-height(.24rem)
						font-size(.12rem)
						border-radius(.12rem)
						font-weight(500)
						background(linear-gradient(0, rgba(38, 162, 255, .2) 0%, rgba(38, 162, 255, .45) 33%, rgba(38, 162, 255, .65) 50%, rgba(38, 162, 255, .45) 66%, rgba(38, 162, 255, .5) 100%))
						border: 1px solid #fff
						&:not(:last-child) {
							margin-right(.1rem)
						}
					}
				}
			}
			.tab-list {
				.tab-wrapper {
					border-bottom: .5px solid #d9d9d9
					li {
						width(1rem)
						height(52px)
						line-height(52px)
						font-color(#666)
						&.his-pos {
							align-items(flex-start)
							justify-content(center)
							span {
								margin-left(.03rem)
								line-height(.42rem)
								font-size(.12rem)
								font-color(#666)
								font-weight(normal)
							}
						}
						&.color26a2ff {
							font-weight(500)
						}
					}
				}
			}
			.pos-outer-wrapper {
				overflow-y: scroll;
				.position-wrapper {
					padding-l-r(.16rem)
					li {
						padding-l-r(0)
						border-bottom-width: .01rem
						.position-title {
							.t {
								font-size(.14rem)
							}
						}
					}
				}
			}
			.dyn-outer-wrapper {
				align-items(center)
				padding-all(.16rem)
				div {
					padding-top(.15rem)
					padding-l-r(.08rem)
					width(1rem)
					height(1.2rem)
					border-radius(.08rem)
					border: 1px solid #d9d9d9
					.m-t-b08rem {
						margin-t-b(.08rem)
					}
					.btn-wrapper {
						margin-top(.2rem)
						span {
							&.has-shadow {
								padding-l-r(.06rem)
								border-radius(.02rem)
								box-shadow: 0 0 0.04rem 0 rgba(159,159,159,0.5)
								.iconfont {
									margin-right(.04rem)
								}
							}
							&.no-shadow {}
						}
					}
					&:last-child {
						margin-left(.16rem)
					}
				}
			}
		}
	}
</style>