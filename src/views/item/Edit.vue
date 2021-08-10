<template>
  <div class='text-center'>
    <h1>Edit Item {{ id }}</h1>
      <div class='percent66'>
    <b-form @submit.stop.prevent>
      <b-form-group
        id="input-group-1"
        label="Item Name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Prices" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.prices"
          placeholder="Prices"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Details" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.details"
          placeholder="Detail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Quantity" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.quantity"
          placeholder="Quantity"
          required
        ></b-form-input>
      </b-form-group>

      <b-button @click="editItem" type="submit" variant="primary">Confirm Edit</b-button>
      
    </b-form>
  </div>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService'
import ItemStore from '@/store/Item'
export default {
  data() {
    return {
      id: '',
      form: {
        name: '',
        prices: '',
        details: '',
        quantity: ''
      }
    }
  },
  async created() {
    this.id = this.$route.params.id
    let item = await ShopService.getItemById(this.id)
    this.form.name = item.name
    this.form.prices = item.prices
    this.form.details = item.details
    this.form.quantity = item.quantity
  },
  methods: {
    async editItem() {
      let payload = {
        id: this.id,
        name: this.form.name,
        prices: this.form.prices,
        details: this.form.details,
        quantity: this.form.quantity
      }
      let res = await ItemStore.dispatch('editItem', payload)
      if(res.success) {
        this.$router.push(`/shop/${this.id}`)
      } else {
        this.$swal("Edit Failed", res.message, "error")
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  span {
    margin-right: 5px;
  }
  .percent66 {
    margin: auto;
    width: 66%
  }
</style>