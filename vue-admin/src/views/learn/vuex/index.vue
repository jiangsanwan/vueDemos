<template>
	<div class="vue">
		<p class="title">vuex4.0使用</p>
		<a-collapse class="mt20px" v-model:activeKey="activeKey" accordion>
			<a-collapse-panel key="1" header="useStore">
				<usestore-com />
			</a-collapse-panel>
			<a-collapse-panel key="2" header="mapxxx">
				<mapxxx-com />
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>

<script type="text/ecmascript-6">
	import UsestoreCom from './useStore/index'
	import MapxxxCom from './mapxxx/index'

	import { ref } from 'vue'
	export default {
        name: 'Vuex',
		components: { UsestoreCom, MapxxxCom },
		setup () {
			let activeKey = ref(['1'])
			return {
				activeKey
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/vue'
</style>