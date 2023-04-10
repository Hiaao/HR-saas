import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

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
  Message.error(error.message) // 错误提示信息
  // 返回执行错误，让当前的执行链跳出成功，直接进入catch
  return Promise.reject(error)
})

export default request
