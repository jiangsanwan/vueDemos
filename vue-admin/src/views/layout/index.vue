<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :class="{'lay-collapse': collapsed}">
            <lay-logo />
            <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
                <lay-menu v-for="route in routes" :key="route.path" :item="route"></lay-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-row>
                    <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="pad-lr-20px">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <lay-avatar />
                    </a-col>
                </a-row>
            </a-layout-header>
            <lay-tab></lay-tab>
            <lay-content></lay-content>
        </a-layout>
    </a-layout>
</template>
<script type="text/ecmascript-6">
    import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
    import LayLogo from './layLogo/index'
    import LayAvatar from './layAvatar/index'
    import LayMenu from './layMenu/index'
    import LayTab from './layTab/index'
    import LayContent from './layContent/index'
    import { routesWhiteList } from '@/config'
    import { ref, computed, watch, getCurrentInstance } from 'vue'
    import { useStore } from 'vuex'
    export default {
        name: 'Layout',
        components: {
            MenuUnfoldOutlined,
            MenuFoldOutlined,

            LayLogo,
            LayAvatar,
            LayMenu,
            LayTab,
            LayContent
        },
        setup () {
            let { ctx } = getCurrentInstance(),
                store = useStore(),
                routes = computed(() => {
                    return store.getters['routes/routes'].filter(v => !routesWhiteList.includes(v.path))
                }),
                collapsed = ref(false),
                selectedKeys = ref(['/dashboard']),
                openKeys = ref(['/dashboard']);
            watch(
                () => ctx.$router.currentRoute.value.path,
                (newVal) => {
                    if(newVal === '/dashboard/index') {
                        newVal = '/dashboard'
                    }
                    let _routeArr = newVal.split('/').filter(val => val)
                    openKeys.value = [ `/${_routeArr[0]}` ]
                    selectedKeys.value = [newVal]
                }
            )
            return {
                collapsed,
                selectedKeys,
                openKeys,
                routes
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
    .layout {
        width(100%)
        height(100vh)
        .logo {
            padding-t-b(8px)
            img {
                height(40px)
            }
        }
    }
</style>