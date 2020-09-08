<template>
	<div class="no-content">
		<div class="flex content">
			<!-- <span class="l">f</span> -->
			remembe
			<!-- <span class="r">r</span> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NoContent',
		data () {
			return {
				// 
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
	@keyframes beforeFrame {
		0 {
			left(0)
		}
		50% {
			left(-30px)
		}
		100% {
			left(0)
		}
	}
	@keyframes afterFrame {
		0 {
			right(0)
		}
		50% {
			right(-30px)
		}
		100% {
			right(0)
		}
	}
	.no-content {
		position(fixed)
		top(40px)
		right(0)
		bottom(0)
		left(0)
		.content {
			position(absolute)
			top(50%)
			left(50%)
			transform-translate(-50%, -50%)
			align-items(center)
			justify-content(center)
			padding-l-r(15px)
			font-size(50px)
			font-color(#999)
			&:before {
				content: 'f'
				position(absolute)
				top(0)
				left(0)
				animation: beforeFrame 2s both infinite
			}
			&:after {
				content: 'r'
				position(absolute)
				top(0)
				right(0)
				animation: afterFrame 2s both infinite
			}
		}
	}
</style>