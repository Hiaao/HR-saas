// 权限设置文件 通过路由守卫
import router from '@/router'
import store from '@/store' // 引入store实例
import nprogress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 引入样式

// 前置守卫
// next为守卫的钩子，必须执行
const whiteList = ['/login', '/404']
router.beforeEach(async(to, form, next) => {
  nprogress.start() // 开启进度条
  // 有token
  if (store.getters.token) {
    // 有token且访问登录页，则直接跳转到主页
    if (to.path === '/login') {
      // 如果访问登录页
      next('/') // 跳到主页
    } else {
      // 有token并且通行就通过action方法获取用户信息
      // 通过userId判断是否已有信息，有则不重复获取
      if (!store.getters.userId) {
        // 方法中执行了axios请求所以为异步，解决异步
        const { roles: { menus }} = await store.dispatch('user/getUserInfo')

        // console.log(menus)
        // 获取当前登录用户所拥有的动态权限
        const routes = await store.dispatch('permission/filterRoutes', menus)
        // 需要将获取到的routes动态权限赋值给路由表，和静态路由合并
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])

        next(to.path) //  router.addRoutes()方法之后必须使用这行代码，表示再跳转一次，路由才能完全渲染到路由表中
      }
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
