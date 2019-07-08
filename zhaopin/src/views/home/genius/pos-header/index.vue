<template>
	<div class="pos-header">
		<div class="tabs">
			<ul class="position">
				<li :class="{active: index == activePosition}" v-for="(list, index) in positionList" :key="index" @click="changeActive(index, list)">{{ list.title }}</li>
			</ul>
			<div class="operate">
				<router-link to="/addExpectedPosition">
					<i class="iconfont icon-edit"></i>
				</router-link>
				<span></span>
				<router-link to="/searchJobCompany">
					<i class="iconfont icon-search"></i>
				</router-link>
			</div>
		</div>
		<ul class="condition">
			<li :class="{active: index == showConditionActive}" v-for="(list, index) in conditionList" :key="index" @click="showConditionOption(index)">
				{{ list }}
				<span v-show="index == 2 && companySelectedNum > 0">({{ companySelectedNum }})</span>
				<span v-show="index == 3 && requireSelectedNum > 0">({{ requireSelectedNum }})</span>
				<div class="thin-height" v-show="index < conditionList.length-1"></div>
			</li>
		</ul>
		<div class="thin-width"></div>
		<RecommendLatest v-if="showConditionPanel == 0" :activeRecommendLatest="0" @changeRecommendLatest="changeRecommendLatest"></RecommendLatest>
		<AddressLayout v-if="showConditionPanel == 1" @selectedRegionSubway="selectedRegionSubway"></AddressLayout>
		<CompanyLayout v-if="showConditionPanel == 2" @companyNum="companyNum"></CompanyLayout>
		<RequireLayout v-if="showConditionPanel == 3" @requireNum="requireNum"></RequireLayout>
	</div>
</template>

<script>
	import RecommendLatest from './positionLayout/index';
	import AddressLayout from './addressLayout/index';
	import CompanyLayout from './companyLayout/index';
	import RequireLayout from './requireLayout/index';
	export default {
		components: {
			RecommendLatest,
			AddressLayout,
			CompanyLayout,
			RequireLayout
		},
		data () {
			return {
				activePosition: 0,// 激活哪个职位tab
				showConditionActive: -1,// 激活哪个条件tab
				showConditionPanel: -1,// 显示哪个条件选择面板
				conditionList: ['推荐', '北京', '公司', '要求'],// 导航
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
				companySelectedNum: 0,
				requireSelectedNum: 0
			}
		},
		mounted () {
			// 需要根据用户的id获取tab列表
			this.conditionList[1] = this.positionList[0].workCity;
		},
		methods: {
			// 切换职位选择
			changeActive (index, list) {
				this.activePosition = index;
				this.conditionList[1] = list.workCity;
			},
			// 显示条件选择面板
			showConditionOption (index) {
				if(this.showConditionActive == index) {
					this.showConditionActive = -1;
					this.showConditionPanel = -1;
				} else {
					this.showConditionActive = index;
					this.showConditionPanel = index;
				}
			},
			// 切换状态
			changeRecommendLatest (result) {
				// console.log(result);// {title: "推荐", code: 0}
				this.conditionList[0] = result;
				this.showConditionPanel = -1;
				this.showConditionActive = -1;
				this.$emit("changeCondition", '');
			},
			// 修改地址
			selectedRegionSubway (data) {
				if(data != -1) {
					this.conditionList[1] = data;
				}
				this.showConditionActive = -1;
				this.showConditionPanel = -1;
				this.$emit("changeCondition", '');
			},
			// 修改公司相关选项个数
			companyNum (num) {
				this.showConditionActive = -1;
				this.showConditionPanel = -1;
				if(num !== -1) {
					this.companySelectedNum = num;
					this.$emit("changeCondition", '');
				}
			},
			// 修改要求相关选项个数
			requireNum (num) {
				this.showConditionActive = -1;
				this.showConditionPanel = -1;
				if(num !== -1) {
					this.requireSelectedNum = num;
					this.$emit("changeCondition", '');
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.pos-header {
		position: fixed;
		top: 40px;
		left: 0;
		z-index: 1060;
		width: 100%;
		height: 40px;
		.tabs {
			color: #fff;
			background: #34E8D6;
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
			justify-content: center;
			background: #fff;
			li {
				position: relative;
				width: 25%;
				line-height: 40px;
				text-align: center;
				font-size: 0.14rem;
				color: #5A5A5A;
				.thin-height {
					position: absolute;
					top: 0px;
					right: 0;
					width: 1px;
					height: 40px;
					transform: scaleX(0.5);
					background: #D6D6D6;
				}
				&.active {
					color: #34e8d6;
				}
			}
		}
	}
</style>