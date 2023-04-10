import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api'
export default ({
  namespaced: true,
  state: {
    // 设置初始状态
    token: getToken()

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
    }
  },
  actions: {
    async login(context, data) {
      const result = await loginAPI(data) // 拿到token
      context.commit('setToken', result) // 设置token
    }
  }
})
