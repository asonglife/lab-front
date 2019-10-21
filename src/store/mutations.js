const mutations = {
  _setToken (state, payload) {
    localStorage.setItem('token', JSON.stringify(payload))
    state.token = payload
  },
  _removeToken (state) {
    localStorage.removeItem(state.token)
  },
  _setUserInfo (state, payload) {
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload
  },
  _removeUserInfo (state) {
    localStorage.removeItem(state.userInfo)
  }
}
export default mutations
