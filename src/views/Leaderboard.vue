<template>
<div>
  <div>
    <div class='wow'>
      <b-container>
      <b-row>
        <b-col>
          Start <b-form-datepicker id="example-datepicker" v-model="form.dateStart"></b-form-datepicker>
        </b-col>
        <b-col>
          End <b-form-datepicker id="example-datepicker2" v-model="form.dateEnd">
            </b-form-datepicker>
        </b-col>
      </b-row>
      <br>
        <b-button variant='warning' @click="query()">Query</b-button>
      </b-container>
    </div>
    
    <br>
    <h1>Points Leaderboard</h1>
  </div>

  <div v-if="tableIndex === -1">
    <b-table head-variant='dark' striped outlined hover fixed :items="users" :fields="fields" class='text-left'></b-table>
  </div>

  <div v-if="tableIndex === 0">
    <b-table head-variant='dark' striped outlined hover fixed :items="sumGained" :fields="fields1" class='text-left'></b-table>
  </div>
  <div v-if="tableIndex === 1">
    <b-table head-variant='dark' striped outlined hover fixed :items="sumHistory" :fields="fields2" class='text-left'></b-table>
  </div>
  <div class='wow'>
    <b-button variant='primary' @click="allUserTable()">Current Point Leaderboard</b-button>
    <span></span>
    <b-button variant='secondary' @click="changeTable()" v-if="tableIndex === 0 || tableIndex === -1">Redeem Leaderboard</b-button>
    <b-button variant='danger' @click="changeTable()" v-if="tableIndex === 1">Point Leaderboard</b-button>
  </div>
  
</div>
  <!-- <div class="wow">
    Start <input type="Date" v-model="form.dateStart" />
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
    </div>

  </div> -->
  
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
            pointGained: [],
            sumHistory: [],
            sumGained: [],
            fields: ['username','points'],
            fields1: ['username',{key:'sumPoint', label:'Point Gained'}],
            fields2: ['username',{key:'sumPoint', label:'Point Used'}],
            tableIndex: -1,
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
        async fetchPointGained() {
          await PointStore.dispatch("fetchPointEarn")
          this.pointGained = await PointStore.getters.pointEarn
          this.sumGainedHistory("1970-01-01","3000-12-31")
          this.sortPointGainedHistory()          
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
        sortPointGainedHistory() {
            this.sumGained.sort((a,b) => {
              return b.sumPoint - a.sumPoint
            })
        },       
        logSomething() {
          console.log(this.pointHistory)
        },
        changeTable() {
          if (this.tableIndex === 0 || this.tableIndex === -1){
            this.tableIndex = 1.
            this.sumAllHistory(this.form.dateStart, this.form.dateEnd)
            this.sortSumAllHistory()
          }
          else {
            this.tableIndex = 0;
            this.sumGainedHistory(this.form.dateStart, this.form.dateEnd)
            this.sortPointGainedHistory()
          }
        },
        allUserTable() {
          this.tableIndex = -1
          this.sortUsersByTotalPoints()
        },
        query() {
            this.sumAllHistory(this.form.dateStart, this.form.dateEnd)
            this.sortSumAllHistory()
            this.sumGainedHistory(this.form.dateStart, this.form.dateEnd)
            this.sortPointGainedHistory()
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
        },
        sumGainedHistory(startDate, endDate) {
            let date1 = new Date(startDate)
            let date2 = new Date(endDate)
            this.sumGained = []
            let usernames = []
            let sum = 0
            for (let i = 0; i < this.users.length; i++) {
              usernames.push(this.users[i].username)
              
            } 
            for (let i = 0; i < usernames.length; i++) {
              const e = usernames[i]; // username
              //check if username matches the pointHistory
              this.pointGained.forEach(element => {
                let dateCheck = element.date
                let date3 = new Date(dateCheck)
                if (element.users[0].username === e && (date3.getTime() <= date2.getTime() 
                && date3.getTime() >= date1.getTime()))
                {
                  sum += element.amount
                }
              });
              
              this.sumGained.push({
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
        this.fetchPointGained()
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
.wow {
  text-align: center;
  margin-top: 20px;
}
.wow {
  span {
    margin-right: 5px;
  }
}

</style>