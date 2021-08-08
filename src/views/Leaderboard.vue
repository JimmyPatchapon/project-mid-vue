<template>
  <div>
      <table v-if="tableIndex === 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Point</th>
          <th>Total Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.points }}</td>
          <td>{{ user.accumulativePoints }}</td>
          <button @click="logSomething()">Click</button>
        </tr>
      </tbody>

    </table>
          <table v-if="tableIndex === 1">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Point</th>
          <th>Total Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(point, index) in pointHistory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ pointHistory[0].users[0].username }}</td>
          <td>{{ pointHistory[0].users[0].points }}</td>
          <td>{{ pointHistory[0].users[0].accumulativePoints }}</td>
          <button @click="logSomething()">Click</button>
        </tr>
      </tbody>
    </table>
    <br><br>
    <div>
      <button @click="changeTable()" v-if="tableIndex === 0">Redeem Leaderboard</button>
      <button @click="changeTable()" v-if="tableIndex === 1">Point Leaderboard</button>
    </div>
    <br><br>
      {{ pointHistory }}
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
            users: [],
            pointHistory: [],
            tableIndex: 0
        }
    },
    methods: {
        async fetchUsers(){
            await UsersApiStore.dispatch("fetchAuthenticated")
            this.users = UsersApiStore.getters.users
            this.sortUsersByTotalPoints()
        },
        async fetchPointHistory() {
          await PointStore.dispatch("fetchPointList")
          this.pointHistory = PointStore.getters.pointList
        },
        isAuthen() {
            return AuthUser.getters.isAuthen
        },
        isAdmin() {
            if (AuthUser.getters.user.role !== undefined) {
                if (AuthUser.getters.user.role.name === "Administration") {
                  return true
                } 
                else 
                {
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
              return b.points - a.points
            })
        },
        logSomething() {
          console.table(this.pointHistory)
        },
        changeTable() {
          if (this.tableIndex === 0)
            this.tableIndex = 1
          else {
            this.tableIndex = 0;
          }
        },
    },
    async created(){
        if(!this.isAdmin()) {
            this.$swal("You have no permission","","warning")
            this.$router.push("/")
        }
        this.fetchUsers()
        this.fetchPointHistory()
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