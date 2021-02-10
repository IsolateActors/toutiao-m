import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorizations: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
