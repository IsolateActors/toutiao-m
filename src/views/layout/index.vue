<template>
  <div class="layout-container">
    <!-- layout 的子路由出口，或者说是二级路由 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <van-tabbar route v-model="active">
    <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to='/qa'>问答</van-tabbar-item>
    <van-tabbar-item icon="video-o" to='/video'>视频</van-tabbar-item>
    <van-tabbar-item icon="user-o" to='/my'>我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    // active: {
    //   get () {
    //     return this.$store.state.tabbarActive
    //   },
    //   set (value) {
    //     this.$store.commit('setTabbarActive', value)
    //   }
    // }
  },
  mounted () {
    // this.$store.commit('addCachePage', 'layoutIndex')
  }
}
</script>

<style>

</style>
