<template>
  <div class="update-name">
      <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
      ></van-nav-bar>

      <div class="name-field-wrap">
          <van-field v-model="localName" rows='2' autosize type="textarea" maxlength="7" show-word-limit placeholder="请输入昵称" />
      </div>
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: '',
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      console.log('onconfig')
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      try {
        await updateUserProfile({
          name: this.localName
        })

        this.$emit('input', this.localName)
        // this.$emit('update-name', this.localName)
        this.$toast.success('修改成功！')
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称已存在')
        } else {
          this.$toast.fail('请求错误，请重试！')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .update-name{
        .name-field-wrap{
            padding: 10px;
        }

        ::v-deep .van-nav-bar__text{
            color: #fff;
        }
    }
</style>
