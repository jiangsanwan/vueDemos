<template>
	<router-view v-slot="{ Component }">
		<transition name="fade-transform" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'App'
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>