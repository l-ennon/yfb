import Vue from 'vue'
import fastClick from 'fastclick'

import router from './router'
import store from './store'
import App from './App'

fastClick.attach(document.body)

Vue.config.productionTip = false
Vue.config.performance = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
