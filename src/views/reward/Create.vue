<template>
  <div>
      <RewardCreateForm></RewardCreateForm>
  </div>
</template>

<script>
import RewardCreateForm from "@/components/reward/RewardCreateForm"
import AuthUser from "@/store/AuthUser"
export default {
    components: {
        RewardCreateForm,
    },
    created() {
      if (!this.isAdmin())
      {
          this.$swal("You have no permission","","warning")
          this.$router.push("/")
      }
    },
    methods: {
        isAdmin() {
        if (AuthUser.getters.user.role !== undefined) {
            if (AuthUser.getters.user.role.name === "Administration") {
            return true
            } else {
            return false
            }
        } else {
            return false
        }
        },
  }
}
</script>

<style>

</style>