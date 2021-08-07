import  Axios from 'axios'
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""
const auth_key="auth-user"
let auth = JSON.parse(localStorage.getItem(auth_key))
const api_endpoint= process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

export default{
    isAuthen(){
        return user !== "" && jwt !== ""
    },
    
    getUser(){
        return user
    },
    getJwt(){
        return jwt
    },
    async login({email, password}){
        try{
            // let url = api_endpoint + '/auth/local'
            let url = `${api_endpoint}/auth/local`
            let body = {
                identifier: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if(res.status === 200){
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                console.log("success")
                return{
                    succes: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else{
                return{
                    succes:false,
                    message: "Unknown status code " + res.status
                }
            }
        } catch (e){
            if(e.response.status === 400){
                return{
                    succes:false,
                    message: e.response.data.massage[0].massages[0].massage
                }
            }
            else{
                return{
                    succes: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },
    logout(){
        localStorage.removeItem(auth_key)
    },
}
