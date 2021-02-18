<template>
  <div class="comment-list">

      <van-cell :title="type==='c'?'全部回复':'全部评论'"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.content" /> -->

        <comment-item v-for="(comment,index) in list" :key="index" :comment='comment' @reply-click="$emit('reply-click', $event)"></comment-item>
        </van-list>
  </div>
</template>

<script>
import { getComments } from '../../api/comment'
import CommentItem from '../../components/article/comment-item.vue'
export default {
  props: {
    // 如果获取文章评论，则传递文章 ID
    // 如果获取评论回复，则传递评论 ID
    source: {
      type: [Number, String, Object],
      required: true
    },
    // 获取文章评论，使用字符 a
    // 获取评论回复，使用字符 c
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,

      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })

        this.$emit('update-total-count', data.data.total_count)

        console.log(data)
        this.list.push(...data.data.results)
        this.loading = false

        if (data.data.results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style>

</style>
