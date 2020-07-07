<template>
    <ul class="side-bar">
        <li v-for="(item, index) in routerList" :key="index" :class="{'sidebar-active-li': $route.path == item.link}">
            <router-link :to='item.link' active-class="sidebar-active">{{ item.text }}</router-link>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    export default {
        name: 'SideBar',
        computed: {
            ...mapState({
                routerList: state => state.routerList
            })
        },
        data () {
            return {}
        }
    }
</script>

<style lang="stylus">
    .side-bar {
        width: 160px;
        height: 100%;
        overflow-y: auto;
        border-right: 1px dashed #fffff0;
        border-left: 1px dashed #fffff0;
        li {
            text-align: center;
            a {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                &.sidebar-active {
                    color: #7fff00;
                }
            }
            &:hover {
                border-bottom: 1px dashed #fffff0;
                a {
                    color: #7fff00;
                }
            }
            &.sidebar-active-li {
                border-bottom: 1px dashed #fffff0;
            }
        }
    }
</style>