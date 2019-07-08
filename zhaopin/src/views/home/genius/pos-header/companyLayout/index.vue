<template>
	<div class="company-layout" @click.stop="reset(1)">
		<div class="container">
			<div class="outer-wrapper" ref="outerWrapper">
				<div class="content">
					<div class="cont-wrapper">
						<div class="title">融资规模</div>
						<ul class="cont">
							<li class="fixed-width" :class="{mb: index < 8,mr0: index == 3 || index == 7,active: item.selected}" v-for="(item, index) in financingScale" :key="index" @click.stop="financingScaleSelected(index)">{{item.title}}</li>
						</ul>
					</div>
					<div class="cont-wrapper">
						<div class="title">团队规模</div>
						<ul class="cont">
							<li class="fixed-width" :class="{mb: index < 4,mr0: index == 3 || index == 7,active: item.selected}" v-for="(item, index) in groupScale" :key="index" @click.stop="groupScaleSelected(index)">{{item.title}}</li>
						</ul>
					</div>
					<div class="cont-wrapper">
						<div class="title">行业</div>
						<ul class="cont">
							<li class="auto-width" :class="{mb: index < 27,mr0: index == 4 || index == 8 || index == 12 || index == 15 || index == 19 || index == 22 || index == 26 || index == 29,active: item.selected}" v-for="(item, index) in tradeList" :key="index" @click.stop="tradeListSelected(index)">{{item.title}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="operating-button-wrapper">
				<div class="operating-button">
					<div class="reset" @click.stop="reset(0)">重置</div>
					<div class="sure" @click.stop="sure">确定<span v-show="selectedNum > 0">({{ selectedNum }})</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	export default {
		data () {
			return {
				financingScale: [
					{ title: '全部', code: 0, selected: false },
					{ title: '未融资', code: 1, selected: false },
					{ title: '天使轮', code: 2, selected: false },
					{ title: 'A轮', code: 3, selected: false },
					{ title: 'B轮', code: 4, selected: false },
					{ title: 'C轮', code: 5, selected: false },
					{ title: 'D轮及以上', code: 6, selected: false },
					{ title: '以上市', code: 7, selected: false },
					{ title: '不需要融资', code: 8, selected: false }
				],
				groupScale: [
					{ title: '全部', code: 0, selected: false },
					{ title: '0-20人', code: 1, selected: false },
					{ title: '20-99人', code: 2, selected: false },
					{ title: '100-499人', code: 3, selected: false },
					{ title: '500-999人', code: 4, selected: false },
					{ title: '1000-9999人', code: 5, selected: false },
					{ title: '10000人以上', code: 6, selected: false }
				],
				tradeList: [
					{ title: '全部', code: 0, selected: false },
					{ title: '电子商务', code: 1, selected: false },
					{ title: '游戏', code: 2, selected: false },
					{ title: '媒体', code: 3, selected: false },
					{ title: '广告营销', code: 4, selected: false },
					{ title: '数据服务', code: 5, selected: false },
					{ title: '医疗健康', code: 6, selected: false },
					{ title: '生活服务', code: 7, selected: false },
					{ title: 'O2O', code: 8, selected: false },
					{ title: '旅游', code: 9, selected: false },
					{ title: '分类信息', code: 10, selected: false },
					{ title: '音乐/视频/阅读', code: 11, selected: false },
					{ title: '在线教育', code: 12, selected: false },
					{ title: '社交网络', code: 13, selected: false },
					{ title: '人力资源服务', code: 14, selected: false },
					{ title: '企业服务', code: 15, selected: false },
					{ title: '信息安全', code: 16, selected: false },
					{ title: '智能硬件', code: 17, selected: false },
					{ title: '移动互联网', code: 18, selected: false },
					{ title: '互联网', code: 19, selected: false },
					{ title: '计算机软件', code: 20, selected: false },
					{ title: '通信/网络设备', code: 21, selected: false },
					{ title: '广告/公关/会展', code: 22, selected: false },
					{ title: '互联网金融', code: 23, selected: false },
					{ title: '物流/仓储', code: 24, selected: false },
					{ title: '贸易/进出口', code: 25, selected: false },
					{ title: '咨询', code: 26, selected: false },
					{ title: '工程施工', code: 27, selected: false },
					{ title: '汽车生产', code: 28, selected: false },
					{ title: '其他行业', code: 29, selected: false }
				],
				companyData: null,
				selectedNum: 0,// 选择了多少项
				financingScaleStr: '',
				groupScaleStr: '',
				tradeListStr: '',
				companyScroll: null
			}
		},
		computed: {
			store () {
				return this.$store.state;
			}
		},
		mounted () {
			this._initScroll();
			this.companyData = this.store.positionConditionSelected.companyData;
			let self = this;
			this._initSelected(self.companyData.financingScaleStr, self.financingScale);
			this._initSelected(self.companyData.groupScaleStr, self.groupScale);
			this._initSelected(self.companyData.tradeListStr, self.tradeList);
			this.SelectedNumFun();			
		},
		methods: {
			_initScroll () {
				this.$nextTick(() => {
					if(!this.companyScroll) {
						this.companyScroll = new BScroll(this.$refs.outerWrapper, {
							click: true
						})
					} else {
						this.companyScroll.refresh();
					}
				});
			},
			// 初始化选项
			_initSelected (str, obj) {
				str.split(',').map(v => {
					if(!v) {
						obj[0].selected = true;
					} else {
						obj[v].selected = true;
					}
				});
			},
			// 改变选中的数量
			changedNum (obj, index) {
				let tempNum = 0,
					self = this,
					str = '';
				obj.map((v, i) => {
					if(i !== 0 && v.selected) {
						tempNum += 1;
						str += i + ',';
					}
				});
				switch (index) {
					case 0:
						self.financingScaleStr = str;
						break;
					case 1:
						self.groupScaleStr = str;
						break;
					case 2:
						self.tradeListSt = str;
						break;
				}
				this.selectedNum += tempNum;
			},
			// 取得选中的数量
			SelectedNumFun () {
				this.selectedNum = 0;
				this.changedNum(this.financingScale, 0);
				this.changedNum(this.groupScale, 1);
				this.changedNum(this.tradeList, 2);
			},
			// 切换选中状态
			changeSelected (index, obj) {
				if(index === 0) {
					obj.map(v => {
						v.selected = false;
					});
				} else {
					obj[0].selected = false;
				}
				obj[index].selected = !obj[index].selected;
				this.SelectedNumFun();
			},
			// 选择融资规模
			financingScaleSelected (index) {
				this.changeSelected(index, this.financingScale);
			},
			// 选择团队规模
			groupScaleSelected(index) {
				this.changeSelected(index, this.groupScale);
			},
			// 行业选择
			tradeListSelected (index) {
				this.changeSelected(index, this.tradeList);
			},
			// 重置方法体
			resetFun (arr) {
				arr.map((v, i) => {
					if(i === 0) {
						v.selected = true;
					} else {
						v.selected = false;
					}
				});
				this.SelectedNumFun();
			},
			reset (index) {
				if(index === 1) {
					if(!this.store.positionConditionSelected.companyData.selected) {
						this.resetFun(this.financingScale);
						this.resetFun(this.groupScale);
						this.resetFun(this.tradeList);
					}
					this.$emit('companyNum', -1);
				} else {
					this.store.positionConditionSelected.companyData.selected = false;
					this.resetFun(this.financingScale);
					this.resetFun(this.groupScale);
					this.resetFun(this.tradeList);
				}
			},
			sure () {
				this.store.positionConditionSelected.companyData.financingScaleStr = this.financingScaleStr.slice(0, this.financingScaleStr.length - 1);
				this.store.positionConditionSelected.companyData.groupScaleStr = this.groupScaleStr.slice(0, this.groupScaleStr.length - 1);
				this.store.positionConditionSelected.companyData.tradeListStr = this.tradeListSt.slice(0, this.tradeListSt.length - 1);
				this.store.positionConditionSelected.companyData.selected = true;
				this.$emit('companyNum', this.selectedNum);
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.company-layout {
		position: fixed;
		top: 4.05rem;
		bottom: 0;
		z-index: 1060;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		.container {
			position: relative;
			height: 17rem;
			background: #fafafa;
			overflow: hidden;
			.outer-wrapper {
				height: 17rem;
				.content {
					padding: 1.5rem 0.5rem;
					.cont-wrapper {
						color: #5a5a5a;
						.title {
							margin-bottom: 0.6rem;
							font-size: 0.6rem;
							span {
								color: #d6d6d6;
							}
						}
						.cont {
							margin-bottom: 1.2rem;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							flex-wrap: wrap;
							li {
								// width: 20%;
								margin-right: 0.17rem;
								line-height: 1.2rem;
								text-align: center;
								font-size: 0.6rem;
								border: 1px solid #d6d6d6;
								border-radius: 0.2rem;
								&.fixed-width {
									width: 3.5rem;
								}
								&.auto-width {
									padding: 0 0.5rem;
								}
								&.mb {
									margin-bottom: 0.5rem;
								}
								&.mr0 {
									margin-right: 0;
								}
								&.active {
									color: #fff;
									background: #34e8d6;
								}
							}
						}
					}
				}
			}
			.operating-button-wrapper {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 999;
				width: 100%;
				.operating-button {
					display: flex;
					width: 100%;
					div {
						width: 50%;
						text-align: center;
						line-height: 1.6rem;
						font-size: 0.6rem;
						border-top: 1px solid #d6d6d6;
						&.reset {
							color: #5a5a5a;
							background: #fafafa;
						}
						&.sure {
							color: #fff;
							background: #34e8d6;
						}
					}
				}
			}
		}
	}
</style>