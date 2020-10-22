<template>
    <a-layout-content class="lay-content">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </a-layout-content>
</template>

<script type="text/ecmascript-6">
	export default {
        name: 'LayContent',
		setup () {
			return {
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
    .lay-content {
        margin: 10px;
        padding: 20px;
        background: #fff;
        min-height: 280px;
    }
</style>