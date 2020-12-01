<template>
	<div class="flex ai-c lay-logo">
        <lay-icon :componentName="componentName" />
        <span class="logo-name">{{ logoName }}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    import { logo, title } from '@/config'
    import { ref } from 'vue'
    import LayIcon from '@/components/layIcon/index'
	export default {
        name: 'LayLogo',
        components: { LayIcon },
		setup () {
            let componentName = ref(logo),
                logoName = ref(title);
			return {
                componentName,
				logoName
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
    .lay-logo {
        padding-l-r(24px)
        height(60px)
        font-color(#fff)
        .logo-name {
            margin-left(6px)
            white-space: nowrap
        }
    }
</style>