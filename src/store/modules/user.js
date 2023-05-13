import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { loginAPI, getUserInfoAPI, getDetailByIdAPI } from '@/api'
import { resetRouter } from '@/router'
export default ({
  namespaced: true,
  state: {
    // 设置初始状态
    token: getToken(),
    userInfo: {} // 设置为空对象，防止使用getters快捷访问时报错
  },
  mutations: {
    setToken(state, token) {
      // 使token的数据保持变化
      state.token = token

      // 将变化后的token同步
      setToken(state.token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, result) {
      // 设置userInfo的值
      state.userInfo = result
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const result = await loginAPI(data) // 拿到token
      context.commit('setToken', result) // 设置token
      // 获取token以后，获取当前时间戳
      setTimeStamp()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const result = await getUserInfoAPI()

      // 根据id获取用户的信息(得到头像)
      const baseInfo = await getDetailByIdAPI(result.userId)

      context.commit('setUserInfo', { ...result, ...baseInfo })
      return result
    },

    // 退出登录
    logout(context) {
      // 清空token和用户信息
      context.commit('removeToken')
      context.commit('removeUserInfo')

      // 重置路由表
      resetRouter()

      // 重置vuex中的routes
      // 想要调用有命名空间的子模块中的mutation方法，需要使用 路径 并且 开启{ root: true }才能允许调用
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
})
