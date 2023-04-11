// 负责管理所有的自定义指令
export const imageerror = {
  // 解决异常图片问题：
  // 指令对象，会在当前dom元素插入到节点后执行
  inserted(dom, options) {
    // dom：异常图片，指令作用的dom对象
    // options：指令所传入变量的解释，通过option.value得到传入的变量
    // img出错会自动触发 onerror (通过这个对象解决图片异常)
    dom.onerror = function() {
      // 当图片出现异常，就将传入的默认图片设置为当前图片
      dom.src = options.value
    }
  }
}
