<template>
  <div>
    <!-- 年和月 -->
    <el-row type="flex" justify="end">
      <!-- 年 指定一个年份,范围为该年份的 前后五年 -->
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :value="item" :label="item" />
      </el-select>
      <!-- 月份 -->
      <el-select v-model="currentMonth" size="small" style="width: 120px; margin-left: 10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :value="item" :label="item" />
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    // 指定的年份]
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [], // 要遍历年份的数组
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null // 当前日期
    }
  },
  created() {
    // 获取当前年份
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    // 快速创造数组
    this.yearList = Array.from(Array(11), (value, index) => index + this.currentYear - 5)
    this.dateChange() // 一开始就获取一次当前时间
  },
  methods: {
    dateChange() {
      // 当切换下拉菜单,日历也跟着改变
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    isWeek(date) {
      // 判断是否为周六或周日
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
