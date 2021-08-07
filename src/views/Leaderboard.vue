<template>
  <div>
      <h1>for admin</h1>
      <p>table of users and points in a given date range</p>
      <p>sort by points and accuPoints</p>
      <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Point</th>
          <th>Total Point Used</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.points }}</td>
          <td>{{ user.accumulativePoints }}</td>
        </tr>
      </tbody>
    </table>
      <p> Need to fix Admin localStorage key</p>
      {{ users }}
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
            await UsersApiStore.dispatch("fetchAuthenticated")
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
        console.log(this.isAdmin());
        if(!this.isAdmin()) {
            this.$swal("You have no permission","","warning")
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
table {
    margin: auto;
    width: 66%;
}
</style>