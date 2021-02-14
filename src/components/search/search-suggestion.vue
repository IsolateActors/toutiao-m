<template>
  <div class="search-suggestion">
      <van-cell icon="search" @click="$emit('search', item)" v-for="(item,index) in suggestions" :key="index">
        <template #title>
          <div v-html="highlight(item,searchText)"></div>
        </template>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '../../api/search'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true

    }
  },
  methods: {
    highlight (source, keyword) {
      return source.replace(new RegExp(keyword, 'gi'), `<span style="color: red">${keyword}</span>`)
    }
  }
}
</script>

<style>

</style>
