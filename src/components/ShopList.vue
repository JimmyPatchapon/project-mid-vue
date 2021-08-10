<template>
  <div>
    <!-- <a class="card" v-for="(i,index) in items" :key="index"><router-link :to="{name:'ShopItem', params:{id: i.id}}">
      <img :src="createUrl(i.picture.url)" alt="">
      <div>{{i.name}}</div>
      <div>{{i.prices}}</div>
    </router-link></a> -->

    <!-- <b-col class='wow'>
      <b-card v-for="(i,index) in items" :key="index" 
      :title='i.name' :img-src='createUrl(i.picture.url)'
      :class='mb-2'></b-card>
    </b-col>  -->
    <div>
      <b-col>
          <b-card
            :title="name"
            :img-src="src"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text :msg='msg'>
              {{ msg }} THB
            </b-card-text>

            <b-button :to='`/shop/${id}`' variant="success">Buy</b-button>
            <b-button v-if="isAdmin()" :to='`/shop/${id}/edit`' variant="danger" style="margin-left: 10px">Edit</b-button>
          </b-card>
      </b-col>
</div>
  </div>
</template>

<script>
import ItemStore from '@/store/Item'
import AuthUser from '@/store/AuthUser'
export default {
  props: ["name",'src','msg','id'],
  data() {
    return {
      items: [],
      form: {
        
      }
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
    isAdmin() {
      if(AuthUser.getters.user.role !== undefined) {
        if(AuthUser.getters.user.role.name === "Administration") {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}
// .card {
//   width: 250px;
//   display: inline-block;
//   background-color: antiquewhite;
//   border-radius: 10px;
//   margin: 10px;
//   padding: 20px 0;
//   text-align: center;
// }
// router-link {
//   text-decoration: none;
// }
// .card div {
//   width: 50%;
//   display: inline-block;
//   text-align: center;
//   font-size: 25px;
//   color: black;
// }
// img {
//   width: 200px;
//   margin-bottom: 10px;
// }
// .card:hover{
//   background-color: rgb(251, 205, 53);
// }
.wow {
  width: 20%;
  height: 20%
}
</style>