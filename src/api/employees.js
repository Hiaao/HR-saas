import request from '@/utils/request'

// 员工相关接口

// 获取员工简单列表
export const getEmployeeSimple = () => request({
  url: '/sys/user/simple',
  method: 'GET'
})
