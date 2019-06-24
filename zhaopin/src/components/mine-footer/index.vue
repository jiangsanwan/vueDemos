<template>
    <div class="mine-footer">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="tab1">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                首页
            </mt-tab-item>
            <mt-tab-item id="tab2">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                收藏
            </mt-tab-item>
            <mt-tab-item id="tab3">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                消息
                <mt-badge type="error">10</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="tab4">
                <!-- <img slot="icon" src="../assets/100x100.png"> -->
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    export default {
        name: 'MineFooter',
        data () {
            return {
                selected: 'tab1'
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
