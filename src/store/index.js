import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'
import state from '@/store/state.js'
import actions from '@/store/actions.js'
Vue.use(Vuex)
const store = {
  state,
  mutations,
  actions
}
export default new Vuex.Store(
  store
)
