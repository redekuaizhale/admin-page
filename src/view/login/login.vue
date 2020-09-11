<template>
  <div class="login-container">
    <div class="content">
      <div class="header">
        <span class="title">
          REDEKUAIZHALE
        </span>
      </div>
      <div class="form">
        <Button v-if="errorVisiable" icon="md-close-circle" type="error" ghost class="error-message">{{ errorMessage }}</Button>
        <Form ref="loginForm" :model="loginForm" :rules="rules" @keydown.enter.native="loginHandle">
          <FormItem prop="loginCode">
            <Input v-model="loginForm.loginCode" clearable size="large" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="22" type="ios-person"/>
            </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input v-model="loginForm.password" clearable size="large" type="password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="20" type="md-lock"/>
            </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button :loading="loginLoading" type="primary" long class="login-button" @click="loginHandle">登 录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginReq } from '../../api/user'
import { routerPush, setCookie } from '../../libs/commonUtils'

export default {
  name: 'Login',
  data() {
    return {
      errorMessage: '',
      errorVisiable: false,
      verifyCodeToken: '',
      verifyCodeBase64: '',
      loginForm: {
        loginCode: '',
        password: ''
      },
      rules: {
        loginCode: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' }
        ]
      },
      loginLoading: false
    }
  },
  methods: {

    clickTest() {
      console.info('31313')
    },
    loginHandle() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loginLoading = true
          const { loginCode, password } = this.loginForm
          const requestData = {
            loginCode: loginCode,
            password: password
          }
          loginReq(requestData).then(async res => {
            const { token, name } = res.data
            setCookie(this.config.USER_TOKEN_KEY, token)
            setCookie(this.config.USER_NAME_KEY, name)
            this.$store.dispatch('setUserMenu').then(() => {
              routerPush('/', {})
              this.loginLoading = false
            })
          }).catch(() => {
            this.loginLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "./login";
  .login-container{
    .login-button{
      height: 40px;
      margin-top: 25px;
      font-size: 15px;
    }
    .verify-code-input{
      position: relative;
      .ivu-input{
        width: 220px;
        height: 40px;
      }
    }
    .error-message{
      width: 368px;
      text-align: left;
      height: 35px;
      margin-bottom: 20px;
      font-size: 15px;
    }
  }
</style>
