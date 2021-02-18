<template>
    <van-cell-group class="post-comment">
    <van-field v-model.trim="message"
            placeholder="请输入留言"
            show-word-limit
            maxlength="50"
            rows="2"
            autosize
            type="textarea"
            />

            <van-button class="post-btn" size="mini" plain type="info" @click="onPost" :disabled='!message'>发布</van-button>
    </van-cell-group>

</template>

<script>
import { addComment } from '../../api/comment'
export default {
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
        })
        console.log(data)

        this.$emit('post-success', data.data.new_obj)
        this.$toast.success('发布成功！')
        this.message = ''
      } catch (error) {
        this.message = ''
        this.$emit('post-fail')
        this.$toast.fail('文章拒绝发表评论。')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .post-comment{
        padding: 14px;
        display: flex;
        align-items: center;

        .post-btn{
            min-width: 50px;
        }
    }
</style>
