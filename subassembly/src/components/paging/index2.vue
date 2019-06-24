<template>
	<div class="child">
		<ul class="pagination">
			<li>
				<div>
					显示 {{ total > 0 ? size * (num - 1) + 1 : 0 }}-{{ size * num < total ? size * num : total }} 项<span class="ml20px">共 {{ total }} 项</span>
				</div>
			</li>
			<li class="page-item">
				<div class="s-wrapper" v-show="pageSizes">
					<div class="cont" @click="showSelect = true">{{ size }}条/页</div>
					<ul v-show="showSelect">
						<li :class="{'active': size == item.value}" v-for="item in sizes" :key="item.value" @click="selectFn(item)">{{ item.label }}</li>
					</ul>
				</div>
				<div class="n-p" :class="{'disabled': num == 1, 'cursorp': num != 1}" @click="setCurrent(num - 1)">上一页</div>
				<div class="cursorp" v-for="p in grouplist" :key="p.val" :class="{'active': num == p.val}" @click="setCurrent(p.val)"> {{ p.text }} </div>
				<div class="n-p" :class="{'disabled': num == page, 'cursorp': num != page}" @click="setCurrent(num + 1)">下一页</div>
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
				size: 0,
				num: 0,
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
				default: []
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
			sizes () {// 初始化每页显示条数下拉列表
				if(!this.pageSizes) return null;
				let res = [];
				this.pageSizes.forEach((v) => {
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
		mounted() {
			this.size = this.pageSize;
			this.num = this.pageNum;
			this.grouplist = this._grouplist();
		},
		methods: {
			_grouplist () { // 获取分页页码
				var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.num;
				if (len <= this.pagegroup) {
					while (len--) {
						temp.push({text: this.page - len, val: this.page - len});
					}
					return temp;
				}
				while (len--) {
					temp.push(this.page - len);
				}
				var idx = temp.indexOf(center);
				(idx < count) && ( center = center + count - idx);
				(this.num > this.page - count) && ( center = this.page - count);
				temp = temp.splice(center - count - 1, this.pagegroup);
				do {
					var t = temp.shift();
					list.push({
						text: t,
						val: t
					})
				} while (temp.length)
				if (this.page > this.pagegroup) {
					(this.num > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
					(this.num > count + 1) && list.unshift({text: '1', val: 1});
					(this.num < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
					(this.num < this.page - count) && list.push({text: this.page, val: this.page});
				}
				return list;
			},
			setCurrent (idx) {
				if (this.num != idx && idx > 0 && idx < this.page + 1) {
					this.num = idx;
					this.$emit('pageNumChange', this.num);
				}
			},
			selectFn (item) {
				this.size = item.value
				this.showSelect = false
				this.selectNum = this.size
				this.num = 1;
				this.grouplist = this._grouplist();
				this.$emit('pageSizeChange', this.size);
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
						padding: 0 20px;
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