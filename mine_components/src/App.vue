<template>
    <section id="app">
        <common-header></common-header>
        <router-view class="main" />
        <common-footer></common-footer>
    </section>
</template>

<script>
    import CommonHeader from '@/components/common/header/index'
    import CommonFooter from '@/components/common/footer/index'
    export default {
        name: 'App',
        components: { CommonHeader, CommonFooter }
    }
</script>

<style lang="stylus">
    #app {
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        .main {
            position: fixed;
            top: 55px;
            bottom: 53px;
            left: 10vw;
            width: 80vw;
        }
    }
</style>