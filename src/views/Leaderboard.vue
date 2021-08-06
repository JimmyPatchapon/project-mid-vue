<template>
  <div>
      <h1>for admin</h1>
      <p>table of users and points in a given date range</p>
      <p>sort by points and accuPoints</p>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import AuthService from "@/services/AuthService"
import UsersApiStore from "@/store/UsersApi"
export default {
    data() {
        return {
            users: []
        }
    },
    methods: {
        async fetchUsers(){
            await PokedexApiStore.dispatch("fetchUsers")
            this.users = UsersApiStore.getters.users
        },
        isAuthen() {
            return AuthUser.getters.isAuthen
        },
        isAdmin() {
            return AuthService.isAdministration()
        }
    },
    created(){
        this.fetchUsers()
        if(!this.isAdmin) {
            this.$swal("You have no permission","","warning")
            this.$router.push("/")
        }
    }
}
</script>

<style>
    h1 {
        text-align: center;
    }
</style>