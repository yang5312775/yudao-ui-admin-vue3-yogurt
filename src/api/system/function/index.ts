import request from '@/config/axios'

export interface FunctionVO {
  id: string
  name: string
  type: number
  parentId: string
  method: string
  token: number
}

// 查询接口（精简）列表
export const getSimpleFunctionsList = () => {
  return request.get({ url: '/uaa/function/list' })
}

// 查询菜单列表
export const getFunctionList = (params) => {
  return request.get({ url: '/uaa/function/list', params })
}

// 获取菜单详情
export const getMenu = (id: number) => {
  return request.get({ url: '/system/menu/get?id=' + id })
}

// 新增菜单
export const createMenu = (data: FunctionVO) => {
  return request.post({ url: '/uaa/menu/insert', data })
}

// 修改菜单
export const updateMenu = (data: FunctionVO) => {
  return request.put({ url: '/uaa/menu/update', data })
}

// 删除菜单
export const deleteMenu = (id: number) => {
  return request.delete({ url: '/uaa/menu/delete?id=' + id })
}
