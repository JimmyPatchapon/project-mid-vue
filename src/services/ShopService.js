import Axios from 'axios'
import AuthService from '@/services/AuthService'

import AuthUser from "@/store/AuthUser"
const api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"

export default {
  async getItemById(id) {
    try {
      let res = await Axios.get(`${api_endpoint}/items/${id}`)
      return res.data
    } catch(e) {
      console.error(e.response)
    }
  },
  async purchase(itemId, amount) {
    let url = api_endpoint + "/purchases"
    let user = AuthUser.getters.user
    let body = {
      items: itemId,
      Amount: amount,
      users: user.id,
      Date: (new Date()).toISOString().slice(0,10)
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

  async receivePoint(itemName, amount) {
    // 10 bath get 1 point
    let url = api_endpoint + "/point-earns"
    let user = AuthUser.getters.user

    let body ={
      users: user.id,
      detail: "100 Baht get 1 point from buy " + itemName,
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
  }
}