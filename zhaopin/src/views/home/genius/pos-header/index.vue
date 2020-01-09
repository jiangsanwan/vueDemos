<template>
	<div class="pos-header">
		<div class="tabs">
			<ul class="position">
				<li :class="{active: index == activePosition}" v-for="(list, index) in positionList" :key="index" @click="changeActive(index, list)">{{ list.title }}</li>
			</ul>
			<div class="operate">
				<router-link to="/addExpectedPosition">
					<i class="iconfont icon-add-fill"></i>
				</router-link>
				<span></span>
				<router-link to="/searchJobCompany">
					<i class="iconfont icon-search"></i>
				</router-link>
			</div>
		</div>
		<ul class="condition">
			<li>
				<mt-cell :class="{ 'active': showConditionActive == 0 }" class="mine-cell" title="推荐" @click.native.capture="showConditionOption(0)"></mt-cell>
				<mt-cell :class="{ 'active': showConditionActive == 1 }" class="mine-cell" title="最新" @click.native.capture="showConditionOption(1)"></mt-cell>
			</li>
			<li>
				<mt-button class="mine-button" type="default" @click.native.capture="changeRouter('/selectAddress')">
					{{ selectAddress }}
					<span class="more"></span>
				</mt-button>
				<mt-button class="mine-button" :class="{ 'selected': selectOptions > 0 }" type="default" @click.native.capture="changeRouter('/selectCondition')">
					{{ selectOptions > 0 ? '筛选 · ' + selectOptions : '筛选' }}
					<span class="more"></span>
				</mt-button>
			</li>
		</ul>
		<div class="thin-width"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'posHeader',
		data () {
			return {
				activePosition: 0,// 激活哪个职位tab
				showConditionActive: 0,// 激活哪个条件tab
				conditionList: ['推荐', '最新'],// 导航
				positionList: [// 用户自己的求职意向
					{
						title: 'HTML5',
						workCity: '北京',
						salary: '16k-20k',
						industry: '在线教育、社交网络'
					},
					{
						title: 'HTML5',
						workCity: '合肥',
						salary: '12k-16k',
						industry: '移动互联网'
					}
				],
				selectAddress: '',
				selectOptions: 10
			}
		},
		mounted () {
			// 需要根据用户的id获取tab列表
			this.selectAddress = this.positionList[0].workCity;
		},
		methods: {
			// 切换职位选择
			changeActive (index, list) {
				this.activePosition = index;
				this.conditionList[1] = list.workCity;
			},
			// 显示条件选择面板
			showConditionOption (index) {
				if(index != this.showConditionActive) {
					this.showConditionActive = index
				}
				this.$emit('changeCondition', { recommendLatest: index })
			},
			changeRouter (router) {// 改变路由
				this.$router.push(router)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.pos-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1060;
		width: 100%;
		.tabs {
			color: #fff;
			background: #26a2ff;
			display: flex;
			.position {
				flex: 1;
				li {
					display: inline-block;
					padding: 0 0.1rem;
					line-height: 40px;
					font-size: 0.16rem;
					&.active {
						font-size: 0.18rem;
					}
				}
			}
			.operate {
				width: .7rem;
				line-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					margin: 0 0.1rem;
					display: inline-block;
					width: 1px;
					height: 20px;
					background: #fff;
					vertical-align: middle;
				}
				a {
					color: #fff;
					.iconfont {
						font-size: 0.2rem;
						vertical-align: middle;
					}
				}
			}
		}
		.condition {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			padding: 0 .1rem;
			height: 40px;
			li {
				display: flex;
				line-height: 40px;
				text-align: center;
				align-items: center;
				font-size: 0.14rem;
				color: #5A5A5A;
				.active {
					color: #26a2ff;
				}
				.mine-cell {
					min-height: 40px;
					background-size: 0 0;
				}
				.mine-button {
					position: relative;
					height: 28px;
					padding: 0 14px 0 10px;
					&:first-child {
						margin-right: 8px;
					}
					.more {
						position: absolute;
						right: .06rem;
						bottom: .06rem;
						width: 0;
						height: 0;
						border-bottom: .06rem solid #ccc;
						border-left: .06rem solid transparent;
					}
					&:after {
						background: transparent;
					}
					&.selected {
						font-weight: 550;
						color: #26a2ff;
						background: rgba(38, 162, 255, 0.1);
					}
					.mint-button-text {
						display: flex;
					}
				}
			}
		}
	}
</style>