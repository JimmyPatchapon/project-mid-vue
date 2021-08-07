import Vue from "vue"
import Vuex from "vuex"
import Axios from "axios"

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
    },
    actions: {
        async fetchEventList({commit}){
            let res = await Axios.get(api_endpoint + "/events")
            commit("fetch", {res})
        },
        async editButton({ commit }, payload) {
            let url = api_endpoint + "/events/" + payload.id
            let body = {
              id: payload.id,
              claim_button: payload.claim_button,
            }
            let res = await Axios.put(url, body)
            if (res.status === 200) {
              console.log("commit('edit')", payload.index, res.data)
              commit("edit", payload.index, res.data)
            } else {
              console.err(res)
            }
        },
    },
    
    modules: {
    }
})