import Vue from 'vue'
import Axios from 'axios'
import Vuex from 'vuex'
import AuthService from "../services/AuthService"

let api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data: [],
  },
  getters:{
      users: (state) => state.data,
  },
  mutations: {
      fetch(state, { res }) {
          state.data = res.data
      },
      add(state, payload) {
          state.data.push(payload)
      },
      edit(state, index, data) {
          state.data[index] = data
      },
  },
  actions: {
    async fetchUsers( { commit }){
        let header = AuthService.getApiHeader()
        let res = await Axios.get(api_endpoint + "/users", header)
        commit("fetch", { res })
    },
    async fetchAuthenticated( { commit }){
        let header = AuthService.getApiHeader()
        let res = await Axios.get(api_endpoint + "/users?role.name=Authenticated", header)
        commit("fetch", { res })
    },
    async editPoint({commit}, payload) {
        let url = api_endpoint + "/users/" + payload.id
        let body = {
            points: payload.points
        }
        try {
            let headers = AuthService.getApiHeader()
            let res = await Axios.put(url, body, headers)
            if(res.status === 200) {
              commit("edit", 0, res.data)
              console.log(res.data);
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
            if(e.response.status === 403) {
              console.error(e.response.data.message)
              return {
                success: false,
                message: e.response.data.message
              }
            } else {
              return {
                success: false,
                message: "Unknown error: " + e.response.data
              }
            }
          }
    }
  },
  modules: {
  }
})
