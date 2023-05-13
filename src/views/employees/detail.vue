<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登陆账户设置">
            <el-form
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  type="password"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailByid">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${id}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <UserInfo /> -->
            <!-- vuejs中内置的组件 component 可以引入任何组件，改变变量的组件名可以实现切换组件 -->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${id}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetailByIdAPI, saveUserDetailByidAPI } from '@/api'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      UserComponent: 'UserInfo',
      id: this.$route.params.id, // 通过查询字符串id得到id值
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDetailByid()
  },
  methods: {
    async getDetailByid() {
      this.userInfo = await getDetailByIdAPI(this.id)
    },
    async saveUserDetailByid() {
      await saveUserDetailByidAPI({ ...this.userInfo, password: this.userInfo.password2 })
      this.$message.success('修改用户信息成功')
    }
  }
}
</script>

<style>
</style>
