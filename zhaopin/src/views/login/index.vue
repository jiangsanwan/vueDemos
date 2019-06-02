<template>
	<div class="login">
		<!-- 跳过渲染，直接显示插值表达式 -->
		<!-- <span v-pre>{{ this will not be compiled }}</span> -->

		<img :src="logoImg" alt="">
		<!-- 插槽使用一、作用域插槽 -->
		<!-- <v-slot url="http://baidu.com">
			<h1>pxy</h1>
			http://baidu.com
			{{ user.name }}
		</v-slot> -->

		<!-- 插槽使用二 -->
		<!-- <v-slot>
			<header><span slot="header"></span></header>
			<main><span slot="main"></span></main>
			<footer><span slot="footer"></span></footer>
		</v-slot> -->

		<!-- 插槽使用三 -->
		<!-- <v-slot>
			<template v-slot:header>
				<h1>Here might be a page title</h1>
			</template>
			<p>A paragraph for the main content.</p>
			<p>And another one.</p>
			<template v-slot:footer>
				<p>Here's some contact info</p>
			</template>
		</v-slot> -->

		<!-- 插槽使用四 -->
		<v-slot>
			<template v-slot:header>
				<h1>Here might be a page title</h1>
			</template>
			<template v-slot:default>
				<p>A paragraph for the main content.</p>
				<p>And another one.</p>
			</template>
			<template v-slot:footer>
				<p>Here's some contact info</p>
			</template>
		</v-slot>
	</div>
</template>
<script>
	import logo from '@/assets/imgs/logo.png'
	import vSlot from './v-slot/index'
	export default {
		name: 'login',
		components: { vSlot },
		data () {
			return {
				logoImg: logo,
				header: 'def',
				user: {
					name: 'pxy'
				}
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