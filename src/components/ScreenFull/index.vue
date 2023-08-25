<template>
  <div>
    <svg-icon
      icon-class="fullscreen"
      style="color:#fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull/dist/screenfull'
export default {
  methods: {
    // 网页全屏切换
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 当全屏不可用
        return this.$message.warning('当前全屏功能不可用')
      }
      //   全屏
      ScreenFull.toggle() // 全屏切换方法
    }
  }
}
</script>

<style>

</style>
