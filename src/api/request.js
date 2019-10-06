import axios from 'axios'
import store from '@/store/index.js'
const service = axios.create({
  baseURL: 'api',
  timeout: 15000
})
service.interceptors.response.use(
  function (response) {
    return Promise.resolve(response)
  },
  function (error) {
    const httpErr = {
      hasErr: false,
      status: error.response.status,
      statusText: error.response.statusText
    }
    store.commit('ON_HTTP_ERR', httpErr)
    return Promise.reject(error)
  }
)
export default service
