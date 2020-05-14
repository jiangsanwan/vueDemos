<template>
    <div class="webview">
        <!-- <mine-header></mine-header> -->
        <section :class="{'b60px': showMineFooter, 'b0': !showMineFooter}" ref="webview">
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
        computed: {
            showMineFooter () {
                return this.$store.state.showMineFooter
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    section {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        overflow-y: auto;
        &.b60px {
            bottom: 60px;
        }
        &.b0 {
            bottom: 0;
        }
    }
</style>
