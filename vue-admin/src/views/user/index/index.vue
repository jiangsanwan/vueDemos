<template>
	<div class="user-index"></div>
</template>

<script type="text/ecmascript-6">
	import { reactive, computed, onMounted, watch } from 'vue'
	import { useStore } from 'vuex'
	export default {
        name: 'UserIndex',
		setup () {
			let store = useStore(),
				data = reactive({}),
				tableData = computed(() => store.state.user.userList),
				total = computed(() => store.state.user.total);
			onMounted(async () => {
				await store.dispatch('user/getUserList', data)
				// tableData = store.state.
			})
			watch(tableData, (newVal, oldVal) => {
				console.log(newVal)
				console.log('*****')
				console.log(oldVal)
				console.log(total.value)
			})
			return {
				// 
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>