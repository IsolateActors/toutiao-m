<template>
  <div class="update-birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
/>
  </div>
</template>

<script>
import { updateUserProfile } from '../../api/user'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })

      try {
        const date = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: date
        })

        this.$emit('input', date)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('请求失败请重试！')
      }
    }
  }
}
</script>

<style>

</style>
