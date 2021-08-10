import Vue from "vue"
import Vuex from "vuex"
import AuthService from "@/services/AuthService"

Vue.use(Vuex)

const auth_key = "auth-user"
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : '',
    isAuthen: auth ? true: false,
    isAdmin: auth ? true: false
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        async loginSuccess (state,user,jwt)
        {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
            state.isAdmin = user.role.name === "Administration"
            console.log(state.user);
        },
        logoutSuccess (state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
            state.isAdmin = false
        }
    },
    actions: {
        async login({ commit }, {email, password})
        {
            let res = await AuthService.login({ email, password })
            if (res.success){
                commit("loginSuccess",res.user,res.jwt)
            }
            return res
        },
        async logout({ commit }) {
            AuthService.logout()
            commit("logoutSuccess")
        },
        async register ({ commit }, {username, email, password })
        {
            let res = await AuthService.register({username,email,password})
            if (res.success) {
                commit("loginSuccess",res.user,res.jwt)
            }
            return res
        },
        async editPoint({commit}, payload){
            let res = await AuthService.update(payload)
            if(res.success){
                commit("loginSuccess",res.user,res.jwt)
            }
            return res
        }
        
    },
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
        isAdmin: (state) => state.isAdmin,

    },
    modules: {},
})