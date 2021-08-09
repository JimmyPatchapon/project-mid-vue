<template>
  <div>
    <h1>Edit Reward {{ id }}</h1>
    <div>
      <div>
        <label for="name_reward">Name</label>
        <input type="text" v-model="form.name_reward">
      </div>
      <div>
        <label for="require_points">Require Points</label>
        <input type="text" v-model="form.require_points">
      </div>
      <div>
        <button @click="editReward">Edit</button>
      </div>
      <div>
        <button @click="deleteReward">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import RewardService from '@/services/RewardService'
import RewardApiStore from '@/store/rewardApi'
export default {
  data() {
    return {
      id: '',
      form: {
        name_reward: '',
        require_points: ''
      }
    }
  },
  async created() {
    this.id = this.$route.params.id
    let reward = await RewardService.getRewardById(this.id)
    this.form.name_reward = reward.name_reward
    this.form.require_points = reward.require_points
  },
  methods: {
    async editReward() {
      let payload = {
        id: this.id,
        name_reward: this.form.name_reward,
        require_points: this.form.require_points
      }
      let res = await RewardApiStore.dispatch('editReward', payload)
      if(res.success) {
        this.$router.push("/reward")
      } else {
        this.$swal("Edit Failed", res.message, "error")
      }
    },
    async deleteReward() {
      let payload = {
        id: this.id
      }
      let res = await RewardApiStore.dispatch('deleteRewaed', payload)
      if(res.success) {
        this.$router.push("/reward")
      } else {
        this.$swal("Delete Failed", res.message, "error")
      }
    }
  }
}
</script>

<style>

</style>