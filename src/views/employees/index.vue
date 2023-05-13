<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :is-left-show="true">
        <!-- 左侧显示总记录数 -->
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <!-- 右侧显示按钮 -->
        <el-button
          slot="after"
          size="small"
          type="success"
          @click="$router.push('/import')"
        >excel导入</el-button>
        <el-button
          slot="after"
          size="small"
          type="danger"
          @click="exportExcel"
        >excel导出</el-button>
        <el-button
          slot="after"
          size="small"
          type="primary"
          @click="isShowDialog = true"
        >新增员工</el-button>
      </PageTools>
      <!-- 表格组件 -->
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="头像" width="120px" align="center">
          <!-- 用于头像 插槽 -->
          <template v-slot="{ row }">
            <img
              v-imageerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              alt=""
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
              @click="showQrcode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          sortable=""
          :formatter="formOfEmployment"
        />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column
          label="入职时间"
          sortable=""
        >、
          <template v-slot="{ row }">
            <!-- 通过插槽引入时间，并使用过滤器定义格式 -->
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
            >查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button
              type="text"
              size="small"
              @click="editRole(row.id)"
            >角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteEmployee(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.page"
          :page-size="page.size"
          :total="page.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 新增员工组件弹层 -->
    <AddEmployee :is-show-dialog.sync="isShowDialog" />

    <!-- 二维码弹层 -->
    <el-dialog title="二维码" :visible.sync="isShowCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>

    <!-- 角色弹层组件 -->
    <AssignRole
      ref="assignRole"
      :is-show-role-dialog.sync="isShowRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { getEmployeeListAPI, delEmployeeAPI } from '@/api'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
import { formatDate } from '@/filters'
import Qrcode from 'qrcode'
import AssignRole from './components/assign-role.vue'
export default {
  name: 'Employee',
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      list: [], // 接收数据
      // 传入接口的参数
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      },
      loading: false,
      isShowDialog: false,
      isShowCodeDialog: false,
      isShowRoleDialog: false, // 分配角色的弹层
      userId: ''
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeListAPI(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage // 复制最新的页码
      this.getEmployeeList()
    },
    // 格式化聘用，将方法返回的值，显示到聘用
    formOfEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(
        (obj) => obj.id === parseInt(row.formOfEmployment)
      )
      return obj ? obj.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('确定删除该员工？')
        await delEmployeeAPI(id)
        this.$message.success('删除员工成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    // 导出excel方法
    exportExcel() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async(excel) => {
        // 获取到所有员工数据，然后要将其转化为二维数组
        const { rows } = await getEmployeeListAPI({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        // multiHeader定义的复杂类型表头
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        // 需要合并的单元
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        // excel是引入文件导出的方法
        excel.export_json_to_excel({
          // header: ['姓名', '工资'],
          // data: [['张三'],['1000']],
          // filename: '员工工资'
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader,
          merges
        })
      })
    },
    formatJson(headers, rows) {
      var infoArry = []
      rows.forEach((obj) => {
        var arr = []
        Object.keys(headers).forEach((key, index) => {
          // 当找到时间相关数据，将其转化格式
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            arr.push(formatDate(obj[headers[key]]))
          } else if (headers[key] === 'formOfEmployment') {
            const findObj = EmployeeEnum.hireType.find(
              (item) => item.id === parseInt(obj[headers[key]])
            )
            arr.push(findObj ? findObj.value : '未知')
          } else {
            // 其他情况正常渲染
            arr.push(obj[headers[key]])
          }
        })
        console.log(arr)
        infoArry.push(arr)
      })
      console.log(infoArry)
      return infoArry
    },
    showQrcode(url) {
      // 只有url存在 才弹层
      if (url) {
        this.isShowCodeDialog = true
        // 将url地址转化为二维码的方法
        this.$nextTick(() => {
          // 因为异步，弹层并没有出来，找不到myCanvas，所以使用nextTick等待弹层出来以后再转化二维码
          Qrcode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('用户还未上传头像')
      }
    },
    async editRole(id) {
      this.userId = id

      await this.$refs.assignRole.getDetailById(id) // 调用子组件方法
      this.isShowRoleDialog = true
    }
  }
}
</script>

<style>
</style>
