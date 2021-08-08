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
        
    },
    actions: {
        async fetchEventList({commit}){
            let res = await Axios.get(api_endpoint + "/events")
            commit("fetch", {res})
        },
    },
    
    modules: {
    }
})