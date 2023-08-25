// 多语言实例化文件
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 中文包
import elementEN from 'element-ui/lib/locale/lang/en' // 英文包
import elementJA from 'element-ui/lib/locale/lang/ja' // 英文包
// 引入自定义语言包，用于设定左侧菜单栏语言设置
import customZH from './zh'
import customEN from './en'
Vue.use(VueI18n) // 完成Vue的全局注册
export default new VueI18n({
  // i18n的选项
  locale: Cookie.get('language') || 'zh', // 当前的多语言的类型，随意定义的字符串  中文 zh / 英文 en
  messages: {
    // 存放对应的语言和，语言内存放语言包
    zh: {
      // 语言包：elementUI 语言包 + 自定义语言包
      ...elementZH, ...customZH
    },
    en: {
      ...elementEN, ...customEN
    },
    ja: {
      ...elementJA
    }
  } // 当前的语言包
})
