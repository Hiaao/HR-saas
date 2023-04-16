<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片card用于包裹 组织架构内容头部 -->
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepartments" />

        <!-- 树形结构 el-tree -->
        <!-- data：获取的数组数据源 props：定义label和children从哪个变量查找 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 插槽内容 会循环多次 有多少节点就循环多少次 -->
          <!-- slot-scope="obj" 作用域插槽，接收传递给插槽的数据 data 每个节点的数据对象 -->
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepartments"
          />
        </el-tree>
      </el-card>
    </div>

    <AddDept :is-show-dialog="isShowDialog" :tree-node="node" @addDepts="getDepartments" @hideDialog="isShowDialog = false" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {}, // 头部的数据
      departs: [], // 存储树形结构的数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      isShowDialog: false, // 控制添加弹出
      node: null // 记录当前所点击的node节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取组织架构数据方法
    async getDepartments() {
      try {
        const result = await getDepartmentsAPI()
        console.log(result)
        this.company = { name: result.companyName, manager: '负责人', id: '' }

        this.departs = tranListToTreeData(result.depts, '')
      } catch (error) {
        console.log(error)
      }
    },
    // 添加部门方法，node当前点击的部门
    addDepartments(node) {
      // 显示弹层
      this.isShowDialog = true
      // 存储所点击的部门
      this.node = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  /* props的 默认为label:'label' 和 children: 'children' */
  padding: 30px 140px;
  font-size: 14px;
}
</style>
