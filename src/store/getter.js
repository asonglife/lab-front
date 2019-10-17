const getters = {
  getStorage (state) {
    if (!state.token) {
      state.token = JSON.stringify(localStorage.getItem('token'))
    }
    return state.token
  },
  getuserStatus (state) {
    return state.isManager
  }

}
export default getters
