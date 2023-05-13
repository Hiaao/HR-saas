// 混入的方法模块
import store from '@/store'
export default {
  methods: {
    // 用于判断用户是否拥有按钮控制权限
    checkPermission(key) {
      const { userInfo } = store.state.user
      // points用于存放用户拥有的控制权
      if (userInfo.roles && userInfo.roles.points) {
        // 拥有控制权，则判断是否拥有传入的key控制权
        return userInfo.roles.points.some(item => item === key)
      }
      //   没用控制权直接返回false
      return false
    }
  }
}
