import request from '@/utils/request'

// 获取组织架构的数据
export const getDepartments = () => request({
  url: '/company/department',
  method: 'GET'
})

// 添加组织架构的数据
export const addDepartment = data => request({
  url: '/company/department',
  method: 'POST',
  data
})

// 删除组织架构的部门
export const delDepartment = id => request({
  url: `/company/department/${id}`,
  method: 'DELETE'
})
