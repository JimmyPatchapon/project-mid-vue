import Axios from 'axios'
import AuthService from '@/services/AuthService'
import AuthUser from '../store/AuthUser'

const api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

export default {
  async earnPoint(Name, amount) {
    let url = api_endpoint + "/point-earns"
    let user = AuthUser.getters.user
    let body = {
      users: user.id,
      detail: "Earn point with event: " + Name,
      amount: amount,
      date: (new Date()).toISOString().slice(0,10)
    }
    try {
      let headers = AuthService.getApiHeader()
      let res = await Axios.post(url, body, headers)
      if(res.status === 200) {
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
      if(e.response.satus === 403) {
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
  async getEventById(id) {
    try {
        let res = await Axios.get(`${api_endpoint}/events/${id}`)
        return res.data
    } catch(e) {

    }
  }
}