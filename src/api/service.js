import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'
import Vue from 'vue'
const service = axios.create({
  baseURL: ''
})
service.interceptors.request.use(
  function (config) {
    if (store.state.token !== null && store.state.token !== '' && store.state.token !== undefined) {
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
    if (response.headers.token === '11' || response.headers.token === '12' || response.headers.token === '13') {
      store.dispatch('_removeExpire').then(() => {
        router.push('/login')
      })
    }

    return Promise.resolve(response)
  },
  function (error) {
    Vue.prototype.$message({
      type: 'error',
      message: error,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
