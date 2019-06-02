<template>
	<div class="login-v-slot">
		<!-- 插槽使用一 -->
		<!-- <a :href="url">
			<slot></slot>
		</a> -->

		<!-- 插槽使用二 -->
		<!-- <header><slot name="header">123</slot></header>
		<main><slot name="main">阿斯顿</slot></main>
		<footer><slot name="footer">qwe</slot></footer> -->

		<!-- 插槽使用三、四 -->
		<header><slot name="header">123</slot></header>
		<main><slot>阿斯顿</slot></main>
		<footer><slot name="footer">qwe</slot></footer>
	</div>
</template>
<script>
	export default {
		name: 'login',
		/*props: {// 插槽使用一
			url: {
				default: '',
				type: String,
				required: true
			}
		},*/
		data () {
			return {
				user: {
					name: 'fremember'
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.login-v-slot {
		color: #87000c;
	}
</style>