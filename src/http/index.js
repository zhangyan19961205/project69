// 导出一个配置好的axios
import axios from 'axios'

// 全局使用必须依赖vue 在main.js中使用
// baseURL配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(res => {
  if (res.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return res
  }
})

// 导出axios
export default axios
