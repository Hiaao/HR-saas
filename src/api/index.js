import { login, getUserInfo, getDetailById } from './user'
import { getDepartments, delDepartment, addDepartment } from './departments'
import { getEmployeeSimple } from './employees'

// 用户相关API
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const getDetailByIdAPI = getDetailById

// 组织架构相关API
export const getDepartmentsAPI = getDepartments
export const addDepartmentAPI = addDepartment
export const delDepartmentAPI = delDepartment

// 员工相关API
export const getEmployeeSimpleAPI = getEmployeeSimple

