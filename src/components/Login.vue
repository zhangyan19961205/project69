<template>
  <div class="login_container">
    <div class="box">
      <img src="../assets/images/logo.png"
           alt="">
      <!-- <span class="iconfont icon-dengluyonghuming"></span> -->
      <el-form ref="form"
               :model="form"
               :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-dengluyonghuming"
                    placeholder="请输入用户名"
                    v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-authority"
                    type="password"
                    placeholder="请输入密码"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary"
                     @click="submit()">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          },
          {
            min: 6, max: 18, message: '密码长度为6-18个字符', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // this.$http.post('login', this.form).then(res => {
          //   console.log(res)
          // })
          const { data: { data, meta } } = await this.$http.post('login', this.form)
          if (meta.status !== 200) return this.$message.error(meta.msg || '登录失败')
          // 登录成功
          // 保存token  sessionStorage
          sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ccc, #102663e5);
}
.login_container .box {
  width: 400px;
  height: 250px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  border-radius: 4px;
  background: linear-gradient(45deg, #d2ecf1, #efefef);
  padding: 0 20px;
  box-sizing: border-box;
}
.login_container .box img {
  width: 200px;
  display: block;
  margin: 15px auto;
}
.login_container .box .login_btn {
  padding: 3% 30%;
}
</style>
