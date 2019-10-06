const mutations = {
  ON_HTTP_ERR (state, payload) {
    state.httpErr = payload
  },
  login (state, payload) {
    state.user = payload
    localStorage.setItem('userInfo', JSON.stringify(payload))
  }, // 登入
  logout (state) {
    state.user = undefined
  } // 登出
}
export default mutations
