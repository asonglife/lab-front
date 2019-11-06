const getters = {
  getStorage (state) {
    if (!state.token) {
      state.token = localStorage.getItem('token')
    }
    return state.token
  },
  getUserInfo (state) {
    return state.userInfo
  },
  getExpire (state) {
    if (!state.expire) {
      state.expire = localStorage.getItem('token')
    }
    return state.expire
  }

}
export default getters
