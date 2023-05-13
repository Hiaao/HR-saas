import request from '@/utils/request'

// 员工相关接口

// 获取员工简单列表
export const getEmployeeSimple = () => request({
  url: '/sys/user/simple',
  method: 'GET'
})

// 获取员工综合列表
export const getEmployeeList = params => request({
  url: '/sys/user',
  method: 'GET',
  params
})

// 删除员工
export const delEmployee = id => request({
  url: `/sys/user/${id}`,
  method: 'DELETE'
})

// 添加员工
export const addEmployee = data => request({
  url: `/sys/user`,
  method: 'POST',
  data
})

// 导入员工数据
export const importEmployee = data => request({
  url: `/sys/user/batch`,
  method: 'POST',
  data
})

// 保存用户基本信息
export const saveUserDetailByid = data => request({
  url: `/sys/user/${data.id}`,
  method: 'PUT',
  data
})

/** *
 *  读取用户详情的基础信息
 * **/
export const getPersonalDetail = id => request({
  url: `/employees/${id}/personalInfo`
})

/** *
 *  更新用户详情的基础信息
 * **/
export const updatePersonal = data => request({
  url: `/employees/${data.userId}/personalInfo`,
  method: 'put',
  data
})

/** **
 * 获取用户的岗位信息
 *
 * ****/
export const getJobDetail = id => request({
  url: `/employees/${id}/jobs`
})

/**
 * 保存岗位信息
 * ****/
export const updateJob = data => request({
  url: `/employees/${data.userId}/jobs`,
  method: 'put',
  data
})

// 分配角色
export const assignRole = data => request({
  url: `/sys/user/assignRoles`,
  method: 'put',
  data
})
