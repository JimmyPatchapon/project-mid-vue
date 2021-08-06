<template>
  <div>
    <img :src="createUrl(item.picture.url)" alt="">
    <h1>{{item.name}}</h1>
    <h2>฿{{item.prices}}</h2>
    <div>{{item.details}}</div><br>
    <div>
      <button @click="decrease">-</button>
      <input type="text" v-model="number">
      <button @click="increase">+</button>
    </div>
    <div>in stock: {{item.quantity}}</div><br>
    <button>Buy</button>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService'
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
      return "http://localhost:1337" + pictureUrl
    },
    increase() {
      if(this.number < this.item.quantity)
        this.number++
    },
    decrease() {
      if(this.number > 1)
        this.number--
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
</style>