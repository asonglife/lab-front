const actions = {
  _setToken (context, payload) {
    context.commit('_setToken', payload)
  },
  _setUserInfo (context, payload) {
    context.commit('_setUserInfo', payload)
  },
  _setExpire (context, payload) {
    context.commit('_setExpire', payload)
  },
  _removeExpire (context) {
    context.commit('_removeExpire')
  }
}
export default actions
