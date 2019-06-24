<template>
	<div class="login-register">
		<div class="l-r-wrapper">
			<div class="logo">
				<img :src="logoImg" alt="">
			</div>
			<div class="inputs">
				<h2 class="title">新用户注册</h2>
				<mt-field class="mine-mt-field" label="用户名" v-model="registerObj.user" type="text" placeholder="用户名" :state="registerStatus.user" @blur.native.capture="checkUser"></mt-field>
				<mt-field class="mine-mt-field" label="登录密码" v-model="registerObj.pwd" placeholder="登录密码" type="password" :state="registerStatus.pwd" @blur.native.capture="checkPwd1"></mt-field>
				<mt-field class="mine-mt-field" label="确认密码" v-model="registerObj.checkPwd" placeholder="确认密码" type="password" :state="registerStatus.checkPwd" @blur.native.capture="checkPwd2"></mt-field>
				<mt-radio class="flex mine-mt-radio" title="用户类型" v-model="registerObj.type" :options="['Genius', 'Boss']" :state="registerStatus.type"></mt-radio>
				<ul class="flex mt01rem">
					<li class="flex_1"><mt-button size="large" type="default" @click="registerEvent(0)">取消</mt-button></li>
					<li class="flex_1 ml03rem"><mt-button size="large" type="primary" @click="registerEvent(1)">确认</mt-button></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import logo from '@/assets/imgs/logo.png'
	import { resetStatus } from '@/utils/common'
	// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import { mapState, mapActions } from 'vuex'
	import { sha256 } from 'utility'
	export default {
		name: 'Register',
		computed: {
			...mapState({
				duration: state => state.duration
			}),
		},
		data () {
			return {
				logoImg: logo,
				registerObj: {
					user: '',
					pwd: '',
					checkPwd: '',
					type: ''
				},
				registerStatus: {
					user: '',
					pwd: '',
					checkPwd: '',
					type: ''
				}
			}
		},
		methods: {
			checkUser () {// 验证用户名是否存在
				if(!this.registerObj.user) {
					this.$toast({ message: '请输入用户名', position: 'middle', duration: this.duration })
					this.registerStatus.user = 'error'
					return
				}
				this.$store.dispatch('checkUser', this.registerObj.user)
				.then(d => {
					this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
					if(d.data.code == 0) {
						this.registerStatus.user = 'success'
					} else {
						this.registerStatus.user = 'error'
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			checkPwd1 () {// 验证密码输入
				let message = ''
				if(this.registerObj.pwd) {
					if(!this.registerObj.checkPwd) {
						if(this.registerObj.pwd.length < 8 || this.registerObj.pwd.length > 16) {
							message = '密码长度须限制在8到16位'
						} else {
							this.registerStatus.pwd = 'success';
						}
					} else {
						if(this.registerObj.pwd !== this.registerObj.checkPwd) {
							message = '两次密码输入不一致'
						} else {
							this.registerStatus.pwd = 'success';
						}
					}
				} else {
					if(!this.registerObj.checkPwd) {
						message = '请输入密码'
					} else {
						message = '两次密码输入不一致'
					}
				}
				if(message) {
					this.$toast({ message: message, position: 'middle', duration: this.duration })
					this.registerStatus.pwd = 'error';
				}
			},
			checkPwd2 () {// 验证确认密码
				let message = ''
				if(this.registerObj.checkPwd) {
					if(!this.registerObj.pwd) {
						if(this.registerObj.checkPwd.length < 8 || this.registerObj.checkPwd.length > 16) {
							message = '确认密码长度须限制在8到16位'
						} else {
							this.registerStatus.checkPwd = 'success'
						}
					} else {
						if(this.registerObj.pwd !== this.registerObj.checkPwd) {
							message = '两次密码输入不一致'
						} else {
							this.registerStatus.checkPwd = 'success';
						}
					}
				} else {
					if(!this.registerObj.pwd) {
						message = '请输入确认密码'
					} else {
						message = '两次密码输入不一致'
					}
				}
				if(message) {
					this.$toast({ message: message, position: 'middle', duration: this.duration })
					this.registerStatus.checkPwd = 'error';
				}
			},
			r_reset() {
				resetStatus(this.registerObj, '')
				resetStatus(this.registerStatus, '')
			},
			registerEvent (index) {// 逻辑还需要修改
				if(index == 0) {
					this.r_reset()
				} else {
					let available = true
					for(let attr in this.registerStatus) {
						if(this.registerStatus[attr] == 'error') {
							available = false
						}
					}
					if(available) {
						let data = { ...this.registerObj }
						data.pwd = sha256(data.pwd)
						delete data.checkPwd;
						this.$store.dispatch('register', data)
						.then(d => {
							this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
							if(d.data.code == 0) {
								this.r_reset()
								this.$store.state.userInfo = { ...d.data.data }
								// 切换路由
							}
						})
						.catch(err => {
							console.log(err)
						})
					} else {
						this.$toast({ message: '请输入正确的注册信息', position: 'middle', duration: this.duration })
						return;
					}
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/login_register'
</style>