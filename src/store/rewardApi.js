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
        add(state, payload) {
            state.data.push(payload)
        },
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
        // editReward({commit}, payload){
        //     let url = api_endpoint + "/rewards/" + payload.id
        //     let body = {
        //         Name_reward: payload.name_reward,
        //         require_points: payload.require_points,
        //     }
        //     let res = await Axios.put(url, body)
        //     console.log(res)
        //     if (res.status === 200) {
        //         console.log("commit('edit')", payload.index, res.data)
        //         commit("edit", payload.index, res.data)
        //     } 
        // }

    },
    modules: {
    }
})