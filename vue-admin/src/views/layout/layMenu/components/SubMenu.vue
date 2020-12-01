<template>
	<a-sub-menu :key="routes.path">
        <template v-slot:title>
            <lay-icon :componentName="routes.meta.componentName" />
            <span>{{ routes.meta.title }}</span>
        </template>
        <slot></slot>
    </a-sub-menu>
</template>

<script type="text/ecmascript-6">
    import { ref } from 'vue'
    import LayIcon from '@/components/layIcon/index'
	export default {
        name: 'SubMenu',
        components: { LayIcon },
        props: {
			item: {
				type: Object,
				default () {
                    return null
                }
            },
            routeChildren: {
                type: Object,
				default: () => null
            }
		},
		setup (props) {
            let getProps = (attr) => {
                    return ref(attr)
                },
                routes = getProps(props.item);
			return {
                routes
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>