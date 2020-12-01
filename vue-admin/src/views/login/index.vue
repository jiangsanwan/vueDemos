<template>
	<section class="pos-f login-wrapper">
		<login-register></login-register>
		<div class="pos-f content">
			<p class="l-title">Login</p>
			<p class="more-info">开启vue3.0+antd体验的第一站</p>
			<a-form :ref="ruleForm" :model="form" :rules="rules">
				<a-form-item name="username">
					<a-input v-model:value="form.username" placeholder="请输入手机号">
						<template v-slot:prefix>
							<UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item name="userpwd">
					<a-input-password v-model:value="form.userpwd" placeholder="请输入密码">
						<template v-slot:prefix>
							<LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
						</template>
					</a-input-password>
				</a-form-item>
				<a-form-item name="verificationCode">
					<verification-code v-model:value="form.verificationCode" @callback="callback"></verification-code>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" @click="onSubmit">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</section>
</template>

<script type="text/ecmascript-6">
	import LoginRegister from '@/components/canvas/login_register/index'
	import { ref, getCurrentInstance, onBeforeUnmount } from 'vue'
	import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
	import VerificationCode from '@/components/verificationCode/index'
	import { sha256 } from 'utility'
	import { useStore } from 'vuex'
	export default {
		name: 'Login',
		components: { LoginRegister, UserOutlined, LockOutlined, VerificationCode },
		setup () {
			let { ctx } = getCurrentInstance(),
				store = useStore(),
				timer = ref(null),
				form = ref({
					username: '',
					userpwd: '',
					verificationCode: ''
				}),
				ruleFormRef = null,
				ruleForm = el => {
					ruleFormRef = el
				},
				ajaxResult = ref(null),
				// eslint-disable-next-line
				usernameCheck = async (rule, value, callback) => {
					if(!value) {
						return Promise.reject('手机号不能为空')
					} else if (!/^1[3456789]\d{9}$/.test(value)) {
						return Promise.reject('手机号格式不正确')
					} else {
						return Promise.resolve()
					}
				},
				// eslint-disable-next-line
				userpwdCheck = async (rule, value, callback) => {
					if(value.length == 0) {
						return Promise.reject('密码不能为空')
					} else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/.test(value)) {
						return Promise.reject('密码必须由数字+字母+特殊字符组合，长度介于6~16位')
					} else {
						return Promise.resolve()
					}
				},
				rules = ref({
					username: [
						{ validator: usernameCheck, trigger: 'blur' }
					],
					userpwd: [
						{ validator: userpwdCheck, trigger: 'blur' }
					],
					verificationCode: [
						{ required: true, message: '验证码不能为空', trigger: 'change' }
					]
				}),
				callback = (data) => {
					form.value.verificationCode = data
				},
				handleRoute = () => {
					ctx.$router.push('/dashboard')
				},
				onSubmit = () => {
					ruleFormRef.validate()
					.then(async () => {
						let data = { ...form.value }
						data.userpwd = sha256(data.userpwd)
						await store.dispatch('user/login', data)
						await handleRoute()
					})
					.catch(err => {
						console.log(err)
					})
				};
			onBeforeUnmount(() => {
				if(timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
			})
			return {
				form,
				rules,
				ruleForm,
				ajaxResult,
				callback,
				onSubmit
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
	.login-wrapper {
		all(0)
		.content {
			top(50%)
			right(150px)
			transform: translateY(-50%)
			padding-all(20px)
			width(380px)
			border-radius(10px)
			box-shadow: 0 2px 8px 0 rgba(7, 17, 27, .06)
			background(linear-gradient(to bottom, #103FBB, #126BD3))
			font-color(#fff)
			.l-title {
				margin-bottom(0)
				line-height(50px)
				font-size(32px)
			}
			.more-info {
				margin-bottom(30px)
				font-size(20px)
			}
		}
	}
</style>