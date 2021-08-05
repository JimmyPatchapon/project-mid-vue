<template>
  <div>
    <table>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>
            <img src="@/assets/logo.png">
            name[{{i}}]
            price[{{i}}]
            <router-link :to="{name:'ShopItem', params:{name: i}}">More</router-link>
          </td>
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
tr {
  width: 30%;
  display: inline-block;
  background-color: antiquewhite;
  border-radius: 10px;
  margin: 10px;
}
</style>