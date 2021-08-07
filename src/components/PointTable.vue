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
        <tr v-for="i in pointList" :key="i">
          <td>{{i.date}}</td>
          <td class="detail">{{i.detail}}</td>
          <td>{{i.amount}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PointStore from '@/store/Point'
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
</style>>