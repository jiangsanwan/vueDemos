<template>
    <div class="mine-footer">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="home" @click.native="changeTab('首页', '')">
                <div class="iconfont" :class="{'icon-index': selected != 'home', 'icon-index-fill': selected == 'home'}"></div>
                <div>首页</div>
            </mt-tab-item>
            <mt-tab-item id="follow" @click.native="changeTab('收藏', '/follow')">
                <div class="iconfont" :class="{'icon-favorite': selected != 'follow', 'icon-favorite-fill': selected == 'follow'}"></div>
                <div>收藏</div>
            </mt-tab-item>
            <mt-tab-item id="message" @click.native="changeTab('消息', '/message')">
                <div class="iconfont" :class="{'icon-message': selected != 'message', 'icon-message-fill': selected == 'message'}"></div>
                <div>消息</div>
                <!-- <mt-badge type="error">10</mt-badge> -->
            </mt-tab-item>
            <mt-tab-item id="user" @click.native="changeTab('我的', '/user')">
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
            changeTab (title, link) {
                this.$store.state.commonTitle.title = title
                if(!link) {
                    if(this.$store.state.type == 'Genius') {
                        link = '/genius'
                    } else {
                        link = '/boss'
                    }
                }
                this.$router.push(link)
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .mine-footer {
        .iconfont {
            margin-bottom: 6px;
            font-size: 25px;
        }
    }
</style>
