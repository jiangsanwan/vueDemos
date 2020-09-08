<template>
	<ul class="message">
		<li class="flex chat-item" v-for="(item, index) in chatLists" :key="index" @click="chengeReadEvent(item)">
			<div class="avatar">
				<img src="@/assets/imgs/defaultAvatar.png" alt="">
			</div>
			<div class="flex_1">
				<p class="flex nickname">
					<span class="color303133 flex_1 nn">昵称</span>
					<span class="colorc0c4cc time">{{ item.timeStamp | formatDate('HH:ss') }}</span>
				</p>
				<p class="color606266 content">{{ item.content }}</p>
			</div>
		</li>
	</ul>
</template>
<script>
	import socket from '@/utils/socket'
	import EventBus from '@/utils/eventBus'
	import { mapState } from 'vuex'
	export default {
		name: 'Message',
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
				EventBus.$emit('unreadMsgNo', no)
			}
		},
		data () {
			return {}
		},
		mounted () {
			this._initGetMsgList()
		},
		methods: {
			_initGetMsgList () {// 获取用户聊天列表
				sessionStorage.setItem('vuezhaopin_showminefooter', true)
				socket.emit('getChatList', { to: this.to, from: this.to })
			},
			chengeReadEvent (item) {
				this.$store.dispatch('changeMsgRead', { chatid: item.chatid, to: item.to })
				.then(d => {
					if(d.data.code == 0) {
						this.$router.push(`/chatRoom/${item.chatid}`)
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
	.message {
		height(calc(100vh - 60px))
		padding-top(.1rem)
		padding-left(.1rem)
		.chat-item {
			margin-bottom(.1rem)
			align-items(center)
			div {
				&.avatar {
					margin-right(.1rem)
					width(.4rem)
					height(.4rem)
					border-radius(.04rem)
					overflow: hidden
					img {
						width(100%)
					}
				}
				&.flex_1 {
					padding-t-b(.06rem)
					border-bottom: 1px solid #d9d9d9
					p {
						&.nickname {
							align-items(flex-start)
							margin-bottom(.06rem)
							padding-right(.1rem)
							.nn {
								font-size(.16rem)
								line-height(.16rem)
							}
							.time {
								font-size(.12rem)
							}
						}
						&.content {
							font-size(.14rem)
							line-height(.14rem)
							overflow: hidden
							text-overflow: ellipsis
							white-space: nowrap
						}
					}
				}
			}
		}
	}
</style>