<template>
  <div>
    <aside>
      <img src="@/assets/logo.png" alt="">
      <div>{{user.username}}</div>
      <div class="email">[ {{user.email}} ]</div>
      <div>{{user.points}}</div>
    </aside>
    <point-table></point-table>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
import PointTable from '@/components/PointTable'
export default {
  components: {
    PointTable
  },
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.user = AuthUser.getters.user
    console.log(this.user);
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
  text-align: center;
}
.email {
  font-size: 0.75em;
}
</style>>