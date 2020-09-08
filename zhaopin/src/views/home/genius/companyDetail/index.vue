<template>
	<div class="company-detail">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="bg102135 common-header-wrapper" v-if="detailObj._id">
			<div class="padding-l-r-10px">
				<div class="flex company-brief">
					<div class="flex_1 c-b-cont">
						<div class="c-b-c-title">{{ detailObj.company }}</div>
						<div class="flex c-b-c-text">{{ detailObj.finance | financeFilter }} · {{ detailObj.scaleMin }}-{{ detailObj.scaleMax }}人 · {{ detailObj.companyType }}</div>
					</div>
					<div class="logo">
						<!-- 这个其实是企业logo -->
						<img src="@/assets/imgs/defaultAvatar.png" alt="">
						<!-- <img src="./../../../../assets/imgs/defaultAvatar.png" alt=""> -->
					</div>
				</div>
				<ul class="flex employee-welfare">
					<li class="flex work-start-end">
						<i class="iconfont icon-time"></i>
						上午{{ detailObj.employeeWelfare.workStart }} - 下午{{ detailObj.employeeWelfare.workEnd }}
					</li>
					<li class="flex weekend">
						<i class="iconfont icon-daily"></i>
						{{ detailObj.employeeWelfare.weekend | weekendFilter }}
					</li>
					<li class="flex overtime">
						<i class="iconfont icon-company"></i>
						{{ detailObj.employeeWelfare.overtime | overtimeFilter }}
					</li>
					<li class="p-more" @click="showComponentEvent('EmployeeWelfare')">
						<span class="iconfont icon-arrowRight"></span>
					</li>
				</ul>
				<div class="model-nav" ref="modelNav" @click="showComponentEvent('EmployeeWelfare')">
					<ul class="welfare-title">
						<li class="flex" v-for="(item, index) in welfareList" :key="index">
							<i class="iconfont" :class="item.icon"></i>
							<span class="wel-title">{{ item.title }}</span>
						</li>
					</ul>
				</div>
				<div class="address">
					<div class="flex title">
						<span class="inner-title t-l">公司地址</span>
						<span class="flex t-r" @click="showComponentEvent('AddressList')">全部地址<i class="iconfont icon-arrowRight"></i></span>
					</div>
					<ul class="flex detailed">
						<li class="a-l">{{ detailObj.detailedAddress }}</li>
						<!-- 打开百度地图的组件 -->
						<li class="flex a-r"><i class="iconfont icon-position"></i>导航</li>
					</ul>
				</div>
				<div class="abstract">
					<div class="inner-title">公司介绍</div>
					<div class="abs-cont">{{ detailObj.abstract | limitLengthFilter(abstractLength) }}<span class="abs-more" v-show="abstractLength != 0 && abstractLength < detailObj.abstract.length" @click="abstractLength = 0">查看更多</span></div>
				</div>
				<div class="introduce-figure">
					<div class="inner-title">公司照片</div>
					<div class="i-f-wrapper" ref="ifWrapper">
						<ul class="i-f-inner">
							<li v-for="(item, index) in detailObj.introduceFigure" :key="index">
								<img :src="item" alt="">
							</li>
						</ul>
					</div>
				</div>
				<div class="executives-introduce">
					<div class="inner-title">热门BOSS</div>
					<div class="e-i-wrapper" ref="executivesIntroduce">
						<ul class="e-i-inner">
							<li v-for="(item, index) in detailObj.executivesintroduce" :key="index" @click="$router.push(`/allPositions/${item.publicId}`)">
								<img src="@/assets/imgs/defaultAvatar.png" alt="">
								<p class="name">{{ item.name }}</p>
								<p class="position">{{ item.position }}</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="business-information">
					<div class="flex inner-title">
						工商信息
						<p class="flex view-more" @click="showComponentEvent('BiMoreinfo')">查看全部<span class="iconfont icon-arrowRight"></span></p>
					</div>
					<ul class="b-i-content">
						<li>
							<div class="k">公司全称</div>
							<div class="v">{{ detailObj.businessInformation.CompanyFullName }}</div>
						</li>
						<li>
							<div class="k">企业法人</div>
							<div class="v">{{ detailObj.businessInformation.legalRepresentative }}</div>
						</li>
						<li>
							<div class="k">官方地址</div>
							<div class="v">{{ detailObj.officialWebsite }}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<no-content v-else></no-content>
		<!-- 福利待遇、地址滑窗 -->
		<div class="more-info-content" v-show="showComponentOuter" @click.self="callback">
			<transition name="moveToTop">
				<component v-if="showComponent" :detailObj="detailObj" :welfareList="welfareList" :is="componentName" @callback="callback"></component>
			</transition>
		</div>
	</div>
</template>

<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import EmployeeWelfare from './employeeWelfare/index'
	import AddressList from './addressList/index'
	import BiMoreinfo from './businessInformation/index'
	import NoContent from '@/components/no-content'
	import { stringToObject } from '@/utils/common'
	import { mapState } from 'vuex'
	import BScroll from 'better-scroll'
	import figure1jpg from '@/assets/imgs/introduceFigure/1.jpg'
	import figure2jpg from '@/assets/imgs/introduceFigure/2.jpg'
	import figure3jpg from '@/assets/imgs/introduceFigure/3.jpg'
	export default {
		name: 'CompanyDetail',
		components: { MineBtnsHeader, EmployeeWelfare, AddressList, BiMoreinfo, NoContent },
		computed: {
			...mapState({
				duration: state => state.duration
			}),
		},
		data () {
			return {
				publicId: this.$route.params.id,
				headerObj: {
					title: '',
					headBg: 'bg102135',
					more: [ 'icon-favorite', 'icon-warning', 'icon-share' ]
				},
				detailObj: {},
				componentName: '',
				showComponentOuter: false,
				showComponent: false,
				timer: null,
				iconfontList: {
					risksGold: 'icon-verify',
					annualLeave: 'icon-car',
					annualBonus: 'icon-trophy',
					paidAnnualLeave: 'icon-company',
					mealSupplement: 'icon-basket',
					communicationSubsidy: 'icon-change',
					holidaySubsidy: 'icon-bond'
				},
				welfareList: [],
				modelScroll: null,
				figureScroll: null,
				executivesScroll: null,
				abstractLength: 20,
				figures: {
					'1': figure1jpg,
					'2': figure2jpg,
					'3': figure3jpg
				}
			}
		},
		mounted () {
			sessionStorage.setItem('vuezhaopin_showminefooter', false)
			this._initData()
		},
		methods: {
			_initData () {
				this.$store.dispatch('getCompanyDetailById', { publicId: this.publicId })
				.then(d => {
					if(d.data.code == 0) {
						this.detailObj = d.data.data
						this.detailObj.employeeWelfare = JSON.parse(this.detailObj.employeeWelfare)
						Object.keys(this.detailObj.employeeWelfare).forEach(v => {
							if(typeof this.detailObj.employeeWelfare[v] == 'string' && this.detailObj.employeeWelfare[v].indexOf('{') >= 0) {
								this.detailObj.employeeWelfare[v] = stringToObject(this.detailObj.employeeWelfare[v])
							}
						})
						this.detailObj.businessInformation = JSON.parse(this.detailObj.businessInformation)
						this.detailObj.executivesintroduce = JSON.parse(this.detailObj.executivesintroduce)
						this.detailObj.introduce = JSON.parse(this.detailObj.introduce)
						this.detailObj.introduceFigure = this.detailObj.introduceFigure.split('###')
						this.detailObj.introduceFigure.forEach((v, i) => {
							this.detailObj.introduceFigure[i] = this.figures[v.split('.')[0]]
						})

						this.welfareList = []
						Object.keys(this.detailObj.employeeWelfare).forEach(attr => {
							if(typeof this.detailObj.employeeWelfare[attr] == 'object') {
								this.welfareList.push({ ...this.detailObj.employeeWelfare[attr], icon: this.iconfontList[attr] })
							}
						})

						this._initModel()

						console.log(this.detailObj)
					} else {
						this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			_initModel () {
				this.$nextTick(() => {
					if (!this.modelScroll) {
						this.modelScroll = new BScroll(this.$refs.modelNav, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					} else {
						this.modelScroll.refresh();
					}
					if(!this.figureScroll) {
						this.figureScroll = new BScroll(this.$refs.ifWrapper, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					} else {
						this.figureScroll.refresh();
					}
					if(!this.executivesScroll) {
						this.executivesScroll = new BScroll(this.$refs.executivesIntroduce, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					} else {
						this.executivesScroll.refresh();
					}
				})
			},
			showComponentEvent (name) {
				this.componentName = name
				this.showComponentOuter = true
				this.showComponent = true
			},
			callback () {
				this.componentName = ''
				this.showComponent = false
				this.timer = setTimeout(() => {
					this.showComponentOuter = false
					this.timer = null
					clearTimeout(this.timer)
				}, 300)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/reset'
	@import './../../../../assets/stylus/common_header_wrapper'
	@import './../../../../assets/stylus/common'
	.moveToTop-enter-active,
	.moveToTop-leave-active {
		transition: all .3s ease;
	}
	.moveToTop-enter,
	.moveToTop-leave-to {
		top: 100vh;
	}
	.moveToTop-enter-to,
	.moveToTop-leave {
		top: 20vh;
	}
	.common-header-wrapper {
		position(fixed)
		all(0)
		overflow-y(auto)
		font-color(#fff)
		.inner-title {
			margin-bottom(.12rem)
			font-size(.16rem)
			font-weight(550)
		}
		.company-brief {
			align-items(center)
			padding-t-b(.2rem)
			.logo {
				padding-all(.05rem)
				border-radius(.1rem)
				border: 1px solid #eee
				img {
					width(.4rem)
					height(.4rem)
				}
			}
			.c-b-cont {
				align-items(center)
				.c-b-c-title {
					font-size(.18rem)
				}
				.c-b-c-text {
					margin-top(.1rem)
					font-size(.12rem)
				}
			}
		}
		.employee-welfare {
			padding-bottom(.1rem)
			align-items(center)
			justify-content(space-between)
			li {
				align-items(center)
				font-size(.12rem)
				&.weekend {
					padding-l-r(.12rem)
				}
				&.p-more {
					width(.2rem)
					height(.2rem)
					text-align(center)
					line-height(.2rem)
				}
			}
		}
		.model-nav {
			width(100%)
			overflow: hidden
			white-space: nowrap
			margin-bottom(.3rem)
			.welfare-title {
				width(7.6rem)
				li {
					display(inline-block)
					padding-all(.1rem)
					width(1rem)
					border-radius(.08rem)
					border: 1px solid #fff
					.iconfont {
						font-size(.14rem)
					}
					span {
						margin-left(.05rem)
						font-size(.12rem)
					}
					&:not(:last-child) {
						margin-right(.1rem)
					}
				}
			}
		}
		.address {
			margin-bottom(.3rem)
			div, ul {
				align-items(center)
				justify-content(space-between)
				&.title {
					.t-l {
						margin-bottom(0)
					}
					.t-r {
						align-items(center)
						font-size(.12rem)
					}
				}
				&.detailed {
					margin-top(.12rem)
					li {
						font-size(.12rem)
						&.a-l {}
						&.a-r {
							align-items(center)
							justify-content(center)
							width(.6rem)
							line-height(.24rem)
							border-radius(.15rem)
							border: 1px solid #fff
							.iconfont {
								font-size(.12rem)
							}
						}
					}
				}
			}
		}
		.abstract {
			margin-bottom(.3rem)
			.abs-cont {
				line-height(.18rem)
				font-size(.12rem)
				.abs-more {
					font-size(.12rem)
					font-color(#999)
				}
			}
		}
		.introduce-figure {
			margin-bottom(.3rem)
			.i-f-wrapper {
				width(100%)
				overflow: hidden
				white-space: nowrap
				.i-f-inner {
					width(4.7rem)
					li {
						display(inline-block)
						width(1.5rem)
						img {
							width(100%)
							border-radius(.1rem)
						}
						&:not(:last-child) {
							margin-right(.1rem)
						}
					}
				}
			}
		}
		.executives-introduce {
			margin-bottom(.3rem)
			.e-i-wrapper {
				width(100%)
				overflow: hidden
				white-space: nowrap
				.e-i-inner {
					width(392px)
					li {
						display(inline-block)
						width(.6rem)
						text-align(center)
						img {
							width(100%)
						}
						p {
							&.name {
								margin-top(.04rem)
								font-size(.12rem)
							}
							&.position {
								margin-top(.02rem)
								font-size(.1rem)
							}
						}
						&:not(:last-child) {
							margin-right(.1rem)
						}
					}
				}
			}
		}
		.business-information {
			padding-bottom(.3rem)
			.inner-title {
				align-items(center)
				justify-content(space-between)
				.view-more {
					align-items(center)
					line-height(.16rem)
					font-size(.12rem)
					font-weight(normal)
				}
			}
			.b-i-content {
				li {
					height(.26rem)
					display(flex)
					align-items(center)
					div {
						font-size(.12rem)
						&.k {
							width(.7rem)
						}
						&.k {
							flex(1)
						}
					}
				}
			}
		}
	}
	.more-info-content {
		position(fixed)
		all(0)
		zindex(9999)
		background(rgba(0, 0, 0, .3))
	}
</style>