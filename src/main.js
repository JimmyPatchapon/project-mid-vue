import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import VueAxios from 'vue-axios'
import VueSwal from 'vue-swal'

Vue.use(VueAxios, Axios)
Vue.use(VueSwal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
