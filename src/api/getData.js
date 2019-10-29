import axios from 'axios'
import {
  Loading
}
  from 'element-ui'
const getService = axios.create({
  baseURL: ''
})
getService.interceptors.request.use(
  function (request) {
    window.LoadingInstance = Loading.service({
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return Promise.resolve(request)
  },
  function (error) {
    return Promise.reject(error)
  }
)
getService.interceptors.response.use(
  function (response) {
    window.LoadingInstance.close()
    return Promise.resolve(response)
  },
  function (error) {
    return Promise.reject(error)
  }
)
export function getData (apiroute) {
  return getService({
    url: apiroute,
    method: 'get'
  })
}
