<template>
  <div class="home-container">
    <!-- 导航栏 -->
      <van-nav-bar>
        <template v-slot:title>
            <van-button class="search-btn" round icon="search" size="small" type="info" url="/vant/mobile.html">搜索</van-button>
        </template>
      </van-nav-bar>

      <!-- 文章频道列表 -->
      <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="channel in channels" :key='channel.id' :title="channel.name">
        <article-list :channel='channel'></article-list>
      </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '../../components/home/article-list'
// import { mapState } from 'vuex'
// import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      console.log(data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="scss" scoped>
  .home-container{
    ::v-deep .van-nav-bar__title{
      max-width: none;
    }

    .search-btn{
      width: 277px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-button__icon{
        font-size: 16px;
      }
      .van-button__text {
            font-size: 14px;
      }
    }

    .channel-tabs{
      ::v-deep .van-tab{
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      ::v-deep .van-tabs__line{
        bottom: 20px;
        height: 3px;
        width: 15px !important;
        background: #3296fa;
      }
    }

  }
</style>
