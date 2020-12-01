<template>
	<component :is="menuComponent" :item="routes" :route-children="routeChildren">
		<template v-if="routes.children && routes.children.length">
			<lay-menu v-for="route in routes.children" :key="route.fullPath" :item="route"></lay-menu>
		</template>
	</component>
</template>

<script type="text/ecmascript-6">
	import MenuItem from './components/MenuItem'
	import SubMenu from './components/SubMenu'
	import { ref, onMounted, nextTick } from 'vue'
	export default {
		name: 'LayMenu',
		components: { MenuItem, SubMenu },
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		setup (props) {
			let menuComponent = ref(''),
				getProps = (attr) => {
                    return ref(attr)
                },
				routes = getProps(props.item),
				routeChildren = ref({}),
				handleChildren = (children = []) => {
					if(children === null) return []
					return children
				},
				initRouteChildren = () => {
					nextTick(() => {
						let tempArr = handleChildren(routes.value.children)
						if(tempArr.length === 0) {
							menuComponent.value = 'MenuItem'
							routeChildren.value = routes.value
						} else if(tempArr.length === 1) {
							menuComponent.value = 'MenuItem'
							routeChildren.value = tempArr[0]
						} else {
							menuComponent.value = 'SubMenu'
						}
					})
				};
			onMounted(() => {
				initRouteChildren()
			})
			return {
				routes,
				menuComponent,
				routeChildren
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
</style>