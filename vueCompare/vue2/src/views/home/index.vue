<template>
	<div class="home">
		<!-- 生命周期 -->
		<life-cycle></life-cycle>
		<!-- 计算属性 -->
		<computed></computed>
	</div>
</template>

<script type="text/ecmascript-6">
	import LifeCycle from './lifeCycle/index'
	import Computed from './computed/index'
	export default {
		name: 'Home',
		components: { LifeCycle, Computed },
		data () {
			return {
				// 
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>