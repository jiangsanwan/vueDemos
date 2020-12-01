<template>
	<div class="flex jc-e lay-avatar">
        <a-dropdown>
            <div class="flex ai-c la-wrapper">
                <a-avatar :src="avatar" />
                <span class="username">{{ username }}</span>
                <DownOutlined />
            </div>
            <template v-slot:overlay>
                <a-menu>
                    <a-menu-item class="tac">退出登录</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script type="text/ecmascript-6">
    import { useStore } from 'vuex'
    import { computed, getCurrentInstance } from 'vue'
    import { DownOutlined } from '@ant-design/icons-vue'
	export default {
        name: 'LayAvatar',
        components: { DownOutlined },
		setup () {
            let { ctx } = getCurrentInstance(),
                store = useStore(),
                username = computed(() => ctx.$store.getters['user/username']),
                avatar = computed(() => store.getters['user/avatar']);
			return {
                username,
				avatar
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
    .lay-avatar {
        padding-l-r(20px)
        .la-wrapper {
            span {
                &.username {
                    padding-l-r(12px)
                }
            }
        }
    }  
</style>