import Vue from "vue"
import Vuex from "vuex"
import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters:{
        rewards: (state) => state.data
    },
    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        add(state, payload) {
            state.data.push(payload)
        },
        edit(state, index, data) {
            state.data[index] = data
        }
    },
    actions: {
        async fetchReward({commit}){
            let res = await Axios.get(api_endpoint + "/rewards")
            commit("fetch", {res})
        },
        async addReward( { commit }, payload)
        {
            let res = await Axios.post(api_endpoint + "/rewards", payload)
            if (res.status === 200)
                commit("add" , { res })
                return { success: true }
        },
        async editReward({commit}, payload){
            let url = `${api_endpoint}/rewards/${payload.id}`
            let body = {
                name_reward: payload.name_reward,
                require_points: payload.require_points
            }
            try {
                let headers = AuthService.getApiHeader()
                let res = await Axios.put(url, body, headers)
                if(res.status === 200) {
                  commit("edit", payload.id-1, res.data)
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
                    message: "Unknown error: " + e.response.data.message
                  }
                }
              }
        },
        async deleteRewaed({commit}, payload) {
          try {
            let headers = AuthService.getApiHeader()
            let res = await Axios.delete(`${api_endpoint}/rewards/${payload.id}`,headers)
            if(res.status === 200) {
              let res = await Axios.get(api_endpoint + "/rewards")
              commit("fetch", {res})
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
                message: "Unknown error: " + e.response.data.message
              }
            }
          }
        }

    },
    modules: {
    }
})