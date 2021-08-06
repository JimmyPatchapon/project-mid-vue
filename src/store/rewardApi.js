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
        rewards: (state) => state.data
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
        async fetchReward({commit}){
            let res = await Axios.get(api_endpoint + "/rewards")
            
            commit("fetch", {res})
        }
    },
    
    modules: {
    }
})