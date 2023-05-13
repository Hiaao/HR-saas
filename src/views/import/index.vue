<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployeeAPI } from '@/api'
export default {
  methods: {
    async success({ header, results }) {
      // 两个参数中的数据为中文，results是excel里的数据
      // 新增员工的数据是一致的
      // username: '', 姓名
      // mobile: '', 手机号
      // formOfEmployment: '',
      // workNumber: '', 工号
      // departmentName: '',
      // imeOfEntry: '', 入职日期
      // correctionTime: '' 转正时间
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      var userArry = []
      results.forEach((obj) => {
        var userInfo = {}
        Object.keys(obj).forEach((key) => {
          if (
            userRelations[key] === 'timeOfEntry' ||
            userRelations[key] === 'correctionTime'
          ) {
            userInfo[userRelations[key]] = new Date(this.formatDate(obj[key], '/'))
          } else {
            userInfo[userRelations[key]] = obj[key]
          }
        })
        userArry.push(userInfo)
      })
      await importEmployeeAPI(userArry)
      this.$message.success('导入excel成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style>
</style>
