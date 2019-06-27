<template>
    <div class="mine-footer">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="home">
                <div class="iconfont" :class="{'icon-index': selected != 'home', 'icon-index-fill': selected == 'home'}"></div>
                <div>首页</div>
            </mt-tab-item>
            <mt-tab-item id="follow">
                <div class="iconfont" :class="{'icon-favorite': selected != 'follow', 'icon-favorite-fill': selected == 'follow'}"></div>
                <div>收藏</div>
            </mt-tab-item>
            <mt-tab-item id="message">
                <div class="iconfont" :class="{'icon-message': selected != 'message', 'icon-message-fill': selected == 'message'}"></div>
                <div>消息</div>
                <!-- <mt-badge type="error">10</mt-badge> -->
            </mt-tab-item>
            <mt-tab-item id="user">
                <div class="iconfont" :class="{'icon-my': selected != 'user', 'icon-my-fill': selected == 'user'}"></div>
                <div>我的</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    export default {
        name: 'MineFooter',
        data () {
            return {
                selected: 'home'
            }
        },
        methods: {
            changeTab () {
                console.log(this.selected)
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .mine-footer {
        .iconfont {
            margin-bottom: .06rem;
            font-size: .25rem
        }
    }
</style>
