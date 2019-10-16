const mutations = {
  login (state, payload) {
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload
  }, // 登入
  logout (state) {
    localStorage.removeItem('userInfo')
    state.userInfo = {}
  }
}
export default mutations
