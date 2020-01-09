<template>
	<div class="position-detail">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="common-header-wrapper">
			<div class="padding-l-r-10px">
				<div class="title-wrapper">
					<div class="flex hw-com flex-c-sb">
						<div class="fs02rem fw550">{{ detailObj.title }}</div>
						<div class="color26a2ff">
							{{ detailObj.salaryMin | formatSalaryToK(false) }}-{{ detailObj.salaryMax | formatSalaryToK(true) }}
							<span v-show="detailObj.salaryNumber"> · </span>
							<span v-show="detailObj.salaryNumber">{{ detailObj.salaryNumber }}薪</span>
						</div>
					</div>
					<div class="flex hw-com flex-c-fs">
						<div class="flex flex-a-c"><i class="iconfont icon-position"></i>{{ detailObj.briefAddress }}</div>
						<div class="flex flex-a-c"><i class="iconfont icon-company"></i>{{ detailObj.workingYearsMin | formatWorkingYears(false) }}-{{ detailObj.workingYearsMax | formatWorkingYears(true) }}</div>
						<div class="flex flex-a-c"><i class="iconfont icon-idcard"></i>{{ detailObj.education | educationFilter }}</div>
					</div>
				</div>
				<div class="thin-width"></div>
				<div class="flex public-wrapper" @click="$router.push(`/allPositions/${detailObj.publicId}`)">
					<div class="p-avatar">
						<img src="@/assets/imgs/defaultAvatar.png" alt="">
					</div>
					<ul class="flex_1 p-info">
						<li class="flex">
							<div class="nickname">{{ detailObj.publisherNickName }}</div>
							<div class="online">{{ detailObj.active | userActiveFilter(detailObj.timeStamp) }}</div>
						</li>
						<li>{{ detailObj.company }} · {{ detailObj.publisherPosition }}</li>
					</ul>
					<div class="p-more">
						<span class="iconfont icon-arrowRight"></span>
					</div>
				</div>
				<div class="thin-width"></div>
				<div class="p-d-content">
					<div class="title">职位详情</div>
					<!-- 岗位职责 -->
					<ul class="qualification">
						<li class="i-t">岗位职责:</li>
						<li v-for="(item, index) in detailObj.positionDetails" :key="index">{{ index + 1 }}、{{ item }}</li>
					</ul>
					<!-- 任职资格 -->
					<div class="i-t" :class="{'mb02rem': !moreShow}">
						任职要求
						<span>{{ !moreShow ? '…' : ':'}}</span>
						<span class="color26a2ff" v-show="!moreShow" @click="moreShow = true">查看全部</span>
					</div>
					<transition name="fade-transform" mode="out-in">
						<ul class="qualification" v-show="moreShow">
							<li v-for="(item, index) in detailObj.qualification" :key="index">{{ item }}</li>
						</ul>
					</transition>
					<!-- 技术相关标签 -->
					<ul class="flex skills-required">
						<li v-for="(item, index) in detailObj.skillsRequired" :key="index">{{ item }}</li>
					</ul>
				</div>
				<div class="thin-width"></div>
				<div class="team-introduction" v-if="detailObj.teamIntroduction && detailObj.teamIntroduction.teamLabel">
					<div class="title">团队介绍</div>
					<ul class="flex skills-required">
						<li v-for="(item, index) in detailObj.teamIntroduction.teamLabel" :key="index">{{ item }}</li>
					</ul>
					<div class="other-info">{{ detailObj.teamIntroduction.otherInfo }}</div>
				</div>
				<div class="thin-width"></div>
				<div class="flex company-brief" @click="$router.push(`/companyDetail/${detailObj.publicId}`)">
					<div class="logo">
						<img src="@/assets/imgs/defaultAvatar.png" alt="">
					</div>
					<div class="flex_1 c-b-cont">
						<div class="c-b-c-title">{{ detailObj.company }}</div>
						<div class="flex c-b-c-text">{{ detailObj.finance | financeFilter }} · {{ detailObj.scaleMin }}-{{ detailObj.scaleMax }}人 · {{ detailObj.companyType }}</div>
					</div>
					<div class="p-more">
						<span class="iconfont icon-arrowRight"></span>
					</div>
				</div>

				<div class="map">
					<div class="allmap" id="allmap" ref="allmap"></div>
				</div>
				<div class="reminder">
					<div class="colorf56c6c font-size-14rem title">温馨提示</div>
					<div class="color606266 font-size-12rem">该Boss承诺名下所有职位不向您收费，如有不实，请立即举报。</div>
				</div>
				<div class="thin-width"></div>
				<div class="competitiveness-analysis">
					<div class="flex">
						<div class="font-size-16rem fw550">你的竞争力分析</div>
						<div class="flex font-size-12rem">使用竞争力分析器<span class="iconfont icon-arrowRight"></span></div>
					</div>
					<div class="mt02rem text">近90天共有{{ detailObj.visitorsNumber }}位牛人沟通过该职位，您是第<span></span>个</div>
					<div class="text">您在当前竞聘者中综合竞争力排名是第<span></span>位</div>
				</div>
			</div>
		</div>
		<mine-communicate-footer :id="publicId"></mine-communicate-footer>
	</div>
</template>
<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import MineCommunicateFooter from '@/components/mine-communicate-footer/index'

	import { BaiduMap } from '@/utils/map'

	export default {
		name: 'PositionDetail',
		components: { MineBtnsHeader, MineCommunicateFooter },
		data () {
			return {
				id: this.$route.params.id,
				publicId: '',
				headerObj: {
					title: '',
					more: [ 'icon-favorite', 'icon-warning', 'icon-share' ]
				},
				detailObj: {},
				map: {
					width: '',
					height: '',
					zoom: 18,
					lat: null,
					lng: null
				},
				moreShow: false
			}
		},
		mounted () {
			this.$store.commit('SET_SHOWMINEFOOTER', false)
			this.initData()

			this.$nextTick(function() {
				BaiduMap.init().then(BMap => {
					let map = new BMap.Map(this.$refs.allmap);  // 创建Map实例
					map.centerAndZoom(new BMap.Point(117.1414067344, 31.8439926477), 11); // 初始化地图,设置中心点坐标和地图级别
					// map.setCurrentCity("合肥"); // 设置地图显示的城市 此项是必须设置的
					this.fixedLocation(map)
					map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放
				})
			})
		},
		methods: {
			fixedLocation (map) {// 设置地图的中心点
				map.clearOverlays(); 
				var new_point = new BMap.Point(117.1414067344, 31.8439926477);
				var marker = new BMap.Marker(new_point);// 创建标注
				map.addOverlay(marker);// 将标注添加到地图中
				map.panTo(new_point); 
			},
			initData () {
				this.$store.dispatch('getPositionDetailById', { _id: this.id })
				.then(d => {
					console.log(d)
					if(d.data.code == 0) {
						this.detailObj = d.data.data
						this.detailObj.positionDetails = this.detailObj.positionDetails.split('###')
						this.detailObj.qualification = this.detailObj.qualification.split('###')
						this.detailObj.skillsRequired = this.detailObj.skillsRequired.split('###')
						this.detailObj.teamIntroduction = JSON.parse(this.detailObj.teamIntroduction)
						this.detailObj.teamIntroduction.teamLabel = this.detailObj.teamIntroduction.teamLabel.split('###')
						this.publicId = this.detailObj.publicId
					}
				})
				.catch(err => {
					console.log(err)
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
						padding-bottom(.14rem);
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
			.public-wrapper {
				padding-t-b(.2rem);
				align-items(center);
				font-color(#666);
				.p-avatar {
					margin-right(.1rem);
					width(.5rem);
					img {
						width(100%);
					}
				}
				.p-info {
					li {
						font-soze(.14rem);
						&.flex {
							align-items(center);
						}
						.nickname {
							font-size(.16rem);
							font-color(#000);
							font-weight(550);
						}
						.online {
							margin-left(.06rem);
							font-size(.12rem);
						}
						&:first-child {
							margin-bottom(.1rem);
						}
					}
				}
				.p-more {
					width(.2rem);
					height(.2rem);
					text-align(center);
					line-height(.2rem);
				}
			}
			.p-d-content, .team-introduction {
				padding-top(.2rem);
				padding-bottom(.1rem);
				font-color(#666);
				.title {
					padding-bottom(.18rem);
					font-size(.16rem);
					font-color(#000);
					font-weight(550);
				}
				div.i-t {
					font-size(.14rem);
					line-height(.24rem);
					&.mb02rem {
						margin-bottom(.2rem)
					}
				}
				ul {
					li {
						&.i-t {
							font-size(.14rem);
						}
						font-size(.12rem);
						line-height(.24rem);
					}
					&.qualification {
						margin-bottom(.12rem);
					}
					&.skills-required {
						align-items(center);
						flex-wrap(wrap);
						li {
							margin-bottom(.1rem);
							padding-l-r(.1rem);
							height(.24rem);
							line-height(.24rem);
							background(#eee);
							border-radius(.04rem);
							&:not(:last-child) {
								margin-right(.1rem);
							}
						}
					}
				}
				&.team-introduction {
					.skills-required {
						li {
							background(#fff);
							border: 1px solid #eee;
						}
					}
					.other-info {
						margin-top(.06rem);
						line-height(.2rem);
						font-size(.12rem);
					}
				}
			}
			.company-brief {
				align-items(center);
				padding-t-b(.2rem)
				.logo {
					padding-all(.05rem);
					border-radius(.1rem);
					border: 1px solid #eee;
					img {
						width(.4rem);
						height(.4rem);
					}
				}
				.c-b-cont {
					align-items(center);
					margin-left(.1rem);
					.c-b-c-title {
						font-size(.14rem);
						font-color(#000);
					}
					.c-b-c-text {
						margin-top(.1rem);
						font-size(.12rem);
						font-color(#666);
					}
				}
				.p-more {
					width(.2rem);
					height(.2rem);
					text-align(center);
					line-height(.2rem);
				}
			}
			.map {
				height(2rem);
				border-radius(.1rem);
				overflow: hidden;
				.allmap {
					height(2rem);
				}
			}
			.reminder {
				padding-t-b(.2rem);
				.title {
					padding-bottom(.12rem);
					font-weight(500);
				}
			}
			.competitiveness-analysis {
				padding-t-b(.2rem);
				.flex {
					align-items(center);
					justify-content(space-between);
					.flex {
						align-items(center);
					}
				}
				.text {
					padding-t-b(.1rem);
					font-color(#666);
					span {
						position(relative);
						top(.02rem);
						display(inline-block);
						margin-right(6px)
						margin-left(2px)
						width(.1rem);
						height(.1rem);
						background(#afeeee);
						box-shadow: .04rem -0.04rem #e1ffff;
						filter: blur(.01rem);
					}
					&.mt02rem {
						margin-top(.2rem);
					}
				}
			}
		}
	}
</style>