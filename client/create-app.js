/**
 * static-data-shop: create-app.js
 * Description: 存放每次不同的渲染app,防止在Node端内存溢出
 * Author: cdluzhichao
 * Contact: cdluzhichao@jd.com
 * Time: 2018/11/8
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
