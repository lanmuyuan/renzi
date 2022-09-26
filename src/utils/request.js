// 实现对axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  // 1,考虑把那些数据跑出去
  // 2.接▣成功并且业务成功
  // 3.没有成功Promise.reject跑出错误
  const { data, success, message } = response.data
  if (success) { // 业务逻辑成功
    return data
  } else {
    // 业务逻辑不成功
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
