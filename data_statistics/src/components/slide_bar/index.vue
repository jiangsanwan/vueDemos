<template>
    <section class="bg255077 slide-bar-cont">
        <div class="logo">
            <img src="@/assets/img/logo.png" alt="">
        </div>
        <ul class="menu-wrapper">
            <li class="tac menu-item" v-for="(item, index) in menuList" :key="index">
                <router-link :to="item.link" exact>{{ item.text }}</router-link>
            </li>
        </ul>
    </section>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { State, namespace } from 'vuex-class'

    const menuModule = namespace('menu')

    @Component
    export default class SlideBar extends Vue {
        @menuModule.State(state => state.menuList) menuList?: Array<any>
        // props
        // @Prop() msg!:String
        // @Prop({ default: [] }) menu!:Array<String>
    }
</script>
<style scoped lang="stylus">
    @import './../../assets/stylus/reset'
    .slide-bar-cont {
        .logo {
            padding-t-b(15px)
            height(30px)
            text-align(center)
            img {
                height(100%)
            }
        }
        .menu-wrapper {
            border-top: 1px dashed #eee
            padding-t-b(20px)
            li {
                a {
                    display(block)
                    width(100%)
                    height(40px)
                    line-height(40px)
                    text-decoration: none
                }
                &:hover {
                    background(#0c2f4f)
                }
            }
        }
    }
</style>