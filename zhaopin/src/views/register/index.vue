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
				<mt-field class="mine-mt-field" label="职位" v-model="registerObj.title" type="text" placeholder="请输入职位" :state="registerStatus.title" @blur.native.capture="checkInput('title', '请输入职位')"></mt-field>
				<mt-radio class="flex mine-mt-radio" title="用户类型" v-model="registerObj.type" :options="['Genius', 'Boss']" :state="registerStatus.type"></mt-radio>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="简介" placeholder="个人简介或者职位简介" type="textarea" rows="4" v-model="registerObj.desc" :state="registerStatus.desc"  @blur.native.capture="checkInput('desc', '请输入个人简介或者职位简介')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="公司名称" v-model="registerObj.company" type="text" placeholder="公司名称" :state="registerStatus.company" @blur.native.capture="checkInput('company', '请输入公司名称')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="公司财政" v-model="registerObj.finance" type="text" placeholder="公司财政" :state="registerStatus.finance" @blur.native.capture="checkInput('finance', '请输入公司财政')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="公司类型" v-model="registerObj.companyType" type="text" placeholder="公司类型" :state="registerStatus.companyType" @blur.native.capture="checkInput('companyType', '请输入公司类型')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="规模下线" v-model="registerObj.scaleMin" type="text" placeholder="公司人数最小值" :state="registerStatus.scaleMin" @blur.native.capture="checkInput('scaleMin', '请输入规模下线')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="规模上限" v-model="registerObj.scaleMax" type="text" placeholder="公司人数最大值" :state="registerStatus.scaleMax" @blur.native.capture="checkInput('scaleMax', '请输入规模上限')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="简介" placeholder="公司介绍" type="textarea" rows="4" v-model="registerObj.teamIntroduction" :state="registerStatus.teamIntroduction"  @blur.native.capture="checkInput('teamIntroduction', '请输入公司介绍')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="详细地址" v-model="registerObj.detailedAddress" type="text" placeholder="详细地址" :state="registerStatus.detailedAddress" @blur.native.capture="checkInput('detailedAddress', '请输入详细地址')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="简短地址" v-model="registerObj.briefAddress" type="text" placeholder="简短地址" :state="registerStatus.briefAddress" @blur.native.capture="checkInput('briefAddress', '请输入简短地址')"></mt-field>
				<mt-field v-if="registerObj.type == 'Boss'" class="mine-mt-field" label="所在城市" v-model="registerObj.city" type="text" placeholder="所在城市" :state="registerStatus.city" @blur.native.capture="checkInput('city', '请输入所在城市')"></mt-field>
				<mt-field class="mine-mt-field" label="验证码" v-model="registerObj.imgCode" placeholder="验证码" :state="registerStatus.imgCode" @blur.native.capture="checkImgCode">
                    <div height="45px" width="100px" v-html="imgCodeUrl" @click="_initImgVerify"></div>
                </mt-field>
				<ul class="flex mt01rem">
					<li class="flex_1"><mt-button size="large" type="default" @click="registerEvent(0)">取消</mt-button></li>
					<li class="flex_1 ml03rem"><mt-button size="large" type="primary" @click="registerEvent(1)">确认</mt-button></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<!-- <script type="text/ecmascript-6"> -->
<script>
	import logo from '@/assets/imgs/logo.png'
	import { resetStatus } from '@/utils/common'
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
					type: '',
					imgCode: '',
					title: '',
					desc: '',
					company: '',
					finance: '',
					companyType: '',
					scaleMin: '',
					scaleMax: '',
					teamIntroduction: '',
					detailedAddress: '',
					briefAddress: '',
					city: ''
				},
				registerStatus: {
					user: '',
					pwd: '',
					checkPwd: '',
					type: '',
					imgCode: '',
					title: '',
					desc: '',
					company: '',
					finance: '',
					companyType: '',
					scaleMin: '',
					scaleMax: '',
					teamIntroduction: '',
					detailedAddress: '',
					briefAddress: '',
					city: ''
				},
				imgCodeUrl: ''
			}
		},
		mounted () {
            this._initImgVerify()
        },
		methods: {
			_initImgVerify () {// 初始化图形验证码
                this.$store.dispatch('getImgVerify', {　　    　  
                    size: 4,  //验证码长度
                    width: 100,
                    height: 40,
                    background: "#f4f3f2",//干扰线条数
                    noise: 2,
                    fontSize: 30,
                    ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
                    color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有           
                })
                .then(d => {
                    if(d.data.code == 0) {
                        this.imgCodeUrl = d.data.data
                    } else {
                        this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
			checkUser () {// 验证用户名是否存在
				if(!this.registerObj.user) {
					this.$toast({ message: '请输入用户名', position: 'middle', duration: this.duration })
					this.registerStatus.user = 'error'
					return
				}
				this.$store.dispatch('checkUser', { user: this.registerObj.user })
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
			checkImgCode () {
				if(!this.registerObj.imgCode) {
					this.$toast({ message: '请输入图形验证码', position: 'middle', duration: this.duration })
					this.registerStatus.imgCode = 'error'
					return
				} else {
					this.registerStatus.imgCode = 'success'
				}
			},
			r_reset() {
				resetStatus(this.registerObj, '')
				resetStatus(this.registerStatus, '')
			},
			checkInput (attr, msg) {
				if(!this.registerObj[attr]) {
					this.$toast({ message: msg, position: 'middle', duration: this.duration })
					this.registerStatus[attr] = 'error'
					return
				} else {
					this.registerStatus[attr] = 'success'
				}
			},
			registerEvent (index) {// 逻辑还需要修改
				if(index == 0) {
					this.r_reset()
				} else {
					let available = true
					if(this.registerObj.type == 'Boss') {
						for(let attr in this.registerStatus) {
							if(this.registerStatus[attr] == 'error') {
								available = false
							}
						}
					} else {
						let tempArr = ['user', 'pwd', 'checkPwd', 'type', 'imgCode', 'title']
						tempArr.forEach(attr => {
							if(this.registerStatus[attr] == 'error') {
								available = false
							}
						})
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
	                            let url = ''
	                            if(d.data.data.type == 'Genius') {
	                                url = '/genius'
	                            } else {
	                                url = '/boss'
	                            }
	                            this.$store.commit('SET_USERINFO', d.data.data)
	                            this.$store.commit('SET_TYPE', d.data.data.type)
	                            this.$store.commit('SET_TOKEN', d.data.data.token)
	                            sessionStorage.setItem('token', d.data.data.token)
	                            this.$router.push(url)
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