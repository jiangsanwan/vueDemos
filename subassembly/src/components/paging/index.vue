<template>
	<div class="child">
		<ul class="pagination">
			<li>
				<div>
					显示 {{ total > 0 ? selectNum * (current - 1) + 1 : 0 }}-{{ selectNum * current < total ? selectNum * current : total }} 项<span class="ml20px">共 {{ total }} 项</span>
				</div>
			</li>
			<li class="page-item">
				<div class="n-p" :class="{'disabled': current == 1, 'cursorp': current != 1}" @click="setCurrent(current - 1)">上一页</div>
				<div class="cursorp" v-for="p in grouplist" :class="{'active': current == p.val}" :key="p.val" @click="setCurrent(p.val)"> {{ p.text }} </div>
				<div class="n-p" :class="{'disabled': current == page, 'cursorp': current != page}" @click="setCurrent(current + 1)">下一页</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// currentPage: 1,
				current: 1,
				inputPage: null,
				selectNum: 20,
				numbers: [10, 20, 50, 100]
			}
		},
		props: {
			total: {// 数据总条数
				type: Number,
				default: 0
			},
			pagegroup: {// 分页条数
				type: Number,
				default: 5,
				coerce: function (v) {
					v = v > 0 ? v : 5;
					return v % 2 === 1 ? v : v + 1;
				}
			},
			pagingIndex: {// 如果是多个分页，需要传入该参数标识分页的索引
				type: Number,
				default: null
			}
		},
		computed: {
			page: function () { // 总页数
				return Math.ceil(this.total / this.selectNum);
			},
			grouplist: function () { // 获取分页页码
				var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
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
				(this.current > this.page - count) && ( center = this.page - count);
				temp = temp.splice(center - count - 1, this.pagegroup);
				do {
					var t = temp.shift();
					list.push({
						text: t,
						val: t
					})
				} while (temp.length)
				if (this.page > this.pagegroup) {
					(this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
					(this.current > count + 1) && list.unshift({text: '1', val: 1});
					(this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
					(this.current < this.page - count) && list.push({text: this.page, val: this.page});
				}
				return list;
			}
		},
		created() {
			// let _this = this;
			// bus.$on('parentPageNo', function(val) {
			// 	_this.current = val;
			// })
		},
		methods: {
			setCurrent (idx) {
				if (this.current != idx && idx > 0 && idx < this.page + 1) {
					let data = null;
					this.current = idx;
					if(this.pagingIndex) {
						data = JSON.stringify({"current": this.current, "index": this.pagingIndex});
					} else {
						data = this.current;
					}
					this.$emit('pagechange', data);
				}
			},
		}
	}
</script>

<style lang="stylus" scoped>
	.pagination {
		overflow: hidden;
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
				div {
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
					}
					&:first-child {
						border-radius: 2px 0 0 2px;
					}
					&:last-child {
						border-radius: 0 2px 2px 0;
						border-right: 1px solid #e6e6e6;
					}
					&.active, &:hover {
						color: #fff;
						background: #8ac78f;
					}
					&.cursorp {
						cursor: pointer;
					}
					&.disabled {
						background: #f1f1f1;
						&:hover {
							color: #666;
							background: #f1f1f1;
						}
					}
				}
			}
		}
		
	}
</style>