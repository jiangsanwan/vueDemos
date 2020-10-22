<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
                <lay-menu></lay-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <lay-content></lay-content>
        </a-layout>
    </a-layout>
</template>
<script type="text/ecmascript-6">
    import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
    import LayContent from './layContent/index'
    import { ref } from 'vue'
    export default {
        name: 'Layout',
        components: {
            MenuUnfoldOutlined,
            MenuFoldOutlined,

            LayContent
        },
        setup () {
            let collapsed = ref(false),
                selectedKeys = ref(['1']),
                openKeys = ref(['sub1']);
            return {
                collapsed,
                selectedKeys,
                openKeys
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