<template>
  <div class='text-center'>
    <h1>Edit Reward {{ id }}</h1>
      <div class='percent66'>
    <b-form @submit.stop.prevent>
      <b-form-group
        id="input-group-1"
        label="Reward Name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name_reward"
          type="text"
          placeholder="Reward Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Require Points to Redeem" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.require_points"
          placeholder="Enter Required Points"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Stocks" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.stock"
          placeholder="Enter Stock"
          required
        ></b-form-input>
      </b-form-group>

      <b-button @click="editReward" type="submit" variant="primary">Confirm Edit</b-button>
      <span></span>
      <b-button @click="deleteReward" variant='danger'>Delete</b-button>

    </b-form>
  </div>
    <!-- <div>
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
    </div>  -->
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
        require_points: '',
        stock: ''
      }
    }
  },
  async created() {
    this.id = this.$route.params.id
    let reward = await RewardService.getRewardById(this.id)
    this.form.name_reward = reward.name_reward
    this.form.require_points = reward.require_points
    this.form.stock = reward.stock
  },
  methods: {
    async editReward() {
      let payload = {
        id: this.id,
        name_reward: this.form.name_reward,
        require_points: this.form.require_points,
        stock: parseInt(this.form.stock)
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

<style lang='scss' scoped>
  span {
    margin-right: 5px;
  }
  .percent66 {
    margin: auto;
    width: 66%
  }
</style>