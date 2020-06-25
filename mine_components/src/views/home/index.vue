<template>
    <section class="home">
        <side-bar></side-bar>
        <router-view class="home-main" />
    </section>
</template>

<script type="text/ecmascript-6">
    import SideBar from '@/components/common/sideBar/index'
    export default {
        name: 'Home',
        components: { SideBar },
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
        .home-main {
            padding: 20px;
            width: calc(80vw - 162px);
            height: 100%;
            overflow-y: auto;
        }
    }
</style>