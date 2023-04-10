import request from '@/utils/request'

// 登录
export const login = data => request({
  url: '/sys/login',
  method: 'POST',
  data
})

// 获取用户基本信息
export const getUserInfo = () => request({
  url: '/sys/profile',
  method: 'POST'
})

export function logout() {

}
