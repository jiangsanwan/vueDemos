<template>
	<div class="boss">
		<div><router-link to="/addPosition">新增职位</router-link></div>
		<div><router-link to="/editCompany">编辑或修改公司详情</router-link></div>
	</div>
</template>
<script>
	export default {
		name: 'Boss',
		data () {
			return {}
		},
		mounted () {
			sessionStorage.setItem('vuezhaopin_showminefooter', true)
		},
		methods: {
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>