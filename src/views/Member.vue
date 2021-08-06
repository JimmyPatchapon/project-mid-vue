<template>
  <div>
    <aside>
      <img src="@/assets/logo.png" alt="">
      <div>Username</div>
      <div>Point now</div>
    </aside>
    <point-table></point-table>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
export default {
  components: {
    PointTable
  }
}
</script>

<style lang="scss" scoped>
aside {
  width: 30%;
  float: left;
  background-color: antiquewhite;
  border-radius: 10px;
  margin: 10px;
  margin-right: 50px;
  padding: 20px 0;
}
</style>>