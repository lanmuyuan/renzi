<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left" :model="loginData" :rules="rules">

      <div class="title-container">
        <h3 class="title"><img src="@/assets/common/login-logo.png" alt=""></h3>
      </div>

      <!-- 账号框 -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginData.mobile" />
      </el-form-item>
      <!-- 密码框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="pwd" v-model="loginData.password" :type="passwordType" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button class="loginBtn" :loading="loading" @click="login">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
  <!-- 环境变量的作用
  1.正常公司中有几个环境4开发dev测试test预发uat线上Pro
  2.,在项目里如何配置这几个环境
  通过.env配置base api -->
</template>

<script>
import { validPhone } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const phoneValid = (rules, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error('格式不正确'))
      }
    }
    return {
      passwordType: 'password',
      loginData: {
        mobile: '13800000002',
        password: '123456'
      },
      loading: false,
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号必填',
            trigger: 'blur'
          },
          {
            validator: phoneValid,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码必填',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/asyncLogin', this.loginData)
        this.$router.push('/')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#d4e3ff;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #fff
  }
  .loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
  width:100%;
  margin-bottom:30px;
  border: unset;
  color:#fff
}
}
</style>

<style lang="scss" scoped>
$bg:#d4e3ff;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
