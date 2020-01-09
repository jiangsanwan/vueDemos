<template>
	<div class="chat-room">
		<mine-btns-header :headerObj="headerObj"></mine-btns-header>
		<div class="c-r-content">
			<ul class="chat-wrapper" id="chatWrapper" :class="{'has-icon-panel': showIconPanel}" ref="">
				<li class="flex" :class="{'from': item.from == msgObj.from, 'to': item.from != msgObj.from}" v-for="(item, index) in chatListsChatId" :key="index">
					<img src="@/assets/imgs/defaultAvatar.png" alt="" v-if="item.from != msgObj.from">
					<div class="text">{{ item.content }}</div>
					<img src="@/assets/imgs/defaultAvatar.png" alt="" v-if="item.from == msgObj.from">
				</li>
			</ul>
			<div class="input-wrapper">
				<div class="flex input-btn">
					<img src="@/assets/imgs/defaultAvatar.png" alt="">
					<textarea class="flex_1" v-model="msgObj.content" @focus="changeIconPanel(false)"></textarea>
					<p class="m-l-r-06rem" @click="changeIconPanel(true)">{{ chatIcon[0] }}</p>
					<p class="submit" @click="submitEvent">发送</p>
				</div>
				<transition name="fade-transform" mode="out-in">
					<ul class="flex icon-wrapper" v-show="showIconPanel">
						<li v-for="(item, index) in chatIcon" @click="setMsg(item)">
							{{ item }}
						</li>
					</ul>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import MineBtnsHeader from '@/components/mine-btns-header/index'
	import socket from '@/utils/socket'
	import { mapState } from 'vuex'
	export default {
		name: 'Chatroom',
		components: { MineBtnsHeader },
		computed: {
			...mapState({
				chatListsChatId: state => state.chatListsChatId,
				chatIcon: state => state.chatIcon
			}),
			chatid () {
				return this.$route.params.chatid
			},
			loginUserInfo () {
				return JSON.parse(sessionStorage.getItem('loginUserInfo'))
			}
		},
		watch: {
			chatListsChatId (value) {
				// this.changeMsgRead()
			}
		},
		data () {
			return {
				headerObj: {
					title: '',
					more: []
				},
				msgObj: {
					from: '',
					to: '',
					content: ''
				},
				showIconPanel: false,
				pageNum: 1
			}
		},
		mounted () {
			this._initGetChatListByChatId()
		},
		methods: {
			setScrollTop () {// 每次更新完组件的时候，使滚动条滚动到最低端
				this.$nextTick(function(){
					var div = document.getElementById('chatWrapper');
					div.scrollTop = div.scrollHeight;
				})
			},
			// changeMsgRead () {
			// 	socket.emit('changeMsgRead', { chatid: this.chatid, from: this.msgObj.from })
			// },
			_initGetChatListByChatId () {
				this.$store.commit('SET_SHOWMINEFOOTER', false)
				let arr = this.chatid.split('_')
				arr.forEach(v => {
					if(v == this.loginUserInfo._id) {
						this.msgObj.from = v
					} else {
						this.msgObj.to = v
					}
				})
				// this.changeMsgRead()
				socket.emit('getChatListByChatId', { from: this.msgObj.from, to: this.msgObj.to })
				this.setScrollTop()
			},
			changeIconPanel (bol) {
				this.setScrollTop()
				this.showIconPanel = bol
			},
			setMsg (item) {
				this.msgObj.content += item
			},
			submitEvent () {
				if(this.msgObj.content != '') {
					socket.emit('createMsg', this.msgObj)
					this.msgObj.content = ''
				}
			}
		},
		updated () {
			this.setScrollTop()
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
	.chat-room {
		.c-r-content {
			position(relative)
			margin-top(40px)
			height(calc(100vh - 40px))
			.chat-wrapper {
				padding-all(.1rem)
				padding-bottom(0)
				height(calc(100vh - 90px))
				overflow-y: scroll
				li {
					margin-bottom(.1rem)
					align-items(flex-start)
					img {
						width(.3rem)
						height(.3rem)
						border-radius(50%)
					}
					.text {
						position(relative)
						padding-all(.07rem)
						line-height(.18rem)
						background(#26a2ff)
						font-size(.14rem)
						font-color(#fff)
						border-radius(.06rem)
					}
					&.from {
						justify-content(flex-end)
						.text {
							margin-right(.16rem)
							&:after {
								content: ''
								position(absolute)
								top(.06rem)
								right(-0.06rem)
								border-top: .06rem solid transparent
								border-bottom: .06rem solid transparent
								border-left: .06rem solid #26a2ff
							}
						}
					}
					&.to {
						justify-content(flex-start)
						.text {
							margin-left(.16rem)
							&:before {
								content: ''
								position(absolute)
								top(.06rem)
								left(-0.06rem)
								border-top: .06rem solid transparent
								border-right: .06rem solid #26a2ff
								border-bottom: .06rem solid transparent
							}
						}
					}
				}
				&.has-icon-panel {
					height(calc(100vh - 267px))
				}
			}
			.input-wrapper {
				position(absolute)
				bottom(0)
				left(0)
				padding-all(.06rem)
				width(100%)
				background(#f6f6f6)
				box-shadow: 0 0 0.02rem 0 #d6d6d6
				.input-btn {
					align-items(center)
					justify-content(space-between)
					img {
						margin-right(6px)
						width(.3rem)
						height(.3rem)
						border-radius(50%)
					}
					textarea {
						outline: none
						resize: none
					}
					p {
						text-align(center)
						cursor(pointer)
						&.m-l-r-06rem {
							margin-l-r(.06rem)
							width(.15rem)
						}
						&.submit {
							font-color(#26a2ff)
						}
					}
				}
				.icon-wrapper {
					padding-top(.1rem)
					align-items(center)
					flex-wrap(wrap)
					li {
						cursor(pointer)
						margin-bottom(.1rem)
						text-align(center)
						width(12.5%)
						height(.2rem)
						font-size(.2rem)
					}
				}
			}
		}
	}
</style>