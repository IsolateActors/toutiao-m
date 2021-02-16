<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
       error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" :to="{name:'article', params:{articleId: item.art_id}}"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        console.log(data.data)

        this.list.push(...data.data.results)

        this.loading = false

        if (data.data.result) {
          this.page++
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

<style lang="scss" scoped>
  .search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
