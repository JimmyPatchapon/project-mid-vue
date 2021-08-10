<template>
  <div class='text-left'>
      <b-card bg-variant="dark" text-variant="white" title="Profile" class="text-center">
        <b-card-text class="biggerText">
          <div>Username: {{user.username}}</div>
          <div class="email">[ {{user.email}} ]</div>
          <div>Point: {{user.points}}</div>
        </b-card-text>
      </b-card>
      <coupon-table></coupon-table>
    <point-table></point-table>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
import PointTable from '@/components/PointTable'
import CouponTable from '@/components/CouponTable'
export default {
  components: {
    PointTable,
    CouponTable
  },
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.user = AuthUser.getters.user
    if(!this.isAuthen()) {
      this.$swal("Restricted Area", "You have no permission","warning")
      this.$router.push("/")
    }
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen
    }
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
.email {
  font-size: 1.25em;
}
.biggerText {
  font-size: 1.4em;
  text-align: center
}
</style>>