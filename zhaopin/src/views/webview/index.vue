<template>
    <div class="webview">
        <mine-header></mine-header>
        <router-view/>
        <mine-footer></mine-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import mineHeader from '@/components/mine-header/index'
    import mineFooter from '@/components/mine-footer/index'
    export default {
        name: 'Webview',
        components: {
            mineHeader,
            mineFooter
        },
        data () {
            return {}
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
