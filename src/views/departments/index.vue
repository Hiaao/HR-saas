<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片card用于包裹 组织架构内容头部 -->
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <!-- 左侧内容 -->
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <!-- 右侧内容 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu>
                    <el-dropdown-item>添加部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构 el-tree -->
        <!-- data：获取的数组数据源 props：定义label和children从哪个变量查找 -->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 插槽内容 会循环多次 有多少节点就循环多少次 -->
          <!-- slot-scope="obj" 作用域插槽，接收传递给插槽的数据 data 每个节点的数据对象 -->
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%"
          >
            <!-- 左侧内容 -->
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 -->
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu>
                      <!-- 下拉选项 -->
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
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
