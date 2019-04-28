<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button icon="iconfont icon-shouqi"
                 @click="toggleMenu()"
                 size="mini"
                 circle></el-button>
      <span class="title">品优购后台管理系统</span>
      <el-button class="logout"
                 type="danger"
                 size="mini"
                 round
                 @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="home_aside"
                :width="collapse?'65px':'180px'">
        <el-menu :default-active="$route.name"
                 router
                 :unique-opened="true"
                 :collapse="collapse"
                 :collapse-transition="false"
                 style="border: none; margin-top: 5px"
                 background-color="#333744"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu :index="item.id.toString()"
                      v-for="(item,i) in menus"
                      :key="item.id">
            <template slot="title">
              <!-- <i class="iconfont icon-yonghu"></i> -->
              <i :class="['iconfont',iconArr[i]]"></i>
              <span>&nbsp;{{item.authName}}</span>
            </template>
            <el-menu-item :index="lastItem.path"
                          v-for="lastItem in item.children"
                          :key="lastItem.id">
              <!-- <i class="el-icon-menu"></i> -->
              <i class="iconfont icon-canshu"></i>
              &nbsp;{{lastItem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      menus: [],
      iconArr: ['icon-authority', 'icon-lock', 'icon-dingdanguanli5', 'icon-shangpinfenlei', 'icon-canshu2']
    }
  },
  mounted () {
    // 获取菜单数据
    this.getData()
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    async getData () {
      // 获取数据
      // this.$http.get('menus').then(res => console.log(res.data))
      const { data: { data, meta } } = await this.$http.get('menus')
      // console.log(data, meta)
      if (meta.status !== 200) return this.$message.error('获取菜单失败')
      this.menus = data
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home_container {
  height: 100%;
}
.home_header {
  background: #373d41;
  line-height: 60px;
}
.home_aside {
  background: #333744;
}
.home_main {
  /* background: #eaedf1; */
  background: #ffffff;
}
.title {
  color: #ccc;
  font-size: 18px;
  padding-left: 20px;
}
.logout {
  float: right;
  margin-top: 15px;
}
</style>
