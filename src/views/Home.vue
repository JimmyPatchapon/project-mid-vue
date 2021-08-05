<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-if="isAuthen()" msg="Don't forget to install modules"/>
    <HelloWorld></HelloWorld>
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

