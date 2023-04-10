// 权限设置文件 通过路由守卫
import router from '@/router'
import store from '@/store' // 引入store实例
import nprogress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 引入样式

// 前置守卫
// next为守卫的钩子，必须执行
const whiteList = ['/login', '/404']
router.beforeEach((to, form, next) => {
  nprogress.start() // 开启进度条
  // 有token
  if (store.getters.token) {
    // 有token且访问登录页，则直接跳转到主页
    if (to.path === '/login') {
      // 如果访问登录页
      next('/') // 跳到主页
    } else {
      next() // 通行
    }
  } else {
    // 没token，访问白名单通行，否则跳转到login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 手动强制关闭，防止出错
})

// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
