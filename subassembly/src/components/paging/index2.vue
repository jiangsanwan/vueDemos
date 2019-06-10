<template>
	<div class="child">
		<ul class="pagination">
			<li>
				<div>
					显示 {{ total > 0 ? _pageSize * (_pageNum - 1) + 1 : 0 }}-{{ _pageSize * _pageNum < total ? _pageSize * _pageNum : total }} 项<span class="ml20px">共 {{ total }} 项</span>
				</div>
			</li>
			<li class="page-item">
				<div class="s-wrapper">
					<div class="cont" @click="showSelect = true">{{ _pageSize }}条/页</div>
					<ul v-show="showSelect">
						<li :class="{'active': _pageSize == item.value}" v-for="item in _pageSizes" :key="item.value" @click="selectFn(item)">{{ item.label }}</li>
					</ul>
				</div>
				<div class="n-p" :class="{'disabled': _pageNum == 1, 'cursorp': _pageNum != 1}" @click="setCurrent(_pageNum - 1)">上一页</div>
				<div class="cursorp" v-for="p in grouplist" :class="{'active': _pageNum == p.val}" @click="setCurrent(p.val)"> {{ p.text }} </div>
				<div class="n-p" :class="{'disabled': _pageNum == page, 'cursorp': _pageNum != page}" @click="setCurrent(_pageNum + 1)">下一页</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				inputPage: null,
				selectNum: 10,
				_pageSize: 0,
				_pageNum: 0,
				showSelect: false,
				grouplist: []
			}
		},
		props: {
			total: {// 数据总条数
				type: Number,
				default: 0
			},
			pageNum: {// 当前是第几页
				type: Number,
				default: 0
			},
			pageSize: {// 每页显示多少条
				type: Number,
				default: 0
			},
			pageSizes: {// 每页显示条数数组
				type: Array,
				default: [10, 20, 50, 100]
			},
			pagegroup: {// 分页条数
				type: Number,
				default: 5,
				coerce: function (v) {
					v = v > 0 ? v : 5;
					return v % 2 === 1 ? v : v + 1;
				}
			}
		},
		computed: {
			_pageSizes () {// 初始化每页显示条数下拉列表
				if(!this.pageSizes) return null;
				let res = [];
				this.pageSizes.forEach((v, i, arr) => {
					let item = {};
					item.label = `${v}条/页`;
					item.value = v;
					res.push(item);
				})
				return res;
			},
			page: function () { // 总页数
				return Math.ceil(this.total / this.selectNum);
			}
		},
		created() {
			this._pageSize = this.pageSize;
			this._pageNum = this.pageNum;
			this.grouplist = this._grouplist();
		},
		methods: {
			_grouplist () { // 获取分页页码
				var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this._pageNum;
				if (len <= this.pagegroup) {
					while (len--) {
						temp.push({text: this.page - len, val: this.page - len});
					};
					return temp;
				}
				while (len--) {
					temp.push(this.page - len);
				}
				var idx = temp.indexOf(center);
				(idx < count) && ( center = center + count - idx);
				(this._pageNum > this.page - count) && ( center = this.page - count);
				temp = temp.splice(center - count - 1, this.pagegroup);
				do {
					var t = temp.shift();
					list.push({
						text: t,
						val: t
					});
				} while (temp.length)
				if (this.page > this.pagegroup) {
					(this._pageNum > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
					(this._pageNum > count + 1) && list.unshift({text: '1', val: 1});
					(this._pageNum < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
					(this._pageNum < this.page - count) && list.push({text: this.page, val: this.page});
				}
				return list;
			},
			setCurrent (idx) {
				if (this._pageNum != idx && idx > 0 && idx < this.page + 1) {
					this._pageNum = idx;
					this.$emit('pageNumChange', this._pageNum);
				}
			},
			selectFn (item) {
				this._pageSize = item.value
				this.showSelect = false
				this.grouplist = this._grouplist();
				this.$emit('pageSizeChange', this._pageSize);
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.pagination {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		li {
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #4a4a4a;
			.ml20px {
				margin-left: 20px;
			}
			&.page-item {
				> div {
					padding: 0 13px;
					list-style: none;
					float: left;
					line-height: 34px;
					font-size: 14px;
					color: #666;
					border: 1px solid #e6e6e6;
					border-right: none;
					&.n-p {
						padding: 0 34px 0 30px;
						&:first-child {
							border-radius: 3px 0 0 3px;
						}
						&:last-child {
							border-radius: 0 3px 3px 0;
							border-right: 1px solid #e6e6e6;
						}
					}
					&.active, &.cursorp:hover {
						color: #fff;
						background: #8ac78f;
					}
					&.cursorp {
						cursor: pointer;
					}
					&.disabled {
						background: #f1f1f1;
					}
					&.s-wrapper {
						position: relative;
						margin-right: 20px;
						border-right: 1px solid #e6e6e6;
						padding: 0;
						width: 120px;
						height: 34px;
						line-height: 34px;
						border-radius: 3px;
						div {
							border: none;
							padding: 0 30px 0 10px;
						}
						ul {
							position: absolute;
							top: 34px;
							left: 0;
							z-index: 100;
							width: 100%;
							color: #f00;
							border: 1px solid #e6e6e6;
							box-shadow: 0 0 2px 0 #e6e6e6;
							border-radius: 3px;
							background: #fff;
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
					}
				}
			}
		}
		
	}
</style>