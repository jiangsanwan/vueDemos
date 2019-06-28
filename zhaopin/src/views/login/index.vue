<template>
	<div class="login-register">
		<div class="l-r-wrapper">
			<div class="logo">
				<img :src="logoImg" alt="">
			</div>
            <div class="inputs">
				<h2 class="title">用户登录</h2>
                <mt-field
                    class="mine-mt-field"
                    label="用户名"
                    v-model="loginObj.user"
                    type="text"
                    placeholder="用户名"
                    :state="loginStatus.user"
                    @blur.native.capture="checkUser"
                ></mt-field>
				<mt-field
                    class="mine-mt-field"
                    label="登录密码"
                    v-model="loginObj.pwd"
                    placeholder="登录密码"
                    type="password"
                    :state="loginStatus.pwd"
                    @blur.native.capture="checkPwd1"
                ></mt-field>
				<mt-radio
                    class="flex mine-mt-radio"
                    title="用户类型"
                    v-model="loginObj.type"
                    :options="['Genius', 'Boss']"
                ></mt-radio>
				<ul class="flex mt01rem">
					<li class="flex_1">
                        <mt-button size="large" type="default" @click="loginEvent(0)">取消</mt-button>
                    </li>
					<li class="flex_1 ml03rem">
                        <mt-button size="large" type="primary" @click="loginEvent(1)">确认</mt-button>
                    </li>
				</ul>
            </div>
        </div>
    </div>
</template>
<script>
    import logo from '@/assets/imgs/logo.png'
    import { resetStatus } from '@/utils/common'
    import { mapState, mapActions } from 'vuex'
    import { sha256 } from 'utility'
    export default {
		name: 'Login',
		computed: {
			...mapState({
				duration: state => state.duration
			}),
		},
		data () {
			return {
                logoImg: logo,
                loginObj: {
					user: '',
					pwd: '',
					type: ''
                },
                loginStatus: {
                    user: '',
					pwd: ''
                }
            }
        },
        methods: {
            r_reset () {
				resetStatus(this.loginObj, '')
                resetStatus(this.loginStatus, '')
            },
            showToast (msg, type) {
                if(!this.loginObj[type]) {
                    this.loginStatus[type] = 'error'
                    this.$toast({ message: msg, position: 'middle', duration: this.duration })
                } else {
                    this.loginStatus[type] = 'success'
                }
            },
            checkUser () {// 验证用户名是否存在
                this.showToast('请输入用户名', 'user')
            },
            checkPwd1 () {
                this.showToast('请输入登录密码', 'pwd')
            },
            loginEvent (index) {
                if(index == 0) {// 取消登录
                    this.r_reset()
                } else {// 具体登录事件
                    if(!this.loginObj.type) {
                        this.showToast('请选择登录用户类型', 'type')
                        return
                    }
                    let data = { ...this.loginObj }
                    data.pwd = sha256(data.pwd)
                    this.$store.dispatch('login', data)
                    .then(d => {
                        this.$toast({ message: d.data.message, position: 'middle', duration: this.duration })
                        if(d.data.code == 0) {
                            this.$store.state.userInfo = { ...d.data.data }
                            let url = ''
                            if(d.data.data.type == 'Genius') {
                                url = '/genius'
                            } else {
                                url = '/boss'
                            }
                            this.$router.push(url)
                        } else {
                            this.loginStatus.user = 'error'
					        this.loginStatus.pwd = 'error'
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/login_register'
</style>
