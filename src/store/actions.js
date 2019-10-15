const actions = {
  login (context, payload) {
    context.commit('login', payload)
  },
  logout (context) {
    context.commit('logout')
  },
  adduser (context, payload) {
    context.commit('adduser', payload)
  }
}
export default actions
