<template>
  <div class="comment-reply">
      <van-nav-bar
        :title="`${comment.reply_count}条回复`"
        >
        <template #left>
            <van-icon
                name="cross"
                @click="$emit('close')"
            />
        </template>
        </van-nav-bar>

        <comment-item :comment='comment' @reply-click='isPostShow=true'></comment-item>

        <!-- <van-cell title="所有回复"></van-cell> -->
        <comment-list :source='comment.com_id' type='c' :list='commentList' @reply-click='onReplyClick'></comment-list>

        <div class="article-bottom">
            <van-button
                class="comment-btn"
                type="default"
                round
                size="small"
                @click="isPostShow = true"
            >写评论</van-button>
        </div>

        <van-popup
            v-model="isPostShow"
            position="bottom"
            >
            <post-comment
                :target="comment.com_id"
                :article-id="articleId"
                @post-success="onPostSuccess"
            />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '../../components/article/comment-item.vue'
import CommentList from '../../components/article/comment-list'
import PostComment from '../../components/article/post-comment.vue'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (comment) {
      this.commentList.unshift(comment)

      this.comment.reply_count++

      this.isPostShow = false
    },

    onReplyClick () {
      console.log('回复评论')
    }
  }
}
</script>

<style lang="scss" scoped>
    .comment-reply{
        ::v-deep .van-nav-bar{
            background-color: #fff !important;

             .van-nav-bar__title{
                color: #333;
             }

            .van-icon{
                 color: #e0e0e0 !important;
            }
        }

        .article-bottom{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            height: 44px;
            // border-top: 1px solid #d8d8d8;
            background-color: #fff;

            .comment-btn{
                width: 200px;
                height: 30px;
                border: 1px solid #eee;
                font-size: 15px;
                line-height: 23px;
                color: #a7a7a7;
            }
        }
    }

</style>
