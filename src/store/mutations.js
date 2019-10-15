const mutations = {
  ON_HTTP_ERR (state, payload) {
    state.httpErr = payload
  },
  login (state, payload) {
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload
  }, // 登入
  logout (state) {
    localStorage.removeItem('userInfo')
    state.userInfo = {}
  }, // 登出
  adduser (state, payload) {
    state.studentsData = payload
  }
}
export default mutations
