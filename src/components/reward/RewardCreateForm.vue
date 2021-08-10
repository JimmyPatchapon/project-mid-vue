<template>
  <div>
    <h1>Add New Reward</h1> 

    <div class='center'>
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

      <b-form-group id="input-group-3" label="Stock" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.stock"
          placeholder="Enter Stock"
          required
        ></b-form-input>
      </b-form-group>

      <b-button @click="addReward" type="submit" variant="primary">Confirm Add</b-button>


    </b-form>
  </div>

    <!-- <div className="center">

        <label for="name_jp">Reward Name</label>
        <input type="text" v-model="form.name_reward" />
        <br>
        <label for="type">Require Points</label>
        <input type="text" v-model="form.require_points" />
        <br>


        <button @click="addReward">Add</button>

    </div> -->
  </div>
</template>

<script>
import rewardApi from "@/store/rewardApi"
export default {
    data() {
        return {
            form: {
                name_reward: '',
                require_points: '',
                stock: ''
            }
        }
    },
    methods: {
        async addReward(){
            let payload ={
                name_reward:this.form.name_reward,
                require_points: parseInt(this.form.require_points),
                stock: parseInt(this.form.stock)
            }
            let res = await rewardApi.dispatch("addReward", payload)
            if(res.success){
                this.$swal("Add finish",payload.name_reward+" is created","success")
                this.$router.push("/reward")
            }else{
                this.$swal("Add failed",res.message,"error")
            }
        },
    },
}
</script>

<style lang="scss" scoped>
label {
    padding: 10px;
}
// div {
//     border: 1px black solid;
// }
.center {
    width: 66%;
    text-align: center;
    margin: auto;
}
</style>