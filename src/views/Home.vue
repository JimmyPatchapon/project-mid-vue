<template>
  <div class="home">
    <img v-if="!isAuthen()" alt="Vue logo" src="../assets/logo.png">
    <img v-if="isAuthen()" alt="Vue logo" src="http://localhost:1337/uploads/badfallen_d19d4214fd.png">

    <HelloWorld v-if="isAuthen()" msg="Don't forget to install modules"/>
    <HelloWorld v-if="!isAuthen()"></HelloWorld>
    <button @click="logSomething()">Log Something</button>
    <br>
    {{ items }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AuthUser from '@/store/AuthUser'
import ItemsApiStore from "@/store/ItemsApi"

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  state: {
    items: [],
  },
  created() {
    this.fetchItems()
  },
  methods: {
    isAuthen(){
        return AuthUser.getters.isAuthen
    },
    async fetchItems(){
      await ItemsApiStore.dispatch("fetchItems")
      this.items = ItemsApiStore.getters.items
    },
    logSomething() {
      let logging = AuthUser.getters.user
      console.log(logging);
      console.log(logging.points);

    }
  }
}
</script>

