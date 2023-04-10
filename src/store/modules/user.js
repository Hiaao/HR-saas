import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI, getUserInfoAPI } from '@/api'
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
    getUserInfo(state, result) {
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
    },
    // 获取用户信息
    async getUserInfo(context) {
      const result = await getUserInfoAPI()
      context.commit('setUserInfo', result)
      return result
    }
  }
})
