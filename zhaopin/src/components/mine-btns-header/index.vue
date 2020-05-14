<template>
	<div class="mine-btns-header" :class="{'bg102135': headerObj.headBg == 'bg102135'}">
		<div class="goback" @click="gobackEvent">
			<i class="iconfont icon-arrowLeft"></i>
		</div>
		<div class="title" v-if="headerObj.title">{{ headerObj.title }}</div>
		<div class="flex more">
			<div v-for="item in headerObj.more" :key="item" @click="btnOperateEvent(item)">
				<i class="iconfont" :class="item"></i>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'MineBtnsHeader',
		props: {
			headerObj: {
				type: Object,
				default: {}
			}
		},
		data () {
			return {}
		},
		methods: {
			gobackEvent () {// 返回上一页
				this.$router.go(-1);
			},
			btnOperateEvent (item) {// 公共头部右侧按钮的操作事件
				console.log(item)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
	.mine-btns-header {
		position(fixed)
		top(0)
		left(0)
		zindex(100)
		width(100%)
		height(40px)
		background(#26a2ff)
		font-color(#fff)
		.goback {
			position(fixed)
			top(0)
			left(0)
			zindex(200)
			width(40px)
			height(40px)
			text-align(center)
			line-height(40px)
			.iconfont {
				font-size(.18rem)
			}
		}
		.title {
			width(100%)
			height(40px)
			line-height(40px)
			text-align(center)
		}
		.more {
			position(fixed)
			top(0)
			right(0)
			zindex(200)
			height(40px)
			align-items(center)
			div {
				width(30px)
				height(40px)
				text-align(center)
				line-height(40px)
				.iconfont {
					font-size(.18rem)
				}
			}
		}
	}
</style>