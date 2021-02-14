<template>
    <div class="search-container">
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus='isResultShow = false'

            />
        </form>

        <search-result :search-text='searchText' v-if="isResultShow"></search-result>
        <search-suggestion @search='onSearch' :search-text='searchText' v-else-if="searchText"></search-suggestion>
        <search-history v-else :search-histories='searchHistories' @search='onSearch'></search-history>

    </div>
</template>

<script>
import SearchSuggestion from '../../components/search/search-suggestion'
import SearchHistory from '../../components/search/search-history'
import SearchResult from '../../components/search/search-result'

// import { getSearchHistories } from '../../api/search'

import { mapState } from 'vuex'
import { getItem, setItem } from '../../utils/storage'
export default {
  data () {
    return {
      searchText: '',
      isResultShow: false,

      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    onSearch (sText) {
      if (!sText) return
      console.log('xxxxxxx' + sText)
      this.searchText = sText

      const index = this.searchHistories.indexOf(sText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(sText)

      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    async loadSearchHistories () {
      const searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   console.log(data.data.keywords)

      //   searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      // }

      this.searchHistories = searchHistories
    }
  },
  created () {
    this.loadSearchHistories()
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  }
}
</script>

<style lang="scss" scoped>
  .search-container{
    ::v-deep .van-search{
      background-color: #3296fa;
    }
    ::v-deep .van-search__action{
      color: #fff;
    }
  }
</style>
