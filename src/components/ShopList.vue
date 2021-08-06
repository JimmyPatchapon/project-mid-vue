<template>
  <div>
    <a class="card" v-for="i in items" :key="i"><router-link :to="{name:'ShopItem', params:{name: i}}">
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
      return "http://localhost:1337" + pictureUrl
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
}
img {
  width: 200px;
}
</style>