<template>
	<div class="mine-communicate-footer">
		<div class="communicate" @click="communicateEvent">立即沟通</div>
	</div>
</template>
<script>
	export default {
		name: 'mineCommunicateFooter',
		props: {
			id: {
				type: String,
				default: '',
				required: true
			}
		},
		methods: {
			communicateEvent () {
				this.$router.push({path: '/message', query: { id: this.id }})
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
	.mine-communicate-footer {
		position(fixed);
		bottom(0);
		left(0);
		padding-all(10px);
		width(100%);
		background(#fff);
		box-shadow: 0 0 .03rem .01rem #eee;
		.communicate {
			width(100%);
			text-align(center);
			height(40px);
			line-height(40px);
			font-color(#fff);
			background(#26a2ff);
			border-radius(.04rem);
		}
	}
</style>