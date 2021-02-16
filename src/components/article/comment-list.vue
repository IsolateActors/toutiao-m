<template>
  <div class="comment-list">

      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.content" /> -->

        <comment-item v-for="(comment,index) in list" :key="index" :comment='comment'></comment-item>
        </van-list>
  </div>
</template>

<script>
import { getComments } from '../../api/comment'
import CommentItem from '../../components/article/comment-item.vue'
export default {
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
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
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })

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
