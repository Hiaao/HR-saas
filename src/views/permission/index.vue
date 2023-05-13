<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <PageTools>
        <el-button
          slot="after"
          type="primary"
          @click="addPermission(1, '0')"
        >添加权限</el-button>
      </PageTools>
      <!-- table使用树形必须指定row-key唯一的标识 -->
      <el-table :data="list" border row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 最多只能有两层树形，当type为1，代表为第一层，最多只能再第一层添加子级 -->
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPermission(2, row.id)"
            >添加</el-button>
            <el-button
              type="text"
              @click="editPermission(row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              @click="delPerrmission(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑弹层 -->
    <el-dialog :title="showText" :visible="isShowDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :rules="rules"
        :model="formData"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <!-- 通过属性指定不激活为"0" 激活为"1" -->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListAPI,
  addPermissionAPI,
  updatePermissionAPI,
  delPermissionAPI,
  getPermissionDetailAPI
} from '@/api'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      isShowDialog: false, // 新增编辑弹层控制
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, tregger: 'blur', message: '名称不能为空' }],
        code: [{ required: true, tregger: 'blur', message: '标识不能为空' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      // 通过tranListToTreeData方法将数据转化为树形数据
      this.list = tranListToTreeData(await getPermissionListAPI(), '0')
    },
    async delPerrmission(id) {
      try {
        await this.$confirm('确认删除该权限点吗')
        await delPermissionAPI(id)
        this.getPermissionList() // 重新获取最新数据
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    addPermission(type, pid) {
      // 访问权(第一层)type=1 控制权(第二层)type=2
      this.formData.type = type
      // pid判断新增的为父还是子节点
      this.formData.pid = pid
      this.isShowDialog = true
    },
    btnOK() {
      this.$refs.perForm
        .validate()
        .then(async() => {
          if (this.formData.id) {
            // 有id为编辑
            await updatePermissionAPI(this.formData)
          } else {
            // 无id为新增
            // 检验成功，新增
            await addPermissionAPI(this.formData)
          }
        })
        .then(() => {
          this.$message.success('操作成功')
          this.getPermissionList()
          this.isShowDialog = false
        })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields() // 移除校验
      this.isShowDialog = false
    },
    async editPermission(id) {
      this.formData = await getPermissionDetailAPI(id) // 根据id获取当前详情
      this.isShowDialog = true
    }
  }
}
</script>

<style>
</style>
