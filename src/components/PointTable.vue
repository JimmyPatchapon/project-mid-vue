<template>
  <div>
    <h3>Point Use</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Detail</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,index) in pointList" :key="index">
          <td v-if="checkname(i.users[0].username)">{{i.date}}</td>
          <td class="detail" v-if="checkname(i.users[0].username)">{{i.detail}}</td>
          <td v-if="checkname(i.users[0].username)">{{i.amount}}</td>
        </tr>
      </tbody> 
    </table>

    <h3>Point Earn</h3>
    <table class="point-earn">
      <thead>
        <tr>
          <th>Date</th>
          <th>Detail</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,index) in pointEarn" :key="index">
          <td v-if="checkname(i.users[0].username)">{{i.date}}</td>
          <td class="detail" v-if="checkname(i.users[0].username)">{{i.detail}}</td>
          <td v-if="checkname(i.users[0].username)">{{i.amount}}</td>
        </tr>
      </tbody> 
    </table>
  </div>
</template>

<script>
import PointStore from '@/store/Point'
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      pointList: [],
      pointEarn: []
    }
  },
  created() {
    this.fetchPointList()
    this.fetchPointEarn()
  },
  methods: {
    async fetchPointList() {
      await PointStore.dispatch('fetchPointList')
      this.pointList = PointStore.getters.pointList
    },
    checkname(username){
      let res = AuthUser.getters.user.username
      if( username === res){
        return true
      }
      return false
    },
    async fetchPointEarn() {
      await PointStore.dispatch('fetchPointEarn')
      this.pointEarn = PointStore.getters.pointEarn
      console.log(this.pointEarn)
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 60%;
  border: 1px solid black;
  border-collapse: collapse;
}
th {
  background-color: antiquewhite;
  border-bottom: 1px solid black;
}
td {
  padding: 5px;
}
.detail {
  width: 50%;
  text-align: left;
}
table.point-earn{
  margin: 20px;
  border-collapse: collapse;
}
tr:hover {background-color: #ddd;}
</style>>