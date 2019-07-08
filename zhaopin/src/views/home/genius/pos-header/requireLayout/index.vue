<template>
	<div class="require-layout" @click.stop="reset(1)">
		<div class="container">
			<div class="cont-wrapper">
				<div class="title">最低学历</div>
				<ul class="cont">
					<li :class="{mb: index < 4,mr0: (index == 3 || index == 7),active: item.selected}" v-for="(item, index) in educationList" :key="index" @click.stop="educationSelected(index)">{{item.title}}</li>
				</ul>
			</div>
			<div class="cont-wrapper">
				<div class="title">经验</div>
				<ul class="cont">
					<li :class="{mb: index < 4,mr0: (index == 3 || index == 7),active: item.selected}" v-for="(item, index) in experienceList" :key="index" @click.stop="experienceSelected(index)">{{ item.title }}</li>
				</ul>
			</div>
			<div class="cont-wrapper">
				<div class="title">薪资<span>(单选)</span></div>
				<ul class="cont">
					<li :class="{mb: index < 4,mr0: (index == 3 || index == 7),active: item.selected}" v-for="(item, index) in salaryList" :key="index" @click.stop="salarySelected(index)">{{ item.title }}</li>
				</ul>
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
	export default {
		data () {
			return {
				educationList: [// 最低学历列表
					{ title: '全部', code: 0, selected: false },
					{ title: '初中及以下', code: 1, selected: false },
					{ title: '中专/中技', code: 2, selected: false },
					{ title: '高中', code: 3, selected: false },
					{ title: '大专', code: 4, selected: false },
					{ title: '本科', code: 5, selected: false },
					{ title: '硕士', code: 6, selected: false },
					{ title: '博士', code: 7, selected: false }
				],
				experienceList: [// 经验
					{ title: '全部', code: 0, selected: false },
					{ title: '应届生', code: 1, selected: false },
					{ title: '1年以内', code: 2, selected: false },
					{ title: '1-3年', code: 3, selected: false },
					{ title: '3-5年', code: 4, selected: false },
					{ title: '5-10年', code: 5, selected: false },
					{ title: '10年以上', code: 6, selected: false }
				],
				salaryList: [// 薪资
					{ title: '全部', code: 0, selected: false },
					{ title: '3k以下', code: 1, selected: false },
					{ title: '3k-5k', code: 2, selected: false },
					{ title: '5k-10k', code: 3, selected: false },
					{ title: '10k-20k', code: 4, selected: false },
					{ title: '20k-50k', code: 5, selected: false },
					{ title: '50k以上', code: 6, selected: false }
				],
				requireData: null,
				selectedNum: 0,// 选择了多少项
				educationStr: '',// 最低学历选项下标对应的字符串
				experienceStr: '',// 经验选项下标对应的字符串
				salaryStr: ''// 薪资选项下标对应的字符串
			}
		},
		computed: {
			store () {
				return this.$store.state;
			},
		},
		mounted () {
			this.requireData = this.store.positionConditionSelected.requireData;
			let self = this;
			// if(self.requireData.educationStr) {
				this._initSelected(self.requireData.educationStr, self.educationList);
			// }
			// if(self.requireData.experienceStr) {
				this._initSelected(self.requireData.experienceStr, self.experienceList);
			// }
			// if(self.requireData.salaryStr) {
				this._initSelected(self.requireData.salaryStr, self.salaryList);
			// }
			this.SelectedNumFun();
		},
		methods: {
			/*
			* 初始化选项
			* params str String 选项下标对应的字符串
			* params obj Object 最低学历、经验、薪资列表
			*/
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
						self.educationStr = str;
						break;
					case 1:
						self.experienceStr = str;
						break;
					case 2:
						self.salaryStr = str;
						break;
				}
				this.selectedNum += tempNum;
			},
			// 取得选中的数量
			SelectedNumFun () {
				this.selectedNum = 0;
				this.changedNum(this.educationList, 0);
				this.changedNum(this.experienceList, 1);
				this.changedNum(this.salaryList, 2);
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
			// 学历选择
			educationSelected (index) {
				this.changeSelected(index, this.educationList);
			},
			// 经验选择
			experienceSelected (index) {
				this.changeSelected(index, this.experienceList);
			},
			// 薪资选择
			salarySelected (index) {
				this.salaryList.map((v, i) => {
					if(i === index) {
						v.selected = true;
					} else {
						v.selected = false;
					}
				});
				this.SelectedNumFun();
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
			// 重置
			reset (index) {
				if(index === 1) {
					if(!this.store.positionConditionSelected.requireData.selected) {
						this.resetFun(this.educationList);
						this.resetFun(this.experienceList);
						this.resetFun(this.salaryList);
					}
					this.$emit('requireNum', -1);
				} else {
					this.store.positionConditionSelected.requireData.selected = false;
					this.resetFun(this.educationList);
					this.resetFun(this.experienceList);
					this.resetFun(this.salaryList);
				}
			},
			// 确定
			sure () {
				this.store.positionConditionSelected.requireData.educationStr = this.educationStr.slice(0, this.educationStr.length - 1);
				this.store.positionConditionSelected.requireData.experienceStr = this.experienceStr.slice(0, this.experienceStr.length - 1);
				this.store.positionConditionSelected.requireData.salaryStr = this.salaryStr.slice(0, this.salaryStr.length - 1);
				this.store.positionConditionSelected.requireData.selected = true;
				this.$emit('requireNum', this.selectedNum);
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.require-layout {
		position: fixed;
		top: 4.05rem;
		bottom: 0;
		z-index: 1060;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		.container {
			position: relative;
			padding: 1.5rem 0.5rem;
			background: #fafafa;
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
					// align-items: center;
					justify-content: flex-start;
					flex-wrap: wrap;
					li {
						// width: 20%;
						margin-right: 0.17rem;
						width: 3.5rem;
						line-height: 1.2rem;
						text-align: center;
						font-size: 0.6rem;
						border: 1px solid #d6d6d6;
						border-radius: 0.2rem;
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
			.operating-button-wrapper {
				position: absolute;
				bottom: 0;
				left: 0;
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