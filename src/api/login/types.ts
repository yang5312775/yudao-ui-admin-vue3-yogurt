export type UserLoginVO = {
  username: string
  password: string
  captchaVerification: string
  socialType?: string
  socialCode?: string
  socialState?: string
}

export type TokenType = {
  id: number // 编号
  accessToken: string // 访问令牌
  refreshToken: string // 刷新令牌
  userId: number // 用户编号
  expiresTime: number //过期时间
}

export type UserVO = {
  id: number
  username: string
  nickname: string
  deptId: number
  email: string
  mobile: string
  sex: number
  avatar: string
  loginIp: string
  loginDate: string
}
