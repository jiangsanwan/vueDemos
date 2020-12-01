<template>
	<a-menu-item :key="children.fullPath" @click="handleLink">
        <lay-icon :componentName="children.meta.componentName" />
        <span>{{ children.meta.title }}</span>
    </a-menu-item>
</template>

<script type="text/ecmascript-6">
    import { ref, getCurrentInstance } from 'vue'
    import LayIcon from '@/components/layIcon/index'
	export default {
        name: 'MenuItem',
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
            let { ctx } = getCurrentInstance(),
                getProps = (attr) => {
                    return ref(attr)
                },
                children = getProps(props.routeChildren),
                handleLink = () => {
                    ctx.$router.push(children.value.fullPath)
                };
			return {
                children,
				handleLink
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>