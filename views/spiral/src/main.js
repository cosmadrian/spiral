import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'

Vue.use(VueResource)
Vue.use(VeeValidate)

Vue.http.options.root = 'http://localhost:3000/api'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
