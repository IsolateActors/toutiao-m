import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn') // 全局使用简体中文
dayjs.extend(relativeTime)

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  if (!value) return ''
  return dayjs().to(dayjs(value)) // n年后
})
