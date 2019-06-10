<template>
	<div class="home">
		<div class="menu-wrapper">
			<h1 class="menu-title">组件使用</h1>
			<p class="menu-cont">
				<router-link to="/paging" class="wallet">分也组件</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data () {
			return {
				// 
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.menu-wrapper {
		.menu-title {
			font-size: 24px
			margin-bottom: 10px
		}
		.menu-cont {
			padding: 0 20px
			a:hover {
				color: #8ac78f;
			}
		}
	}
</style>