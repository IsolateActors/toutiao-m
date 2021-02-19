import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'https://toutiao.m.lipengzhou.com/api'

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    } catch (error) {
      console.log('转换失败', error)
      return data
    }
    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
  // return JSON.parse(data)
  }]

  // timeout: 3600
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
    console.log('aaa' + error)
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
    console.log(error.response)
    const { status } = error.response
    if (status === 401) {
      // 未授权
      const user = store.state.user

      if (!user || !user.token) {
        console.log('aaa')
        // return router.push('/login')
        return redirectLogin()
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
        console.log('xxx')
        // router.push('/login')
        redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限
      Toast.fail('没有权限操作')
    } else if (status === 400) {
      // 资源不存在
      Toast.fail('客户端请求参数异常')
    } else if (status >= 500) {
      Toast.fail('服务端异常，请稍后重试')
    }

    console.log(error)
    return Promise.reject(error)
  })

function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
