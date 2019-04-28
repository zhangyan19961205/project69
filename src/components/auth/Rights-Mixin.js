export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.rightsList = data
      console.log(data)
    }
  }
}
