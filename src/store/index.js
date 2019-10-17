import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations.js'
import state from '@/store/state.js'
import actions from '@/store/actions.js'
import getters from '@/store/getter.js'
Vue.use(Vuex)
const store = {
  state,
  mutations,
  actions,
  getters
}
export default new Vuex.Store(
  store
)
