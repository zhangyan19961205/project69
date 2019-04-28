export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      // 添加相关的数据
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          { required: true, $message: '角色名称必填', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, $message: '角色描述必填', trigger: 'blur' }
        ]
      },
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        roleName: [
          { required: true, message: '角色名称必填', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色名称必填', trigger: 'blur' }
        ]
      },
      rightDialogFormVisible: false,
      rightTree: [],
      rightCheckedList: [],
      // 分配权限角色ID
      rightRoleId: null,
      defaultProps: {
        // 数据结构中 下一级数据的字段名称
        children: 'children',
        // 显示的文字  的数据字段的名称
        label: 'authName'
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async showRightDialog (row) {
      // this.rightDialogFormVisible = true
      const {
        data: { data, meta }
      } = await this.$http.get('rights/tree')
      if (meta.status !== 200) return this.$message.error('获取所有权限失败')
      this.rightTree = data
      const arr = []
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      this.rightCheckedList = arr
      this.rightDialogFormVisible = true
      this.rightRoleId = row.id
    },
    async rightSubmit () {
      const treeDom = this.$refs.tree
      const checkedArr = treeDom.getCheckedKeys()
      const halfCheckArr = treeDom.getHalfCheckedKeys()
      const arr = [...checkedArr, ...halfCheckArr]
      const {
        data: { meta }
      } = await this.$http.post(`roles/${this.rightRoleId}/rights`, {
        rids: arr.join(',')
      })
      if (meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.rightDialogFormVisible = false
      this.getData()
    },
    delRights (row, rightId) {
      this.$confirm('是否删除该权限？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data, meta }
          } = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
          if (meta.status !== 200) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          data.forEach(item => {
            item.child = item.children
            delete item.children
            item.child.forEach(item => {
              item.child = item.children
              delete item.children
            })
          })
          row.child = data
        })
        .catch(() => {})
    },
    showEditDialog (role) {
      this.editDialogFormVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {
          data: { data, meta }
        } = await this.$http.get(`roles/${role.id}`)
        if (meta.status !== 200) return this.$message.error('获取角色失败')
        this.editForm = data
      })
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑角色失败')
          this.$message.success('编辑角色成功')
          this.editDialogFormVisible = false
          this.getData()
        }
      })
    },
    delRoles (id) {
      this.$confirm('是否删除该数据？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { meta }
          } = await this.$http.delete(`roles/${id}`)
          if (meta.status !== 200) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {
            data: { meta }
          } = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          this.addDialogFormVisible = false
          this.getData()
        }
      })
    },
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.rolesList = data
    }
  }
}
