<template>
  <div class='wow'>
    <div>
      <h1>Point Used</h1> 
      <b-table head-variant='dark' striped outlined hover fixed :items="pointList" :fields="fields" class='text-left' :filter='this.user'></b-table>
    </div>
    <div>
      <h1>Point Gained</h1> 
      <b-table head-variant='dark' striped outlined hover fixed :items="pointEarn" :fields="fields" class='text-left' :filter='this.user'></b-table>
    </div>
    
    <!-- <table>
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
    </table> -->

    <!-- <table class="point-earn">
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
    </table> -->
  </div>
</template>

<script>
import PointStore from '@/store/Point'
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      user: '',
      fields: ['date','detail','amount'],
      pointList: [],
      pointEarn: []
    }
  },
  created() {
    this.fetchPointList()
    this.fetchPointEarn()
    this.getUser()
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
    },
    getUser() {
      this.user = AuthUser.getters.user.username
    }
  }
}
</script>

<style lang="scss" scoped>
.wow {
  width: 66%;
  margin: auto;
}

</style>>