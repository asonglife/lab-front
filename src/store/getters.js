const getters = {
  getStorage (state) {
    if (!state.token) {
      state.token = localStorage.getItem('token')
    }
    return state.token
  },
  getUserInfo (state) {
    return state.userInfo
  }

}
export default getters
