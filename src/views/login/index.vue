<template>
  <div class="login-container">
    <van-nav-bar title="登录 / 注册" left-arrow @click-left="$router.back()">
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form
      @submit="onLogin"
      @failed='onFailed'
      :show-error-message='false'
      :show-error="false"
      ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        left-icon="phone-o"
        required
        type="number"
        center
        name="mobile"
        maxlength='11'
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        type="number"
        left-icon="qr"
        required
        maxlength='6'
        show-error-message='false'
        placeholder="请输入短信验证码"
        name='code'
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down @finish='isCountDownShow = false' v-if="isCountDownShow" :time="1000 * 60" format="ss s" />
          <van-button v-else size="mini" :loading='isSendSmsLoding' @click.prevent="onSendSms" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" size="small" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  data () {
    return {
      user: {
        mobile: '13811111111',
        code: '246810'
      },

      isSendSmsLoding: false,
      isCountDownShow: false,

      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]

      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })

      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功！')
        this.$store.commit('setUser', data.data)

        // this.$store.commit('removeCachePage', 'layoutIndex')
        // this.$router.back()
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.$toast.fail('登录失败！')
      }
    },

    onFailed (err) {
      console.log(err)
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message
          // position: 'top'
        })
      }
    },

    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoding = true

        await sendSms(this.user.mobile)

        this.isCountDownShow = true
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message
          // position: 'top'
        })
      }

      this.isSendSmsLoding = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
