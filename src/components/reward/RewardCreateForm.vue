<template>
  <div>
    Add New Reward

    <div className="center">

        <label for="name_jp">Reward Name</label>
        <input type="text" v-model="form.name_reward" />
        <br>
        <label for="type">Require Points</label>
        <input type="text" v-model="form.require_points" />
        <br>


        <button @click="addReward">Add</button>

    </div>
  </div>
</template>

<script>
import rewardApi from "@/store/rewardApi"
export default {
    data() {
        return {
            form: {
                name_reward: '',
                require_points: ''
            }
        }
    },
    methods: {
        async addReward(){
            let payload ={
                name_reward:this.form.name_reward,
                require_points: parseInt(this.form.require_points)
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
div {
    border: 1px black solid;
}
.center {
    text-align: center;
    margin: auto;
}
</style>