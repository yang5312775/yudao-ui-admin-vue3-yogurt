import request from '@/config/axios'

export interface UserVO {
  id: number
  userName: string
  nickName: string
  deptId: number
  postIds: string[]
  email: string
  mobile: string
  sex: number
  avatar: string
  loginIp: string
  status: number
  remark: string
  loginDate: Date
  createTime: Date
}

// 查询用户管理列表
export const getUserPage = (params: PageParam) => {
  return request.get({ url: '/uaa/user/page', params })
}

// 查询所有用户列表
export const getAllUser = () => {
  return request.get({ url: '/system/user/all' })
}

// 查询用户详情
export const getUser = (id: number) => {
  return request.get({ url: '/system/user/get?id=' + id })
}

// 新增用户
export const createUser = (data: UserVO) => {
  return request.post({ url: '/uaa/user/regist', data })
}

// 修改用户
export const updateUser = (data: UserVO) => {
  return request.put({ url: '/uaa/user/updateUserInfo', data })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request.delete({ url: '/uaa/user/deleteUser?id=' + id })
}

// 导出用户
export const exportUser = (params) => {
  return request.download({ url: '/system/user/export', params })
}

// 下载用户导入模板
export const importUserTemplate = () => {
  return request.download({ url: '/system/user/get-import-template' })
}

// 用户密码重置
export const resetUserPwd = (id: number, oldPassword: string , newPassword: string) => {
  const data = {
    id,
    oldPassword,
    newPassword
  }
  return request.put({ url: '/uaa/user/updatePassword', data: data })
}

// 用户状态修改
export const updateUserStatus = (id: number, status: number) => {
  const data = {
    id,
    status
  }
  return request.put({ url: '/uaa/user/updateUserStatus', data: data })
}

// 获取用户精简信息列表
export const getSimpleUserList = (): Promise<UserVO[]> => {
  return request.get({ url: '/system/user/simple-list' })
}
