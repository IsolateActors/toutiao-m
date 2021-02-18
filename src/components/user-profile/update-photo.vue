<template>
  <div class="update-photo">
      <img :src="image" class="image" ref="image"/>
      <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '../../api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: {
    // image: {
    //   type: String,
    //   required: true
    // }
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),

      cropper: null
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0 // 展示时间，0 表示持续展示
      })

      // 如果要求 Content-Type 是 multipart/form-data，则一定要提交 FormData 数据对象，专门用于文件上传的，不能提交 {}
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      //   fd.append('photo', this.file)
      fd.append('photo', file)
      try {
        await updateUserPhoto(fd)

        this.$emit('update-photo', window.URL.createObjectURL(file))
        // this.$emit('update-photo', this.image)
        this.$toast.success('上传成功')
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('请求失败请重试！')
      }
    },

    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image

    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="scss" scoped>
    .update-photo{
        height: 100%;
        .toolbar{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000;
        }

        ::v-deep .van-nav-bar {
            background-color: #000 !important;
        }

        .image{
            display: block;
            max-width: 100%;
        }
    }
</style>
