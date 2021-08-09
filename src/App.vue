<template>
  <!-- <div id="app" class="nav">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="this.isAdmin()" to="/leaderboard">Leaderboard</router-link>
      <span v-if="isAdmin()"> |</span> 
      <router-link v-if="!isAuthen()" to="/register">Register</router-link>
      <router-link v-if="isAuthen()" to="/member">Member</router-link> |
      <router-link v-if="!isAuthen()" to="/login">Login</router-link> 
      <router-link v-if="isAuthen()" to="/eventList">Event</router-link>
      <span v-if="isAuthen()"> |</span> 
      <router-link v-if="isAuthen()" to="/reward">Reward</router-link>
      <span v-if="isAuthen()"> |</span> 
      <router-link v-if="isAuthen()" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div> -->
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item v-if="this.isAdmin()" to="/leaderboard">Leaderboard</b-nav-item>
        <b-nav-item v-if="isAuthen()" to="/eventList">Event</b-nav-item>
        <b-nav-item v-if="isAuthen()" to="/reward-user">Reward</b-nav-item>
        <b-nav-item v-if="isAuthen()" to="/logout">Logout</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isAuthen()" to="/login">Log in</b-nav-item>
        <b-nav-item v-if="!isAuthen()" to="/register">Register</b-nav-item>
        <b-nav-item-dropdown right v-if="isAuthen()">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            Profile
          </template>
          <b-dropdown-item to="/member">Account History</b-dropdown-item>
          <b-dropdown-item to="/logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
<router-view/>
</div>
</template>

<script>

import AuthUser from '@/store/AuthUser'
export default {
  data() {
    return {
      user: []
    }
  },
  mounted() {
    user = AuthUser.getters.user
  },
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
      console.log(localStorage["auth-user"]);
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

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

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  span {
    margin-right: 4px;
  }
}
button {
  a {
    color: white;
  }
  
}
.navbar-dark .navbar-nav .nav-link{
    color:white!important
}
</style>
