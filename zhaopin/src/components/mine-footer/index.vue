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
            <mt-tab-item class="mine-message" id="message" @click.native="changeTab('消息', '/message')">
                <div class="iconfont" :class="{'icon-message': selected != 'message', 'icon-message-fill': selected == 'message'}"></div>
                <div>消息</div>
                <mt-badge type="error" v-if="unreadNo > 0">{{ unreadNo }}</mt-badge>
            </mt-tab-item>
            <mt-tab-item id="user" @click.native="changeTab('我的', '/user')">
                <div class="iconfont" :class="{'icon-my': selected != 'user', 'icon-my-fill': selected == 'user'}"></div>
                <div>我的</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    import EventBus from '@/utils/eventBus'
    import socket from '@/utils/socket'
    import { mapState } from 'vuex'
    export default {
        name: 'MineFooter',
        computed: {
            ...mapState({
                chatLists: state => state.chatLists,
            }),
            to () {
                return JSON.parse(sessionStorage.getItem('loginUserInfo'))._id
            }
        },
        watch: {
            chatLists (value) {// 
                let no = 0
                value.forEach(v => {
                    no += v.readNo
                })
                this.unreadNo = no
            }
        },
        data () {
            return {
                selected: 'home',
                unreadNo: 0,
            }
        },
        mounted () {
            let _this = this
            EventBus.$on('unreadMsgNo', function(no) {
                _this.unreadNo = no
            })
            this._initGetMsgList()
        },
        methods: {
            _initGetMsgList () {// 获取用户聊天列表
                let tempUrl = this.$route.path.split('/')[1]
                if(tempUrl == 'boss' || tempUrl == 'genius') {
                    this.selected = 'home'
                } else {
                    this.selected = tempUrl
                }
                this.$store.commit('SET_SHOWMINEFOOTER', true)
                socket.emit('getChatList', { to: this.to, from: this.to })
            },
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
