import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
    // tabbarActive: 1
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    }
    // setTabbarActive (state, data) {
    //   state.tabbarActive = data
    // }
  },
  actions: {
  },
  modules: {
  }
})
