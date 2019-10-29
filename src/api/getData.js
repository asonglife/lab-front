import axios from 'axios'

const getService = axios.create({
  baseURL: ''
})

getService.interceptors.request.use(
  function (request) {
    return Promise.resolve(request)
  },
  function (error) {
    return Promise.reject(error)
  }
)
getService.interceptors.response.use(
  function (response) {
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
