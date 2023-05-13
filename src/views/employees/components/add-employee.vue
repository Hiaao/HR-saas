<template>
  <el-dialog title="新增员工" :visible="isShowDialog" @close="btnCancel">
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="username" label="姓名">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择聘用形式"
        >
          <el-option
            v-for="obj in EmployeeEnum.hireType"
            :key="obj.id"
            :label="obj.value"
            :value="obj.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <!-- 放置一个树形组件 -->
        <el-tree
          v-if="isShowTree"
          v-loading="loading"
          :default-expand-all="true"
          :data="treeData"
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item
        prop="correctionTime"
        label="转正时间"
      >
        <el-date-picker v-model="formData.correctionTime" placeholder="请选择转正时间" style="width: 50%" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, addEmployeeAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
export default {
  name: 'AddEmployee',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 将引入的数据，变为data中的数据，就可以在文本中引入其数据
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门名称不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '转正时间不能为空', trigger: 'blur' }
        ]
      },
      treeData: [], // 接收树形结构
      isShowTree: false,
      loading: false // 加载部门的进度条
    }
  },
  methods: {
    async getDepartments() {
      this.loading = true
      this.isShowTree = true
      const { depts } = await getDepartmentsAPI()
      // depts为一个数组，需要转化成树形结构，才能被 el-tree显示
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 移除校验
      // update:props名称 可以在父组件直接用sync修饰符处理
      this.$emit('update:isShowDialog', false)
    },
    async btnOK() {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployeeAPI(this.formData)
        // 通知父组件，更新数据
        // this.$parent 父组件的实例，当子组件在根级div下时可用
        this.$parent.getEmployeeList && this.$parent.getEmployeeList() // 直接调用父组件的更新方法
        this.$parent.isShowDialog = false
        this.$message.success('添加员工成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
