<template>
    <div class="webview">
        <!-- <mine-header></mine-header> -->
        <section ref="webview">
            <router-view/>
        </section>
        <mine-footer v-if="showMineFooter"></mine-footer>
    </div>
</template>
<script>
    // import mineHeader from '@/components/mine-header/index'
    import mineFooter from '@/components/mine-footer/index'
    export default {
        name: 'Webview',
        components: {
            // mineHeader,
            mineFooter
        },
        data () {
            return {}
        },
        computed: {
            showMineFooter () {
                return this.$store.state.showMineFooter
            }
        },
        mounted () {
            this.initHeight();
        },
        methods: {
            initHeight () {}
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    section {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 57px;
        overflow-y: visible;
    }
</style>
