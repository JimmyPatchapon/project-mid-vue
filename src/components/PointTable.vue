<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th class="detail">Detail</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>dd/mm/yy</td>
          <td>detail</td>
          <td>{{i}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

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
.detail {
  width: 50%;
}
</style>>