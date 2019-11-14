const mutations = {
  _setToken (state, payload) {
    localStorage.setItem('token', payload)
    state.token = payload
  },
  _setUserInfo (state, payload) {
    localStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload
  },
  _setExpire (state, payload) {
    state.expire = payload
    localStorage.setItem('expire', payload)
  },
  _removeExpire (state) {
    state.expire = ''
    state.token = ''
    state.userInfo = {}
    localStorage.clear()
  },
  _setArticles (state, payload) {
    state.articles = payload
  },
  _removeArticles (state) {
    state.articles = {}
  }
}
export default mutations
