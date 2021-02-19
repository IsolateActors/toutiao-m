<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
    v-model="isRefreshLoading"
    @refresh="onRefresh"
    :success-text='refreshSuccessText'
    :success-duration='1500'
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <!-- <van-cell v-for="(item,index) in articles" :key="index" :title="item.title" /> -->
        <article-item v-for="(item,index) in articles" :key="index" :article='item'></article-item>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from './article-item'
import { debounce } from 'lodash' // 防抖
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,

      isRefreshLoading: false,
      refreshSuccessText: '',

      scrollTop: 0
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })

      // console.log(data)
      this.articles.push(...data.data.results)
      this.loading = false

      if (data.data.results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      this.articles.unshift(...data.data.results)
      this.isRefreshLoading = false

      this.refreshSuccessText = `更新了${data.data.results.length}条数据！`
    }

  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="scss" scoped>
.article-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
}
</style>
