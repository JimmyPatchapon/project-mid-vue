import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSwal from 'vue-swal'
import VueAxios from 'vue-axios'
import axios from 'axios'



Vue.use(VueAxios, axios)
Vue.use(VueSwal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
