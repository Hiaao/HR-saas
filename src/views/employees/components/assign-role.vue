<template>
  <el-dialog title="分配角色" :visible="isShowRoleDialog" @close="btnCancel">
    <!-- 多选框组 -->
    <el-checkbox-group v-model="roleIds">
      <!-- label充当存储值 -->
      <el-checkbox v-for="obj in list" :key="obj.id" :label="obj.id">
        {{ obj.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleListAPI, getDetailByIdAPI, assignRoleAPI } from '@/api'
export default {
  props: {
    isShowRoleDialog: {
      type: Boolean,
      default: false
    },
    // 根据id获取当前用户的角色
    userId: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储所有的角色id
      roleIds: [] // 负责存储用户拥有的角色id
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleListAPI({ page: 1, pagesize: 20 }) // 默认取十条数据
      this.list = rows
    },
    // userId为异步，通过形参才能得到id
    async getDetailById(id) {
      const { roleIds } = await getDetailByIdAPI(id)
      this.roleIds = roleIds
    },
    async btnOK() {
      await assignRoleAPI({ id: this.userId, roleIds: this.roleIds })
      // 关闭弹层
      this.$parent.isShowRoleDialog = false
    },
    btnCancel() {
      // 关闭弹层
      this.roleIds = [] // 关闭则还原数组
      this.$parent.isShowRoleDialog = false
    }
  }
}
</script>

<style>
</style>
