import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'

let api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    coupon: (state) => state.data,
  },
  mutations: {
    fetch(state, {res}) {
      state.data = res.data
    },
    add(state, payload) {
        state.data.push(payload)
    },
  },
  actions: {
    async fetchCoupon({commit}) {
        let header = AuthService.getApiHeader()
      let res = await Axios.get(api_endpoint + "/discounts",header)

      commit('fetch', {res})
    },
  },
  modules: {
  }
})
