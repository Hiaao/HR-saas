import request from '@/utils/request'

// 获取角色列表
export const getRoleList = params => request({
  url: '/sys/role',
  method: 'GET',
  params
})

// 获取公司数据
export const getCompanyInfo = id => request({
  url: `/company/${id}`,
  method: 'GET'
})

// 删除角色
export const deleteRole = id => request({
  url: `/sys/role/${id}`,
  method: 'DELETE'
})

// 读取角色详情
export const getRoleDetail = id => request({
  url: `/sys/role/${id}`,
  method: 'GET'
})

// 保存角色信息
export const updateRole = data => request({
  url: `/sys/role/${data.id}`,
  method: 'PUT',
  data
})

// 新增角色
export const addRole = data => request({
  url: `/sys/role`,
  method: 'POST',
  data
})
