// 负责所有全局自定组件的注册
import PageTools from './PageTools'
export default {
  // install(Vue) Vue为Vue实例对象
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTools)
  }
}
