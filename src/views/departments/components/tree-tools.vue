<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentAPI } from '@/api'
export default {
  props: {
    // 传入的树形数据
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 操作节点调用的方法
    operateDepts(type) {
      if (type === 'add') {
        // 新增功能
        // 告诉父组件 弹层打开 还要 告诉父组件 是哪个部门要添加子部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑功能
        // 通知父组件 弹层 并且也要记录编辑哪个部门
        this.$emit('editDepts', this.treeNode) // 触发编辑部门事件
      } else {
        // 删除功能 调用删除接口？？？？？
        // 正常的删除 都得提示
        this.$confirm('确定要删除该部门吗').then(() => {
          // 需要调用删除接口
          return delDepartmentAPI(this.treeNode.id)
        }).then(() => {
          // 进入到then就成功？？？？
          // 只要进入then意味着成功了
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除组织架构成功')
          // 只是将后端数据删除了 前端没有变化
          // 子组件告诉父组件 => 去更新数据
        })
        // elementui的 confirm是一个promise
        // 点击了确定 进入then  点击了catch
      }
    }
  }
}
</script>

<style>
</style>
