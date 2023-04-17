import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import components from './components'

// 通过 * as 将定义的组件存放在一个对象中
import * as directives from './directives'
import '@/icons' // icon
import '@/permission' // permission control

// 通过循环一次性定义全局指令
// Object.keys()返回一个key值的数组，通过数组的循环定义指令
Object.keys(directives).forEach(key => {
  // 定义指令key，传入指令对象directives[key]
  Vue.directive(key, directives[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 注册自定义组件
Vue.use(components)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
