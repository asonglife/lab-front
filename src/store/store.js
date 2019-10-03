import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  httpErr: {
    hasErr: false,
    status: '',
    statusText: ''
  }
}
const mutations = {
  ON_HTTP_ERR (state, payload) {
    state.httpErr = payload
  }
}
export default new Vuex.Store(
  state, mutations
)
