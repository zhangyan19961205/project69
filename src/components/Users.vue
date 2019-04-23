<template>
  <div class="users_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 和 添加按钮-->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary"
                     plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="userList"
                stripe
                style="width: 100%">
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>
        <el-table-column prop="mg_state"
                         label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       active-color="#13ce66"
                       inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column>
          <el-button-group>
            <el-button icon="el-icon-edit"
                       round></el-button>
            <el-button icon="el-icon-delete"
                       round></el-button>
            <el-button icon="el-icon-setting"
                       round></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
      <div class="pager_container">
        <el-pagination @current-change="changePager"
                       :page-size="reqParams.pagesize"
                       background
                       layout="prev,pager,next"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      userList: [],
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const { data: { data, meta } } = await this.$http.get('users', { params: this.reqParams })
      if (meta.status !== 200) return this.$message.console.error(('获取用户属性失败'))
      this.userList = data.users
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
