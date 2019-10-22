const getters = {
  getStorage (state) {
    if (!state.token) {
      state.token = localStorage.getItem('token')
    }
    return state.token
  },
  getUserStatus (state) {
    return state.isManager
  },
  getUserInfo (state) {
    return state.userInfo
  }

}
export default getters