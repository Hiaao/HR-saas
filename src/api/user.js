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

// 根据id获取角色详情
export const getDetailById = id => request({
  url: `/sys/user/${id}`
})
