<template>
  <div>
    <a class="card" v-for="(i,index) in items" :key="index"><router-link :to="{name:'ShopItem', params:{id: i.id}}">
      <img :src="createUrl(i.picture.url)" alt="">
      <div>{{i.name}}</div>
      <div>{{i.prices}}</div>
    </router-link></a>
  </div>
</template>

<script>
import ItemStore from '@/store/Item'
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetchItem()
  },
  methods: {
    async fetchItem() {
      await ItemStore.dispatch('fetchItem')
      this.items = ItemStore.getters.items
    },
    createUrl(pictureUrl) {
      let api_endpoint = process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337"
      return api_endpoint + pictureUrl
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}
.card {
  width: 250px;
  display: inline-block;
  background-color: antiquewhite;
  border-radius: 10px;
  margin: 10px;
  padding: 20px 0;
  text-align: center;
}
router-link {
  text-decoration: none;
}
.card div {
  width: 50%;
  display: inline-block;
  text-align: center;
  font-size: 25px;
  color: black;
}
img {
  width: 200px;
  margin-bottom: 10px;
}
.card:hover{
  background-color: rgb(251, 205, 53);
}
</style>