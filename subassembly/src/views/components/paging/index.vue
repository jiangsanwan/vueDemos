<template>
	<div class="paging">
		<div>
			<div class="title">{{ whichYear }}年数据</div>
			<div class="s-wrapper">
				<div class="cont" @click="showSelect = true">{{ whichYear }}</div>
				<ul v-show="showSelect">
					<li :class="{'active': whichYear == item}" v-for="item in yearArr" :key="item" @click="changeYear(item)">{{ item }}</li>
				</ul>
				<div class="btn" @click="searchEvent">搜索</div>	
			</div>
			<div class="history">
				<ul class="items">
					<li v-for="(item, index) in currentData" :key="index + Math.random() * currentData.length">
						<div v-for="(v, i) in item.fiveData" :key="i + Math.random() * item.fiveData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
						<div class="light" v-for="(v, i) in item.twoData" :key="i + Math.random() * item.twoData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
						<div>{{ item.fiveTotal }}</div>
					</li>
				</ul>
				<div class="total">
					<ul>
						<li v-for="(item, index) in singleNumberArr" :key="index + Math.random() * singleNumberArr.length">
							<div>{{ index + 1 &lt; 10 ? '0' + (index + 1) : index + 1 }}</div>
							<div>{{ item &lt; 10 ? '0' + item : item }}</div>
						</li>
					</ul>
				</div>
			</div>
			<mine-paging :total="total" :pagegroup="pagegroup" :pagingIndex="pagingIndex" @pagechange="pagechange"></mine-paging>
		</div>
		<div>
			<div class="title">测试数据</div>
			<div class="s-wrapper">
				<input type="text" v-model="newMax">
				<div class="btn" @click="createNewData">开始</div>	
			</div>
			<div class="history">
				<ul class="items">
					<li v-for="(item, index) in curNewArr" :key="index + Math.random() * curNewArr.length">
						<div v-for="(v, i) in item.fiveData" :key="i + Math.random() * item.fiveData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
						<div class="light" v-for="(v, i) in item.twoData" :key="i + Math.random() * item.twoData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
						<div>{{ item.fiveTotal }}</div>
					</li>
				</ul>
				<div class="total">
					<ul>
						<li v-for="(item, index) in newSingleNumberArr" :key="index + Math.random() * newSingleNumberArr.length">
							<div>{{ index + 1 &lt; 10 ? '0' + (index + 1) : index + 1 }}</div>
							<div class="w50px">{{ item &lt; 10 ? '0' + item : item }}</div>
						</li>
					</ul>
					<div class="thin-line"></div>
					<ul class="items">
						<li>测试重复的数据</li>
						<li v-for="(item, index) in doubleFiveArr" :key="index + Math.random() * doubleFiveArr.length">
							<div v-for="(v, i) in item.fiveData" :key="i + Math.random() * item.fiveData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
							<div class="light" v-for="(v, i) in item.twoData" :key="i + Math.random() * item.twoData.length">{{ v &lt; 10 ? '0' + v : v }}</div>
						</li>
					</ul>
				</div>
			</div>
			<mine-paging :total="newMax * 1" :pagegroup="pagegroup" :pagingIndex="pagingIndexNew" @pagechange="pagechangeNew"></mine-paging>
		</div>
	</div>
</template>

<script>
	import minePaging from '@/components/paging/index'
	import * as historyData from '@/utils/dataJson.js'
	import { allData } from '@/utils/allDataJson.js'
	export default {
		name: 'Home',
		components: {
			minePaging
		},
		data () {
			return {
				total: 0,
				pagegroup: 6,
				pagingIndex: 1,
				whichYear: new Date().getFullYear(),
				yearArr: [],
				curData: [],
				currentData: [],
				showSelect: false,
				selectNum: 20,
				pageNum: 1,
				singleNumberArr: new Array(35).fill(0),


				newMax: 2000,
				newArr: [],
				pagingIndexNew: 2,
				curNewArr: [],
				pageNumNew: 1,
				newSingleNumberArr: new Array(35).fill(0),
				doubleFiveArr: []
			}
		},
		computed: {
			yearLists () {
				return Object.keys(historyData)
			}
		},
		mounted () {
			this.createYearArr(13);
			this.getCurData();
		},
		methods: {
			createYearArr (len) {
				let curY = new Date().getFullYear();
				for(let i = 0; i < len; i++) {
					this.yearArr.push(curY - i);
				}
			},
			singleNumberEvent (arr) {// 统计35选5个数，每个数出现的次数
				let res = new Array(35).fill(0);
				arr.forEach((v) => {
					v.fiveData.forEach((_v) => {
						res[_v - 1] += 1;
					})
				})
				return res;
			},
			getCurData () {// 获取哪一年的历史数据
				this.yearLists.forEach((v) => {
					if(v.indexOf(this.whichYear) > 0) {
						this.curData = historyData[v]
						this.total = historyData[v].length
					}
				});
				this.singleNumberArr = this.singleNumberEvent(this.curData);
				this.getCurrentData();
			},
			getCurrentData () {// 统计35选5个数，这5个数的和
				this.currentData = [];
				this.curData.forEach((v, i) => {
					if(this.selectNum * (this.pageNum - 1) <= i && i < this.selectNum * this.pageNum) {
						v.fiveTotal = 0
						v.fiveData.forEach((_v) => {
							v.fiveTotal += _v
						})
						this.currentData.push(v)
					}
				})
			},
			changeYear (item) {
				this.whichYear = item;
				this.showSelect = false;
			},
			searchEvent () {
				this.getCurData();
			},
			pagechange (val) {
				this.pageNum = JSON.parse(val)['current'];
				this.getCurrentData();
			},
			createSimple (max) {// 根据传入的最大数值，返回一个1到max的任意数字
				return parseInt(Math.ceil(Math.random() * max))
			},
			createArr (max, len) {// 生成len长度的数字，数组中的元素是由createSimple函数生成的数字
				if(!max) return;
				let res = [];
				while(res.length < len) {
					let item = this.createSimple(max);
					if(res.indexOf(item) == -1) {
						res.push(item)
					}
				}
				return res;
			},
			createSimpleFiveData () {// 生成跟历史数据不同的新数据
				let fiveData = this.createArr(35, 5),
					simpleTimes = 0;
				allData.forEach(v => {
					if(!this.isEqual(v.fiveData, fiveData)) {
						simpleTimes += 1; 
					}
				})
				if(simpleTimes == allData.length) {
					return fiveData
				} else {
					return this.createSimpleFiveData();
				}
			},
			createNewData () {// 循环生成数组，及测试数据
				let len = parseInt(this.newMax);
				for(let i = 0; i < len; i++) {
					let obj = {}
					// obj.fiveData = this.createArr(35, 5)
					obj.fiveData = this.createSimpleFiveData()
					obj.twoData = this.createArr(12, 2)
					this.newArr.push(obj);
				}
				this.newSingleNumberArr = this.singleNumberEvent(this.newArr);
				this.doubleFiveArr = this.doubleFiveEvent(this.newArr);
				this.createCurNewArr();
			},
			sortArr(arr) {
				return arr.sort(function(a, b) {
					return a - b;
				});
			},
			isEqual(arr1, arr2) {
				// 判断传入的两个数组相不相等
				if(arguments.length != 2) {
					throw new Error('传入参数不正确');
				} else if(arr1.length != arr2.length) {
					throw new Error('参数数组长度不一致');
				} else {
					var len = arr1.length,
						total = 0,
						_arr1 = this.sortArr(arr1),
						_arr2 = this.sortArr(arr2);
					for(var i = 0; i < len; i++) {
						if(_arr1[i] == _arr2[i]) {
							total += 1
						}
					}
					if(total == len) {
						return true;
					} else {
						return false;
					}
				}
			},
			doubleFiveEvent(arr) {// 统计新生成的数据中重复出现的数组
				let len = arr.length,
					_arri = [],
					_arrj = [],
					res = [];
				for(let i = 0; i < len; i++) {
					_arri = this.sortArr(arr[i].fiveData);
					for(let j = i + 1; j < len; j++) {
						_arrj = this.sortArr(arr[j].fiveData);
						if(this.isEqual(_arri, _arrj)) {
							res.push(arr[i])
						}
					}
				}
				return res;
			},
			createCurNewArr () {// 生成分页数据
				this.curNewArr = [];
				this.newArr.forEach((v, i) => {
					if(this.selectNum * (this.pageNumNew - 1) <= i && i < this.selectNum * this.pageNumNew) {
						v.fiveTotal = 0
						v.fiveData.forEach((_v) => {
							v.fiveTotal += _v
						})
						this.curNewArr.push(v)
					}
				})
			},
			pagechangeNew (val) {
				this.pageNumNew = JSON.parse(val)['current'];
				this.createCurNewArr();
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.paging {
		display: flex;
		> div {
			.title {
				padding: 20px 0;
				text-align: center;
				font-size: 24px;
			}
			.s-wrapper {
				position: relative;
				display: flex;
				margin-right: 20px;
				padding: 0;
				height: 34px;
				line-height: 34px;
				border-radius: 3px;
				div {
					width: 120px;
					border: none;
					padding: 0 30px 0 10px;
					cursor: pointer;
					border: 1px solid #e6e6e6;
					&.btn {
						padding: 0;
						text-align: center
						margin-left: 20px;
						border: 1px solid #8ac78f;
						background: #8ac78f;
						color: #fff;
					}
				}
				ul {
					position: absolute;
					top: 34px;
					left: 0;
					z-index: 100;
					width: 120px;
					border: 1px solid #e6e6e6;
					box-shadow: 0 0 2px 0 #e6e6e6;
					border-radius: 3px;
					background: #fff;
					cursor: pointer;
					li {
						padding: 0 10px;
						&:not(:last-child) {
							border-bottom: 1px solid #e6e6e6;
						}
						&.active, &:hover {
							color: #fff;
							background: #8ac78f;
						}
					}
				}
				input {
					border: 1px #aaa solid;
					border-radius: 3px;
					background: 0 0;
					text-align: left;
					font-size: 20px;
					width: 100px;
					height: 34px;
					line-height: 34px;
					padding: 0 10px;
				}
			}
			.history {
				display: flex;
				flex-align: flex-start;
				padding: 20px 0;
				.items {
					padding: 10px;
					li {
						display: flex;
						div {
							width: 30px;
							height: 30px;
							line-height: 30px;
							background: #f1f1f1;
							color: #666;
							text-align: center;
							&:not(:last-child) {
								margin-right: 20px;
							}
							&.light {
								background: #409eff;
								color: #fff;
							}
						}
						&:not(:last-child) {
							margin-bottom: 10px;
						}
					}
				}
				.total {
					flex: 1;
					padding: 10px;
					border-left: 1px solid #e6e6e6;
					ul {
						display: flex;
						width: 100%;
						flex-wrap: wrap;
						li {
							height: 30px;
							display: flex;
							background: #f1f1f1;
							div {
								width: 30px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								&:last-child {
									background: #409eff;
									color: #fff;
								}
								&.w50px {
									width: 50px;
								}
							}
							&:not(:last-child) {
								margin: 0 10px 10px 0;
							}
						}
					}
					.items {
						li {
							background: #fff;
						}
					}
				}
			}
			&:first-child {
				width: 45%;
				padding-right: 10px;
				border-right: 1px solid #e6e6e6
			}
			&:last-child {
				width: 55%;
				padding-left: 10px
			}
		}
	}
</style>