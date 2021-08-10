import Vue from "vue"
import Vuex from "vuex"
import Axios from "axios"
import AuthService from "@/services/AuthService"

const api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters:{
        events: (state) => state.data
    },
    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        edit(state, index, data) {
            state.data[index] = data
        },
        add(state, payload) {
            state.data.push(payload)
        },
         
    },
    actions: {
        async fetchEventList({commit}){
            let res = await Axios.get(api_endpoint + "/events")
            commit("fetch", {res})
        },
        async buttonDisable({commit}, payload){
            let url = api_endpoint + "/events/" + payload.id
            let body = {
                event_name: payload.event_name,
                earn_point: payload.earn_point,
                button: payload.button
            }
            try {
                let headers = AuthService.getApiHeader()
                let res = await Axios.put(url, body, headers)
                if(res.status === 200) {
                    commit("edit", payload.id, res.data)
                    return {
                        success: true,
                        data: res.data
                    }
                }else {
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
        },
        async editEvent({commit}, payload){
            let url = `${api_endpoint}/events/${payload.id}`
            let body = {
                event_name: payload.event_name,
                earn_point: payload.earn_point,
                total: parseInt(payload.total),
                button: payload.button
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
        async deleteEvent({commit}, payload) {
            try {
              let headers = AuthService.getApiHeader()
              let res = await Axios.delete(`${api_endpoint}/events/${payload.id}`,headers)
              if(res.status === 200) {
                let res = await Axios.get(api_endpoint + "/events")
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