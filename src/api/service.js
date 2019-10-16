import axios from 'axios'
const service = axios.create({
  baseURL: ''
})
service.interceptors.response.use(
  function (response) {
    return Promise.resolve(response)
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default service
