import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'assets/css/reset.css'
import store from '@/store/index.js'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    if (window.localStorage.token) {
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token
      if (token === '' || token === undefined || token === null) {
        next({
          name: 'Login'
        })
        Vue.prototype.$message({
          type: 'error',
          message: '请登录后再访问',
          showClose: true
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    if (new Date().getTime() - store.getters.getExpire >= (store.getters.userInfo.expire - new Date().getTime()) &&
                store.getters.getExpire !== '') {
      store.dispatch('_removeExpire').then(() => {
        router.push('/login')
      })
    } else {
      store.dispatch('_setExpire', new Date().getTime())
    }
  }
})
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
