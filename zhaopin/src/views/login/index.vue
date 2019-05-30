<template>
	<div class="login">
		<img :src="logoImg" alt="">
	</div>
</template>
<script>
	import logo from '@/assets/imgs/logo.png'
	export default {
		name: 'login',
		data () {
			return {
				logoImg: logo
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/one'
	.login {
		.div {
			width: 1rem;
			height: 1rem;
			background: pink;
			border-radius(50%);
		}
		.div2 {
			thin-width(100%, #f00)
		}
	}
</style>