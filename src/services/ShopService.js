import Axios from 'axios'

const api_endpoint = "http://localhost:1337"

export default {
  async getItemById(id) {
    try {
      let res = await Axios.get(`${api_endpoint}/items/${id}`)
      return res.data
    } catch(e) {
      console.error(e.response)
    }
  }
}