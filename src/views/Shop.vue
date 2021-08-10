<template>
  <div>
    <br><br><br>
    <b-container>
      <b-row align-v='center'> 
        <shop-list v-for="(item,index) in this.items" :key='index' 
        :name='item.name' :src='createUrl(item.picture.url)' :id='item.id'
        :msg='item.prices'></shop-list>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ShopList from '@/components/ShopList'
import AuthUser from '@/store/AuthUser'
import ItemStore from '@/store/Item'
export default {
  props: ["name"],
  components: {
    ShopList
  },
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
    },
  }
}
</script>

<style>

</style>