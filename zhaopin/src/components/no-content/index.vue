<template>
	<div class="no-content">
		<div>没有内容</div>
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
	.no-content {
		position(fixed)
		top(40px)
		right(0)
		bottom(0)
		left(0)
		background(#f00)
	}
</style>