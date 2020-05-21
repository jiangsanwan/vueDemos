<template>
    <section class="flex layout">
        <slide-bar class="slide-bar" :menu="menu" :msg="msg"></slide-bar>
        <section class="flex_1">
            <common-header></common-header>
            <section class="router-view">
                <div class="view-content">
                    <router-view />
                </div>
            </section>
        </section>
    </section>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import SlideBar from '@/components/slide_bar/index.vue'
    import CommonHeader from '@/components/common_header/index.vue'
    @Component({
        components: {
            SlideBar,
            CommonHeader
        },
    })
    export default class Layout extends Vue {
        private msg: String = 'layout'
        private menu: Array<String> = [ 'abc', 'def' ]
    }
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .layout {
        width(100%)
        height(calc(100vh))
        align-items(flex-start)
        background(#0c2f4f)
        .slide-bar {
            width(200px)
            height(100%)
        }
        .flex_1 {
            .router-view {
                padding-all(10px)
                box-shadow: inset 0 0 3px 0 #ccc
                .view-content {
                    padding-all(10px)
                    height(calc(100vh - 100px))
                }
            }
        }
    }
</style>