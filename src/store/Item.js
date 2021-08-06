import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    items: (state) => state.data
  },
  mutations: {
    fetch(state, {res}) {
      state.data = res.data
    }
  },
  actions: {
    async fetchItem({commit}) {
      let res = await Axios.get(api_endpoint + "/items")
      commit('fetch', {res})
    }
  },
  modules: {
  }
})
