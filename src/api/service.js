import axios from 'axios'
import store from '@/store/index.js'
const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  function (config) {
    if (store.state.token) {
      config.headers.post['token'] = store.state.token
    }
    return Promise.resolve(config)
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  function (response) {
    return Promise.resolve(response)
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default service
