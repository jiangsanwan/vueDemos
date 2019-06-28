<template>
	<div class="mine-header">
		<mt-header fixed :title="commonTitle.title">
			<router-link :to="commonTitle.leftLink" slot="left" v-show="commonTitle.left && commonTitle.leftLink">
				<i class="iconfont icon-arrowLeft"></i>
				<span v-show="commonTitle.leftText">{{ commonTitle.leftText }}</span>
			</router-link>
			<router-link :to="commonTitle.rightLink" slot="right" v-show="commonTitle.right && commonTitle.rightLink">
				<span v-show="commonTitle.rightText">{{ commonTitle.rightText }}</span>
				<i class="iconfont" v-show="commonTitle.rightIcon" :class="[commonTitle.rightIcon]"></i>
			</router-link>
		</mt-header>
	</div>
</template>
<script>
	export default {
		name: 'MineHeader',
		data () {
			return {}
		},
		computed: {
			commonTitle () {
				return this.$store.state.commonTitle
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
