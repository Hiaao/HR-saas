import { login, getUserInfo, getDetailById } from './user'
import { getDepartments, delDepartment, addDepartment, getDepartmentById, updateDepartment } from './departments'
import { getEmployeeSimple } from './employees'
import { getRoleList } from './setting'

// 用户相关API
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const getDetailByIdAPI = getDetailById

// 组织架构相关API
export const getDepartmentsAPI = getDepartments
export const addDepartmentAPI = addDepartment
export const delDepartmentAPI = delDepartment
export const getDepartmentByIdAPI = getDepartmentById
export const updateDepartmentdAPI = updateDepartment

// 员工相关API
export const getEmployeeSimpleAPI = getEmployeeSimple

// 角色管理相关API
export const getRoleListAPI = getRoleList

