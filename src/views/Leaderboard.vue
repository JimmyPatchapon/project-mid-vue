<template>
  <div>
    
    <!-- Start <input type="Date" v-model="form.dateStart" />
    End <input type="Date" v-model="form.dateEnd" />
    <button @click="query()">Query</button>
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

        </tr>
      </tbody>

    </table>
          <table v-if="tableIndex === 1">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Acquired Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sum, index) in sumHistory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ sum.username }}</td>
          <td>{{ sum.sumPoint }}</td>

        </tr>
      </tbody>
    </table>
    <br><br>
    <div>
      <button @click="changeTable()" v-if="tableIndex === 0">Redeem Leaderboard</button>
      <button @click="changeTable()" v-if="tableIndex === 1">Point Leaderboard</button>
    </div> -->

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
            tableIndex: 0,
            form: {
              dateStart: '2021-08-01',
              dateEnd: '2021-08-10'
            }
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
          this.sumAllHistory("1970-01-01","3000-12-31")
          this.sumAllHistory("1970-01-01","3000-12-31")
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
          console.table(this.pointHistory)
        },
        changeTable() {
          if (this.tableIndex === 0){
            this.tableIndex = 1.
            this.sumAllHistory(this.form.dateStart, this.form.dateEnd)
            this.sortSumAllHistory()
          }
          else {
            this.tableIndex = 0;
          }
        },
        query() {
            this.sumAllHistory(this.form.dateStart, this.form.dateEnd)
            this.sortSumAllHistory()
            this.tableIndex = 1
        },
        sumAllHistory(startDate, endDate) {
            let date1 = new Date(startDate)
            let date2 = new Date(endDate)
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
                let dateCheck = element.date
                let date3 = new Date(dateCheck)
                if (element.users[0].username === e && (date3.getTime() <= date2.getTime() 
                && date3.getTime() >= date1.getTime()))
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