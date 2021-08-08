<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="this.isAdmin()" to="/leaderboard">Leaderboard</router-link>
      <span v-if="isAdmin()"> |</span> 
      <router-link v-if="!isAuthen()" to="/register">Register</router-link>
      <router-link v-if="isAuthen()" to="/member">Member</router-link> |
      <router-link v-if="!isAuthen()" to="/login">Login</router-link> 
      <router-link v-if="isAuthen()" to="/reward">Reward</router-link>
      <span v-if="isAdmin()"> |</span> 
      <router-link v-if="isAuthen()" to="/logout">Logout</router-link>
      
      <button @click="logSomething()">Log</button>
    </div>
    <router-view/>
  </div>
</template>

<script>

import AuthUser from '@/store/AuthUser'
export default {
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen
    },
    isAdmin() {
      if (AuthUser.getters.user.role !== undefined) {
        if (AuthUser.getters.user.role.name === "Administration") {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    logSomething(){
      console.log(AuthUser.getters.isAuthen);
      console.log(AuthUser.getters.isAdmin);
      console.log(AuthUser.getters.user);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  span {
    margin-right: 4px;
  }
}
</style>
