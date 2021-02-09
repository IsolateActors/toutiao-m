import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
  // baseURL: 'https://toutiao.m.lipengzhou.com/api'
})

request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
  // 对响应数据做点什么
    return response
  },
  async function (error) {
  // 对响应错误做点什么
    if (error.response && error.response.state === 401) {
      const user = store.state.user

      if (!user || !user.refresh_token) {
        return router.push('/login')
      }

      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          // url: 'https://toutiao.m.lipengzhou.com/api/app/v1_0/authorizations',

          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: user.data.data.refresh_token
        })

        return request(error.config)
      } catch (error) {
        router.push('/login')
      }
    }

    return Promise.reject(error)
  })

export default request
