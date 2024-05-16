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

// 查询接口列表
export const getFunctionList = (params) => {
  return request.get({ url: '/uaa/function/list', params })
}



// 修改菜单
export const updateTokenStatus = (data: FunctionVO) => {
  return request.put({ url: '/uaa/function/updateTokenStatus', data })
}


