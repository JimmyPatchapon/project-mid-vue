<template>
  <div>
    <img src="@/assets/logo.png">
    <h1>Item {{ name }}</h1>
    <h2>Price</h2>
    <div>detail</div>
    <div>
      <label for="amount">Amount: </label>
      <button>-</button>
      <input type="text" v-model="number">
      <button>+</button>
    </div>
    <button>Buy</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      number: 1
    }
  },
  async created() {
    this.name = this.$route.params.name
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align: left;
}
img {
  width: 40%;
  float: left;
}
</style>