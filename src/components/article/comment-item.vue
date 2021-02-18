<template>
    <van-cell class="comment-item">
    <template #icon>
      <van-image
        width="36"
        height="36"
        fit="cover"
        round
        class="avatar"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </template>
    <template #title>
      <div class="title-wrap">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon class="like-icon" :class="{liked: comment.is_liking}" :name="comment.is_liking?'good-job':'good-job-o'" />
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>

      <div class="content">{{comment.content}}</div>
      <div class="pubdate-wrap">
        <span class="pubdate">{{comment.pubdate | datetime('YYYY-MM-DD HH:mm')}}</span>
        <van-button class="reply-btn" round size="mini" @click="$emit('reply-click', comment)">回复 {{comment.reply_count}}</van-button>
      </div>
    </template>

  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '../../api/comment'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      if (this.comment.is_liking) {
        await deleteCommentLike(this.comment.com_id.toString())
        this.comment.like_count--
      } else {
        await addCommentLike(this.comment.com_id.toString())
        this.comment.like_count++
      }

      this.comment.is_liking = !this.comment.is_liking
    }

  }
}
</script>

<style lang="scss" scoped>
    .comment-item{
      .avatar{
        width: 36px;
        height: 36px;
        margin-right: 13px;
      }

      .title-wrap{
        display: flex;
        justify-content: space-between;
      }

      .like-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pubdate-wrap{
        display: flex;
        align-items: center;
      }

      .name{
        font-size: 14px;
        color: #406599;
      }

      .content{
        font-size: 12px;
        color: #222222;
      }

      .pubdate{
        font-size: 10px;
        margin-right: 10px;
      }

      .reply-btn{
        min-width: 50px;
      }

      .like-icon.liked{
        color: #ff69b4;
      }
    }
</style>
