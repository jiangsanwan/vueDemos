<template>
    <section class="bg255077 flex common-header">
        <div class="flex_1"></div>
        <el-dropdown class="user-wrapper">
            <div class="flex user-brief">
                <span class="name">{{ username }}</span>
                <img class="avatar" src="@/assets/img/defaultAvatar.png" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </section>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

    let userModule = namespace('user')
    
    @Component
    export default class CommonHeader extends Vue {
        @userModule.State(state => state.username) username?: string
    }
</script>
<style lang="stylus">
    @import './../../assets/stylus/reset'
    .common-header {
        padding-l-r(30px)
        height(60px)
        overflow-x: hidden
        .user-wrapper {
            line-height(60px)
            .user-brief {
                padding-left(30px)
                align-items(center)
                cursor(pointer)
                .name {
                    margin-right(20px)
                }
                .avatar {
                    height(30px)
                }
            }
        }
    }
</style>