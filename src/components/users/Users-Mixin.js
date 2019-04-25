export default {
  name: 'Users',
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号错误'))
      }
      callback()
    }
    return {
      userList: [],
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      dialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 6, max: 18, message: '密码为6-18个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱必填', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      roleDialogFormVisible: false,
      roleValue: '',
      roleUserName: '',
      roleUserRoleName: '',
      roleUserId: '',
      options: [],
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        email: [
          { required: true, message: '邮箱必填', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async showEditDialogFormVisible (id) {
      this.editDialogFormVisible = true
      // 显示编辑的对话框
      const {
        data: { data, meta }
      } = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      this.editForm = data
    },
    editSubmit () {
      // 编辑的提交
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {
            data: { data, meta }
          } = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success('修改成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('users', { params: this.reqParams })
      if (meta.status !== 200) return this.$message.error('获取用户属性失败')
      this.userList = data.users
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },
    search () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          this.dialogFormVisible = false
          this.getData()
        }
      })
    },
    showDialogForm () {
      this.dialogFormVisible = true
      // setTimeout(() => {
      //   this.$refs.addForm.resetFields()
      // }, 0)
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    delUsers (id) {
      this.$confirm('是否删除该数据？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`users/${id}`)
          if (meta.status !== 200) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    async updateState (id, newState) {
      const {
        data: { meta }
      } = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    },
    async showRoleDialogFormVisible (row) {
      this.roleDialogFormVisible = true
      const {
        data: { data, meta }
      } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
    },
    async changeRole () {
      const {
        data: { meta }
      } = await this.$http.put(`users/${this.roleUserId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleDialogFormVisible = false
      this.getData()
    }
  }
}
