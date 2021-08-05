<template>
  <div class="home">
    <img v-if="!isAuthen()" alt="Vue logo" src="../assets/logo.png">
    <img v-if="isAuthen()" alt="Vue logo" src="http://localhost:1337/uploads/badfallen_d19d4214fd.png">

    <HelloWorld v-if="isAuthen()" msg="Don't forget to install modules"/>
    <HelloWorld v-if="!isAuthen()"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AuthUser from '@/store/AuthUser'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    isAuthen(){
        return AuthUser.getters.isAuthen
    }
  }
}
</script>

