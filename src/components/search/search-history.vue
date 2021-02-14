<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div class="alldelete" v-if="isDeleteShow">
        <span @click="onDelete">全部删除</span>
        <span>|</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>

      <van-icon name="delete" v-else @click="isDeleteShow = true"/>
    </van-cell>

    <van-cell v-for="(history, index) in searchHistories" :key="index" :title="history"  icon="search" @click="onHistoryClick(history)">
      <van-icon name="delete" v-show="isDeleteShow" @click="searchHistories.splice(index, 1)"/>
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '../../utils/storage'
export default {
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onHistoryClick (history) {
      console.log('onHistoryClick')
      if (!this.isDeleteShow) {
        this.$emit('search', history)
      }
    },
    onDelete () {
      // 注意：props是对象时，只能作修改，不能赋值，赋值改地址，原数据不变
      // this.searchHistories = []
      // setItem('search-histories', this.searchHistories)

      this.$parent.searchHistories = []
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-history{
    .alldelete span{
      &:first-child{
        margin-right: 5px !important;
      }
      &:last-child{
        margin-left: 5px !important;
      }
    }
  }
</style>
