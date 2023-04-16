<template>
  <el-dialog :title="showTitle" :visible="isShowDialog" @close="btnCancel">
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <!-- native修饰符，可以找到原生的select组件 -->
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="obj in peoples"
            :key="obj.id"
            :value="obj.username"
            :label="obj.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          style="width: 80%"
          placeholder="1-300个字符"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 使用插槽放置按钮 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentByIdAPI, updateDepartmentdAPI } from '@/api'
import {
  getDepartmentsAPI,
  getEmployeeSimpleAPI,
  addDepartmentAPI
} from '@/api'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: true
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 定义自定义表单验证：检查部门名是否有重复,value为 要添加的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 同步获取当前所有部门数据
      const { depts } = await getDepartmentsAPI()
      if (this.formData.id) {
        // 编辑模式
        // 不能和其他的同级部门名字进行重复
        if (depts.filter(obj => obj.pid === this.formData.pid && obj.id !== this.formData.id).some(obj => obj.name === value)) {
          // 找到了
          callback(new Error(`同级部门下已存在${value}`))
        } else {
          // 没找到
          callback()
        }
      } else {
        // 新增模式
        // filter找到所有子部门，some判断是否有同名部门
        const isRepeat = depts
          .filter((obj) => obj.pid === this.treeNode.id)
          .some((obj) => obj.name === value)
        // isRepeat为true 表示找到同名部门
        isRepeat ? callback(new Error(`同级部门下已存在${value}`)) : callback()
      }
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      if (this.formData.id) {
        if (depts.filter(obj => obj.id !== this.formData.id).some((obj) => obj.code === value)) {
          callback(new Error(`已存在编码${value}`))
        } else {
          callback()
        }
      } else {
        const isRepeat = depts.some((obj) => obj.code === value)
        isRepeat ? callback(new Error(`已存在编码${value}`)) : callback()
      }
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称长度为1-50个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码长度为1-50个字符',
            trigger: 'blur'
          },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍长度为1-300个字符',
            trigger: 'blur'
          }
        ]
      },
      peoples: [] // 接收员工名称
    }
  },
  computed: {
    showTitle() {
      // 根据id判断是否为编辑状态
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 获取员工简单信息
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimpleAPI()
    },
    // 确定按钮
    btnOK() {
      this.$refs.formData.validate(async(isOK) => {
        if (isOK) {
          // 判断属于编辑状态还是新增状态
          if (this.formData.id) {
            // 编辑
            await updateDepartmentdAPI(this.formData)
          } else {
            // 新增
            // 校验成功，添加子部门，子部门的pid为所点击的部门的id
            await addDepartmentAPI({ ...this.formData, pid: this.treeNode.id })
          }
          // 从新渲染页面数据
          this.$emit('addDepts')
          this.$message.success('添加子部门成功')
          this.$emit('hideDialog')
        }
      })
    },
    // 取消按钮
    btnCancel() {
      // 当编辑时会获取到部门的id，但是关闭并不能重置，所以需要手动将fromdata数据变为空
      this.formData = {
        name: '',
        code: '',
        mannager: '',
        introduce: ''
      }
      // 隐藏弹层
      this.$emit('hideDialog')
      // 清除校验
      this.$refs.formData.resetFields()
    },
    // 根据id获取部门详情方法
    async getDepartmentById(id) {
      // 通过形参传值防止异步，this.treeNode.id 得不到结果
      this.formData = await getDepartmentByIdAPI(id)
    }
  }
}
</script>

<style>
</style>
