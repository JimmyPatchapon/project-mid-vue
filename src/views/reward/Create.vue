<template>
  <div>
      <RewardCreateForm></RewardCreateForm>
      <reward-edit></reward-edit>
  </div>
</template>

<script>
import RewardCreateForm from "@/components/reward/RewardCreateForm"
import AuthUser from "@/store/AuthUser"
import RewardEdit from '@/components/reward/RewardEdit.vue'
export default {
    components: {
        RewardCreateForm,
        RewardEdit
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