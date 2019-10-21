const actions = {
  _setToken (context, payload) {
    context.commit('_setToken', payload)
  },
  _removeToken (context) {
    context.commit('_removeToken')
  },
  _setUserInfo (context, payload) {
    context.commit('_setUserInfo', payload)
  },
  _removeUserInfo (context) {
    context.context('_removeUserInfo')
  }
}
export default actions
