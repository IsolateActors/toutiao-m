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

      <template #nav-right>
        <div class="hiddenspace"></div>
        <div class="wap-nav-wrap" @click="isChannelEditShow = true">
          <van-icon name="wap-nav" />
        </div>
      </template>
      </van-tabs>
      <van-popup v-model="isChannelEditShow" close-icon-position='top-left' closeable position="top" style="height: 100%">
        <channel-edit :active='active' @update-active='active = $event' @close='isChannelEditShow = !isChannelEditShow' :userChannels='channels'></channel-edit>
      </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '../../components/home/article-list'
import ChannelEdit from '../../components/home/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    async loadChannels () {
      if (this.user) {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          this.channels = localChannels
        } else {
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        }
      }
      // const { data } = await getUserChannels()
      // console.log(data)
      // this.channels = data.data.channels
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

    .hiddenspace{
      padding-left: 33px;
      border-bottom: 1px solid #edeff3;
    }
    .wap-nav-wrap{
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      background: rgba(255,255,255,.9)
    }
  }
</style>
