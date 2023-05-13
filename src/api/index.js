import { login, getUserInfo, getDetailById } from './user'
import { getDepartments, delDepartment, addDepartment, getDepartmentById, updateDepartment } from './departments'
import { getEmployeeSimple, getEmployeeList, delEmployee, addEmployee, importEmployee, saveUserDetailByid, getPersonalDetail, updatePersonal, getJobDetail, updateJob, assignRole } from './employees'
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole, assignPerm } from './setting'
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from './permission'

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
export const getEmployeeListAPI = getEmployeeList
export const delEmployeeAPI = delEmployee
export const addEmployeeAPI = addEmployee
export const importEmployeeAPI = importEmployee
export const saveUserDetailByidAPI = saveUserDetailByid
export const getPersonalDetailAPI = getPersonalDetail
export const updatePersonalAPI = updatePersonal
export const getJobDetailAPI = getJobDetail
export const updateJobAPI = updateJob
export const assignRoleAPI = assignRole

// 公司设置相关API
export const getRoleListAPI = getRoleList
export const getCompanyInfoAPI = getCompanyInfo
export const deleteRoleAPI = deleteRole
export const getRoleDetailAPI = getRoleDetail
export const updateRoleAPI = updateRole
export const addRoleAPI = addRole
export const assignPermAPI = assignPerm

// 权限设置相关API
export const getPermissionListAPI = getPermissionList
export const addPermissionAPI = addPermission
export const updatePermissionAPI = updatePermission
export const delPermissionAPI = delPermission
export const getPermissionDetailAPI = getPermissionDetail

