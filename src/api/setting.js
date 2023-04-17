import request from '@/utils/request'

// 获取角色列表
export const getRoleList = params => request({
  url: '/sys/role',
  method: 'GET',
  params
})
