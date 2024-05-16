import request from '@/config/axios'

export interface PermissionAssignUserRoleReqVO {
  userId: number
  roleId: number
}

export interface PermissionAssignRoleMenuReqVO {
  roleId: number
  menuIds: number[]
}

export interface PermissionAssignRoleFunctionReqVO {
  roleId: number
  functionIds: number[]
}

export interface PermissionAssignRoleDataScopeReqVO {
  roleId: number
  dataScope: number
  dataScopeDeptIds: number[]
}

// 查询角色拥有的菜单权限
export const getRoleMenuList = async (roleId: number) => {
  return await request.get({ url: '/uaa/permission/listRoleMenus?roleId=' + roleId })
}

// 查询角色拥有的接口权限
export const getRoleFunctionList = async (roleId: number) => {
  return await request.get({ url: '/uaa/permission/listRoleFunctions?roleId=' + roleId })
}

// 赋予角色菜单权限
export const assignRoleMenu = async (data: PermissionAssignRoleMenuReqVO) => {
  return await request.post({ url: '/uaa/permission/assignRoleMenu', data })
}

// 赋予角色接口权限
export const assignRoleFunction = async (data: PermissionAssignRoleFunctionReqVO) => {
  return await request.post({ url: '/uaa/permission/assignRoleFunction', data })
}

// 赋予角色数据权限
export const assignRoleDataScope = async (data: PermissionAssignRoleDataScopeReqVO) => {
  return await request.post({ url: '/system/permission/assign-role-data-scope', data })
}

// 查询用户拥有的角色数组
export const getUserRole = async (userId: number) => {
  return await request.get({ url: '/uaa/role/getUserRoleInAOrg?userId=' + userId })
}

// 赋予用户角色
export const assignUserRole = async (data: PermissionAssignUserRoleReqVO) => {
  return await request.post({ url: '/uaa/permission/assignUserRoleInAOrg', data })
}
