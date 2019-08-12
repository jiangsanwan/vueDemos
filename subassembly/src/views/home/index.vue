<template>
	<div class="home">
		<div class="menu-wrapper">
			<h1 class="menu-title">组件使用</h1>
			<p class="menu-cont">
				<router-link to="/paging" class="wallet">中国体彩</router-link>
			</p>
			<p class="menu-cont">
				<router-link to="/paging2" class="wallet">中国福彩</router-link>
			</p>
		</div>
		<div class="menu-wrapper">
			<h1 class="menu-title">VUE属性使用</h1>
			<p class="menu-cont">
				<router-link to="/v-slot" class="wallet">分也组件</router-link>
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
		margin-bottom: 30px
		.menu-title {
			font-size: 24px
			margin-bottom: 10px
		}
		.menu-cont {
			padding: 0 20px
			&:not(:last-child) {
				margin-bottom: 10px
			}
			a:hover {
				color: #8ac78f;
			}
		}
	}
</style>