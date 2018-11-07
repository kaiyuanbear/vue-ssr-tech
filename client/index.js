import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createRouter from 'config/router'
import createStore from './store/store'
import App from './app.vue'
// import './assets/styles/test.css'
// import './assets/styles/test.styl'
import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  // if (to.fullPath === '/app') {
  //   next('/login')
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#root')
