<template>
	<div class="flex ai-c jc-s lay-tab">
        <div class="flex_1 lt-left-panel">
            <a-tabs @edit="editEvent" @tab-click="handleTabClick" type="editable-card" v-model:activeKey="tabActive" hide-add>
                <a-tab-pane v-for="route in affixTabs" :key="route.url" :tab="route.title" :closable="route.url !== '/dashboard/index'"></a-tab-pane>
            </a-tabs>
        </div>
        <div>
            hshs
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { useStore } from 'vuex'
    import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue'
    export default {
        name: 'LayTab',
        setup () {
            let { ctx } = getCurrentInstance(),
                store = useStore(),
                staticRoutes = computed(() => store.getters['routes/routes']),
                affixTabs = ref([]),
                tabActive = ref(null),
                addAffixTabs = (routes, url) => {
                    let _obj = {}
                    if(routes.length > 0) {
                        routes.forEach(route => {
                            if(route.fullPath && route.fullPath == url) {
                                _obj.url = route.fullPath
                                _obj.title = route.meta.title
                                let flag = affixTabs.value.filter(item => item.url === url)
                                if(flag.length == 0)
                                    affixTabs.value.push(_obj)
                                    tabActive.value = _obj.url
                            } else {
                                if(route.children && route.children.length > 0) {
                                    addAffixTabs(route.children, url)
                                }
                            }
                        })
                    }
                },
                formatAffixTabs = (url) => {
                    addAffixTabs(staticRoutes.value, url)
                },
                editEvent = (targetKey, action) => {
                    if(action === 'remove') {// 删除
                        // 1、判断不是当前路由才能删除
                        /*if(targetKey !== ctx.$router.currentRoute.value.path) {
                            affixTabs.value = affixTabs.value.filter(route => route.url !== targetKey)
                        }*/
                        // 2、可以删除当前路由，但是删除后路由返回上一次的路由
                        if(targetKey !== ctx.$router.currentRoute.value.path) {
                            ctx.$router.go(-1)
                        }
                        affixTabs.value = affixTabs.value.filter(route => route.url !== targetKey)
                    }
                },
                handleTabClick = (tab) => {
                    if(ctx.$router.currentRoute.value.path !== tab)
                        ctx.$router.push(tab)
                };
            watch(
                () => ctx.$router.currentRoute.value.path,
                (newVal) => {
                    formatAffixTabs(newVal)
                }
            )
            onMounted(() => {
                formatAffixTabs(ctx.$router.currentRoute.value.path)
            })
            return {
                affixTabs,
                tabActive,
                editEvent,
                handleTabClick
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
    .lay-tab {
        padding-bottom(10px)
        padding-l-r(10px)
        background(#fff)
    }
</style>