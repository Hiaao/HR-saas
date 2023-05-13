<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 角色管理内容 -->
            <!-- 新增按钮 -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="isDialogShow = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <!-- 绑定数据 -->
            <el-table border :data="list">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="角色名"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <!-- 作用域插槽 -->
                <!-- slot-scope结构出row(当前行) 得到id数据 -->
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPerm(row.id)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 公司信息内容 -->
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="formData.companyPhone"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层组件 -->
    <el-dialog title="编辑角色" :visible="isDialogShow" @close="closeBtn()">
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 500px" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" style="width: 500px" />
        </el-form-item>
      </el-form>
      <!-- 插槽放置按钮 -->
      <el-row type="flex" justify="center" align="center">
        <el-col :span="6">
          <el-button size="small" @click="closeBtn">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分配权限弹层 -->
    <el-dialog :visible="isShowPermDialog" title="权限分配" @close="btnPermCancel">
      <el-tree
        ref="permTree"
        node-key="id"
        :default-checked-keys="selectCheck"
        :show-checkbox="true"
        :check-strictly="true"
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnPermCancel">取消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="btnPermOK"
          >确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleListAPI,
  getCompanyInfoAPI,
  deleteRoleAPI,
  getRoleDetailAPI,
  updateRoleAPI,
  addRoleAPI,
  getPermissionListAPI,
  assignPermAPI
} from '@/api'
import { tranListToTreeData } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      list: [], // 承接数组
      // 相关的页码数据
      page: {
        page: 1,
        pagesize: 10,
        total: 0 // 默认总数
      },
      formData: {},
      isDialogShow: false,
      isShowPermDialog: false,
      userId: null,
      selectCheck: [], // 记录当前权限点
      // 编辑表单的数据和校验规则
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '角色名不能为空' }]
      },
      permData: [], // 接收权限数据
      defaultProps: { label: 'name' } // 定义树形显示的名称和子组件的名称
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleListAPI(this.page)
      this.page.total = total
      this.list = rows
    },
    // 换页效果
    changePage(newPage) {
      // 将当前页码赋值给当前最新页码
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfoAPI(this.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        // 只有点击确定才能进入下面的代码
        await deleteRoleAPI(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetailAPI(id)
      this.isDialogShow = true
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        // 通过校验后
        if (this.roleForm.id) {
          // 有id为编辑
          await updateRoleAPI(this.roleForm)
        } else {
          // 无id为新增
          await addRoleAPI(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.isDialogShow = false // 关闭弹层会执行form表单的close事件
      } catch (error) {
        console.log(error)
      }
    },
    closeBtn() {
      this.isDialogShow = false
      this.roleForm = {
        name: '',
        description: ''
      }
      // 充值校验规则和表单值
      this.$refs.roleForm.resetFields()
    },
    async assignPerm(id) {
      // 获取权限列表
      this.permData = tranListToTreeData(await getPermissionListAPI(), '0')
      this.userId = id

      // 获取当前角色拥有的权限点数据
      const { permIds } = await getRoleDetailAPI(id)
      this.selectCheck = permIds
      this.isShowPermDialog = true
    },
    btnPermCancel() {
      this.isShowPermDialog = false
      this.selectCheck = []
    },
    async btnPermOK() {
      // 需要获取permIds，调用接口，通过tree组件的方法获取到
      const permIds = this.$refs.permTree.getCheckedKeys()
      console.log(permIds)
      await assignPermAPI({ permIds: permIds, id: this.userId })

      this.$message.success('修改权限成功')
      this.isShowPermDialog = false
    }
  }
}
</script>

<style>
</style>
