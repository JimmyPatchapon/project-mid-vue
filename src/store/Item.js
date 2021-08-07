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
    items: (state) => state.data
  },
  mutations: {
    fetch(state, {res}) {
      state.data = res.data
    },
    edit(state, index, data) {
      state.data[index] = data
    }
  },
  actions: {
    async fetchItem({commit}) {
      let res = await Axios.get(api_endpoint + "/items")
      commit('fetch', {res})
    },
    async editItemQuantity({commit}, payload) {
      let url = api_endpoint + "/items/" + payload.id
      let body = {
        quantity: payload.quantity
      }
      try {
        let headers = AuthService.getApiHeader()
        let res = await Axios.put(url, body, headers)
        if(res.status === 200) {
          commit("edit", payload.index, res.data)
          return {
            success: true,
            data: res.data
          }
        } else {
          console.error(res)
          return {
            success: false,
            message: "Unknown status code: " + res.status
          }
        }
      } catch(e) {
        if(e.response.satus === 403) {
          console.error(e.response.data.message)
          return {
            success: false,
            message: e.response.data.message
          }
        } else {
          return {
            success: false,
            message: "Unknown error: " + e.response.data.message
          }
        }
      }
    }
  },
  modules: {
  }
})
