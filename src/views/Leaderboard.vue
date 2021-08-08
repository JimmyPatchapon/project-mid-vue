<template>
  <div>
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
    <br><br>
      {{ users }}
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import AuthService from "@/services/AuthService"
import UsersApiStore from "@/store/UsersApi"
import PointStore from "@/store/Point"
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
            console.log("can i fetch this bitch");
            this.sortUsersByTotalPoints()
        },
        isAuthen() {
            return AuthUser.getters.isAuthen
        },
        isAdmin() {
            if (AuthUser.getters.user.role !== undefined) {
              if (AuthUser.getters.user.role.name === "Administration") {
                return true
              } 
              else {
                return false
              }
            } 
            else 
            {
              return false
            }
        },
        sortUsersByTotalPoints() {
            this.users.sort((a,b) => {
              console.log(a.points - b.points);
              return b.points - a.points
            })
        }
    },
    async created(){
        await this.fetchUsers()
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