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
          <th>Redeemed Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sum, index) in sumHistory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ sum.username }}</td>
          <td>{{ sum.sumPoint }}</td>
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
      {{ sumHistory  }}
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
            sumHistory: [],
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
          this.pointHistory = await PointStore.getters.pointList
          this.sumAllHistory()
          this.sortSumAllHistory()
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
        sortSumAllHistory() {
            this.sumHistory.sort((a,b) => {
              return b.sumPoint - a.sumPoint
            })
        },        
        logSomething() {

          console.table(this.sumHistory)

        },
        changeTable() {
          if (this.tableIndex === 0){
            this.tableIndex = 1.
            this.sumAllHistory()
            this.sortSumAllHistory()
          }
          else {
            this.tableIndex = 0;
          }
        },
        sumAllHistory() {
            this.sumHistory = []
            let usernames = []
            let sum = 0
            for (let i = 0; i < this.users.length; i++) {
              usernames.push(this.users[i].username)
              
            } 
            for (let i = 0; i < usernames.length; i++) {
              const e = usernames[i]; // username
              //check if username matches the pointHistory
              this.pointHistory.forEach(element => {
                if (element.users[0].username === e)
                {
                  sum += element.amount
                }
              });
              
              this.sumHistory.push({
                username: e,
                sumPoint: sum
              })
              sum = 0
            }
        }
    },
    created(){
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