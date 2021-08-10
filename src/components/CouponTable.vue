<template>
  <div class='wow'>
    <div>
      <h1>Coupon</h1> 
      <b-table head-variant='dark' striped outlined hover fixed :items="coupons" :fields="fields" class='text-left' :filter='this.user'></b-table>
    </div>
    
  </div>
</template>
<script>
import CouponApi from '@/store/CouponApi'
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      user: '',
      fields: ['name_coupon'],
      coupons: [],
    }
  },
  created() {
    this.fetchCoupon()
    this.getUser()
  },
  methods: {
    async fetchCoupon() {
      await CouponApi.dispatch('fetchCoupon')
      this.coupons = CouponApi.getters.coupon
    },
    checkname(username){
      let res = AuthUser.getters.user.username
      if( username === res){
        return true
      }
      return false
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