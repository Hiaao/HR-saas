// 处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router' // 首页静态的路由权限
const state = {
  routes: constantRoutes // 路由表，表示当前用户所拥有的所有路由的数组
}
const mutations = {
  // 修改routes的mutations
  // payload 认为是我们登录成功需要添加的新路由
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 每次都在静态路由的基础上添加
  }
}
const actions = {
  // 筛选权限路由
  // menus对应当前所拥有的权限
  // asyncRoutes 所有的动态路由
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      // 找到动态路由中的名字和拥有权限相等，则可以筛选出权限
      routes.push(...asyncRoutes.filter(obj => obj.name === item))
    })
    // 将得到的权限，提交给mutation
    console.log(routes)
    context.commit('setRoutes', routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
