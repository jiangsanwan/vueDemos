<template>
    <section class="login">
        <div class="box-shadow-ccc login-wrapper">
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="">
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="loginEvent">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

    import { sha256 } from 'utility'


    const userModule = namespace('user')
    @Component
    export default class Login extends Vue {
        // 根据命名空间获取状态
        @userModule.State(state => state.username) username?: String
        @userModule.State(state => state.password) password?: String
        @userModule.State(state => state.privateKey) privateKey?: String
        // 根据命名空间获取actions
        @userModule.Action('login') login: any
        // 数据
        private ruleForm:any = {// 表单数据
            username: '',
            password: ''
        }
        private rules: any = {// 校验规则
            username: [
                { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
        }
        // 生命周期函数
        mounted () {
            this.ruleForm.username = this.username
            this.ruleForm.password = this.password
        }
        // methods
        private loginEvent () {
            let ruleForm: any = this.$refs.ruleForm
            ruleForm.validate((valid: boolean) => {
                if(valid) {
                    let data: any = { ...this.ruleForm }
                    data.password = sha256(`${data.password}###${this.privateKey}`)
                    this.login(data)
                    .then((d: any) => {
                        if(d.data.code == 0) {// 成功
                            this.$router.push('/home')
                        } else {
                            this.$message.warning(d.data.message)
                        }
                    })
                    .catch((err: any) => {
                        console.log(err)
                    })
                }
            })
        }
    }
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .login {
        position(relative)
        height(100vh)
        background(#191970)
        .login-wrapper {
            position(absolute)
            top(50%)
            left(50%)
            transform-translate(-50%, -50%)
            padding-top(30px)
            padding-l-r(20px)
            width(520px)
            border-radius(6px)
            background(rgba(230,230,250, .2))
            border: 1px solid #ccc
            .logo {
                margin-bottom(20px)
                text-align(center)
                img {
                    width(150px)
                }
            }
            .login-btn {
                margin-top(40px)
                width(100%)
            }
        }
    }
</style>