import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'

const TimeOut = 3600 // 定义token超时时间一小时

const request = axios.create({
  // 如何在开发环境和生产环境中配置不同的url
  // 执行 npm run dev：
  // 就为开发环境 .env.development => /api => 跨域代理

  // 执行 npm run build：
  // 就为生产环境 .env.production 下的 /prod-api
  baseURL: process.env.VUE_APP_BASE_API, // 两个环境配置文件中的 环境变量
  timeout: 5000 // 设置超时时间
})

// 请求拦截器：配置统一token
request.interceptors.request.use(config => {
  // 通过getters快速访问token
  if (store.getters.token) {
    // 有token时，检查时间戳是否超时
    if (checkTimeOut()) {
      // true，表示token过期
      store.dispatch('user/logout') // token过期，登出操作 就清空token和用户信息
      router.push('/login') // 跳转到登录页面
      return Promise.reject(new Error('登录已过期，请重新登录')) // 页面提示错误
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器：通过配置统一给所有请求添加 成功的返回值和错误信息提示和错误跳转到catch
request.interceptors.response.use(response => {
  const { success, message, data } = response.data
  // 根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    Message.error(message) // elementui提示错误消息
    // 业务已经错误了，就通过 Promise.reject进入到catch中，并返回错误对象
    return Promise.reject(new Error(message))
  }
}, error => {
  // 通过服务器返回错误代码10002得知 token失效，从而被动处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(new Error('登录已过期，请重新登录'))
  } else {
    Message.error(error.message) // 错误提示信息
  }
  // 返回执行错误，让当前的执行链跳出成功，直接进入catch
  return Promise.reject(error)
})

// 判断是否超时
function checkTimeOut() {
  var currentTiem = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 最开时获取token的时间戳
  return (currentTiem - timeStamp) / 1000 > TimeOut
}

export default request
