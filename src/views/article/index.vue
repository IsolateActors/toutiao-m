<template>
  <div class="article-container">
      <!-- 导航栏 -->
    <van-nav-bar
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
        />

    <div class="article-wrap">
        <h1 ref="h1" class="title">{{article.title}}</h1>
        <van-cell class="user-info" center :title="article.aut_name" :label="article.pubdate | relativeTime">
            <template #icon>
                <van-image
                    class="avatar"
                    round
                    fit="cover"
                    :src="article.aut_photo"
                />
            </template>
            <template #extra>
                <van-button class="follow-btn" :type="article.is_followed?'default':'info'" :icon="article.is_followed?'':'plus'" round size="small"
                @click="onFollow" :loading ='isFollowLoading'
                >{{article.is_followed?'已关注':'关注'}}</van-button>
            </template>
        </van-cell>

        <div class="markdown-body" ref='article-content' v-html="article.content">
        </div>

        <comment-list ref="comment-list" :list="commentList" :source="articleId" @update-total-count='totalCommentCount = $event'
        @reply-click='onReplayClick'
        ></comment-list>
    </div>

    <div class="article-bottom">
            <van-button class="comment-btn" plain round size="small" hairline type="default" @click="isPostShow = true">写评论</van-button>

            <van-icon name="comment-o" :badge='totalCommentCount' color="#777" @click="onComment"/>
            <van-icon :color="article.is_collected ? 'orange':'#777'" :name="article.is_collected ?'star':'star-o'" @click="onCollect" />
            <van-icon :color="article.attitude === 1 ? 'hotpink': '#777'" :name="article.attitude === 1 ? 'good-job':'good-job-o'" @click="onLike" />
        </div>

        <van-popup v-model="isPostShow" position="bottom">
          <post-comment :target="articleId" @post-fail='isPostShow = false'
          @post-success='onPostSuccess'></post-comment>
        </van-popup>

        <van-popup style="height:90%" v-model="isReplyShow" position="bottom">
          <comment-reply v-if="isReplyShow"  :comment="replyComment" @close='isReplyShow=false' :article-id="articleId"></comment-reply>
        </van-popup>
  </div>
</template>

<script>
import '../../styles/github-markdown.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '../../api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '../../api/user'

import CommentList from '../../components/article/comment-list.vue'
import PostComment from '../../components/article/post-comment.vue'
import CommentReply from '../../components/article/comment-reply.vue'

export default {
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false,
      isPostShow: false,
      isReplyShow: false,
      commentList: [],
      totalCommentCount: 0,
      replyComment: {}
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data

      //   图片预览
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },

    handlePreviewImage () {
      const articleContent = this.$refs['article-content']
      //   console.log(articleContent)
      const imgs = articleContent.querySelectorAll('img')
      //   console.log(imgs)
      const imgPaths = []

      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }

      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '操作中...'
      })

      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
      } catch (error) {
        this.$toast.fail('请求失败, 请重试！')
        return
      }

      this.article.is_collected = !this.article.is_collected
      this.$toast.success(this.article.is_collected ? '收藏成功' : '取消收藏')
    },

    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '操作中...'
      })

      try {
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
        }
      } catch (error) {
        this.$toast.fail('请求失败, 请重试！')
        return
      }

      this.$toast.success(this.article.attitude === 1 ? '点赞成功' : '取消点赞')
    },

    onPostSuccess (comment) {
      console.log(comment)
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isPostShow = false
    },

    onComment () {
      // console.log(this.$refs['comment-list'].$el)
      // console.log(this.$refs.h1)
      this.$refs['comment-list'].$el.scrollIntoView()
    },

    onReplayClick (comment) {
      console.log('onReplayClick', comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
    .article-container{
        .title{
        font-size: 20px;
        color: #3a3a3a;
        background-color: #fff;
        margin: 0;
        padding: 24px 20px 18px;
        }

        .user-info{
            .avatar{
                width: 35px;
                height: 35px;
                margin-right: 8px;
            }

            ::v-deep .van-cell__title{
                font-size: 12px;
                color: #333333;

                .van-cell__label{
                    font-size: 11px;
                    color: #b4b4b4;
                }
            }
            .follow-btn{
                width: 85px;
                height: 29px;
            }
        }

        ul{
            list-style: unset;
        }

        .markdown-body{
            padding: 14px;
            background-color: #fff;
        }

        .article-wrap{
            position: fixed;
            left: 0;
            right: 0;
            top: 46px;
            bottom: 44px;
            overflow-y: auto;
        }

        .article-bottom{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #fff;
            border-top: 1px solid #d8d8d8;
            height: 44px;
            box-sizing: border-box;

            .comment-btn{
                width: 141px;
                height: 23px;
                border: 1px solid #eeeeee;
                font-size: 15px;
                line-height: 23px;
                color: #a7a7a7;
            }

            .van-icon{
                font-size: 20px;
                .van-info{
                    font-size: 11px;
                    background-color: #e22829;
                }
            }
        }
    }

</style>
