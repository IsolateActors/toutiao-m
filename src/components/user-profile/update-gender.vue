<template>
  <div class="update-gender">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index='defaultIndex'
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onGenderChange"
        />
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 请求提交更新用户性别
      try {
        await updateUserProfile({
          gender: this.defaultIndex
        })

        this.$emit('input', this.defaultIndex)
        this.$toast.success('保存成功！')
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('请求失败请重试！')
      }
    },
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    }
  }
}
</script>

<style>

</style>
