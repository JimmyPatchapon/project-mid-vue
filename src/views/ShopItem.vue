<template>
  <div>
    <img :src="createUrl(item.picture.url)" alt="">
    <h1>{{item.name}}</h1>
    <h2>฿{{item.prices}}</h2>
    Description
    <br>
    <div><i>{{item.details}}</i></div><br>
    <div>
      <span>
        <b-button variant='danger' @click="decrease">-</b-button>
      </span>
      
      <input type="text" v-model="number">
      <span>
        <b-button variant='success' @click="increase">+</b-button>
      </span>
      
    </div>
    <div><strong>In Stock: {{item.quantity}}</strong> </div><br>
    <b-button variant='success' @click="buy()">Buy</b-button>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService'
import ItemStore from '@/store/Item'
import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'
import UserApi from '@/store/UsersApi'
export default {
  data() {
    return {
      id: '',
      item: [],
      number: 1
    }
  },
  async created() {
    this.id = this.$route.params.id
    this.item = await ShopService.getItemById(this.id)
  },
  methods: {
    createUrl(pictureUrl) {
      let api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
      return api_endpoint + pictureUrl
    },
    increase() {
      if(this.number < this.item.quantity)
        this.number++
    },
    decrease() {
      if(this.number > 1)
        this.number--
    },
    async buy() {
      if(this.item.quantity>0 && this.number<this.item.quantity){
        let user = AuthUser.getters.user
        let points = Math.floor(this.item.prices*this.number/100)
        let payload = {
          id: this.id,
          quantity: this.item.quantity - this.number
        }
        let res1 = await ItemStore.dispatch('editItemQuantity', payload)
        let res2 = await ShopService.purchase(this.id, this.number)
        let res3 = await ShopService.receivePoint(this.item.name, points, user)
        this.editPoint(points, user)
        if(res1.success && res2.success && res3.success) {
          this.$swal("Buy Success", this.item.name+" x"+this.number, "success")
          this.$router.push("/")
        } else if(!res1.success) {
          this.$swal("Buy Failed", res1.message, "error")
        } else if(!res2.success) {
          this.$swal("Buy Failed", res2.message, "error")
        } else {
          this.$swal("Buy Failed", res3.message, "error")
        }
      }
      else{
        this.$swal("Buy Failed",this.item.name+" out of stock","error")
      }
      
    },
    async editPoint(amount, user) {
      let payload = {
        id: user.id,
        points: parseInt(user.points) + amount
      }
      await AuthUser.dispatch("editPoint", payload)
    }
  }
}
</script>

<style lang="scss" scoped>
div, h1 {
  text-align: left;
}
img {
  width: 40%;
  float: left;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px;
  margin-right: 50px;
}
span {
  padding: 0px 5px;
}
i,strong{
  font-size: 1.25em;
}
</style>
