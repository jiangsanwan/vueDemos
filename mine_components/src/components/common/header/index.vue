<template>
    <section class="common-header">
        <div class="h-content">
            <img class="logo" src="@/assets/imgs/logo.png" alt="">
            <ul class="h-c-menu">
                <li><input v-model="inputValue" type="text"></li>
                <li v-for="(item, index) in hcMenu" :key="index">
                    <router-link :to="item.link" active-class="hc-menu-active">{{ item.text }}</router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'CommonHeader',
        data () {
            return {
                inputValue: '',
                hcMenu: [
                    { link: '/introduce', text: '介绍' },
                    { link: '/home', text: '常用组件' }
                ]
            }
        }
    }
</script>

<style lang="stylus">
    .common-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        border-bottom: 1px solid #fffff0;
        .h-content {
            display: flex;
            text-align: center;
            justify-content: space-between;
            margin: 0 auto;
            padding: 12px 0;
            width: 80vw;
            .logo {
                height: 30px;
            }
            .h-c-menu {
                display: flex;
                align-items: center;
                li {
                    padding: 0 20px;
                    a {
                        &:hover,
                        &.hc-menu-active {
                            color: #7fff00;
                        }
                    }
                }
            }
        }
    }
</style>