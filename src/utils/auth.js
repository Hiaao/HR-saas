import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // token key
const timeKey = 'hrassa-timestamp-key' // 时间戳key
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
