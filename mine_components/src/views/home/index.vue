<template>
    <section class="home">
        <side-bar></side-bar>
        <div class="no-main" v-if="noMain">
            <div class="title mb20px">常用组件简介</div>
            <div class="info">
                备注：本项目中所有组件实例均已上传至github，相关地址在组件中都有备注，整个项目所在的地址是：
                <a href="https://github.com/fremember/vueDemos/tree/master/mine_components" target="_blank">https://github.com/fremember/vueDemos/tree/master/mine_components</a>
            </div>
        </div>
        <router-view class="home-main" v-else />
    </section>
</template>

<script type="text/ecmascript-6">
    import SideBar from '@/components/common/sideBar/index'
    export default {
        name: 'Home',
        components: { SideBar },
        computed: {
            noMain () {
                return this.$route.path == '/home'
            }
        },
        data () {
            return {
            }
        }
    }
</script>

<style lang="stylus">
    .home {
        display: flex;
        align-items: flex-start;
        margin: 0 auto;
        width: 80vw;
        .no-main {
            padding: 20px;
            .info {
                color: #999;
                a {
                    &:hover {
                        color: #7fff00;
                    }
                }
            }
        }
        .home-main {
            padding: 20px;
            width: calc(80vw - 162px);
            height: 100%;
            border-right: 1px dashed #fffff0;
            overflow-y: auto;
        }
    }
</style>