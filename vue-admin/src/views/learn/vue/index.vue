<template>
	<div class="vue">
		<a-alert :message="alertMsg" show-icon type="success">
            <template v-slot:description>
				<p class="alert-info mb4px">
					what is coming in vue 3.0 ?<br />
					Make it faster <br />
					Make it smaller <br />
					Make  it more maintainable <br />
					Make it easier to target native <br />
					make your life easier
                </p>
                <p class="alert-info mb4px">
                   这里主要是vue3.0的基础知识，主要分为：初始化项目、setup函数、响应式系统API、响应式系统工具集、生命周期钩子函数、依赖注入、模板 Refs。
                </p>
            </template>
        </a-alert>
		<a-collapse class="mt20px" v-model:activeKey="activeKey" accordion>
			<a-collapse-panel key="1" header="初始化项目">
				<init />
			</a-collapse-panel>
			<a-collapse-panel key="2" header="setup函数">
				<setup :msg="msg" />
			</a-collapse-panel>
			<a-collapse-panel key="3" header="响应式系统API --- ref、reactive、readonly">
				<responsive-data />
			</a-collapse-panel>
			<a-collapse-panel key="4" header="响应式系统API --- 计算属性 computed">
				<computed />
			</a-collapse-panel>
			<a-collapse-panel key="5" header="响应式系统API --- 监听 watch、watchEffect">
				<watch />
			</a-collapse-panel>
			<a-collapse-panel key="6" header="响应式系统工具集">
				<tool />
			</a-collapse-panel>
			<a-collapse-panel key="7" header="vue3.0生命周期钩子函数">
				<life-cycle />
			</a-collapse-panel>
			<a-collapse-panel key="8" header="依赖注入">
				<provide-inject />
			</a-collapse-panel>
			<a-collapse-panel key="9" header="模板 Refs">
				<refs />
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>

<script type="text/ecmascript-6">
	import { ref } from 'vue'
	import Init from './init/index'
	import Setup from './setup/index'
	import LifeCycle from './lifeCycle/index'
	import ResponsiveData from './responsiveData/index'
	import Computed from './computed/index'
	import Watch from './watch/index'
	import Tool from './tool/index'
	import ProvideInject from './provideInject/index'
	import Refs from './refs/index'
	export default {
		name: 'Vue',
		components: { Init, Setup, LifeCycle, ResponsiveData, Computed, Watch, Tool, ProvideInject, Refs },
		setup () {
			let activeKey = ref(['1']),
				msg = ref('abc');
			return {
				activeKey,
				msg
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
</style>