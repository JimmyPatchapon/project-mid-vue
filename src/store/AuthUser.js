import Vue from "vue"
import Vuex from "vuex"
import AuthService from "@/services/AuthService"

Vue.use(Vuex)

let auth_key = 'auth-user'
let auth = JSON.parse(localStorage.getItem(auth_key))

const intitialState = {
    user:auth ? auth.user:"",
    jwt:auth ? auth.jwt:"",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
    state:intitialState,
    mutation:{
        loginSuccess(state, user, jwt){
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
        },
        logoutSuccess(state){
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        }
    },
    actions:{
        async login({commit}, {email, password}){
            let res = await AuthService.login({email, password})
            if(res.succes){
                commit('loginSuccess', res.user, res.jwt)
            }
            return res
        },
        logout(){
            AuthService.logout()
            this.commit('logoutSuccess')
        }
    },
    getters:{
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen
    },
    modules:{}
})