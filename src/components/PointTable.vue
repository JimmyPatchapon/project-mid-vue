<template>
  <div>
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
  </div>
</template>

<script>
import PointStore from '@/store/Point'
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      pointList: []
    }
  },
  created() {
    this.fetchPointList()
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
</style>>