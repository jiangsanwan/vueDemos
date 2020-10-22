<template>
	<div class="home">
		<!-- 生命周期 -->
		<life-cycle></life-cycle>
		<!-- 响应式数据 -->
		<responsive-data></responsive-data>
		<!-- 计算属性 -->
		<computed></computed>
	</div>
</template>

<script type="text/ecmascript-6">
	import LifeCycle from './lifeCycle/index'
	import ResponsiveData from './responsiveData/index'
	import Computed from './computed/index'
	export default {
		name: 'Home',
		components: { LifeCycle, ResponsiveData, Computed },
		setup () {
			return {
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.home {
	}
</style>