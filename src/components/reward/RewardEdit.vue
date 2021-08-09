<template>
    <div>
        <h1>Reward</h1>
        <h3>Point: {{ points }}</h3>

        <table>
            <thead>
                <th>NO.</th>
                <th>Reward</th>
                <th>Point</th>
            </thead>
            <tbody>
                <tr v-for="(reward, index) in rewards" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-if="index !== editIndex">{{ reward.name_reward }}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="reward.name_reward" />
                    </td>
                    <td v-if="index !== editIndex">{{ reward.require_points }}</td>
                    <td v-if="index === editIndex">
                        <input type="text" v-model="reward.require_points" />
                    </td>
                   <td v-if="index !== editIndex">
                        <button @click="openForm(index, reward)">Edit</button>
                    </td>
                    <td v-if="index === editIndex">
                        <button @click="editReward()">Update</button>
                        <button>Delete</button>
                        <button @click="closeForm()">Cancel</button>
                    </td>
                </tr>
                
                
            </tbody>
            
        </table>
        
    </div>
</template>

<script>
import rewardApi from "@/store/rewardApi"
import AuthUser from "@/store/AuthUser"
import UserApi from "@/store/UsersApi"
import RewardService from "@/services/RewardService"

export default {
    data(){
        return{
            rewards:[],
            points:"",
            require_points:"",
            name_reward:"",
        }
    },
    created(){
        this.fetchReward()
    },
    // methods:{
    //     openForm(index, reward){
    //         this.editIndex = index
    //         let cloned = JSON.parse(JSON.stringify(reward))
    //         this.require_points = cloned.require_points
    //         this.name_reward = cloned.name_reward
    //     },
    //     editReward(){
    //         let payload = {
    //             id: this.editIndex,
    //             name_reward: this.name_reward,
    //             require_points: this.require_points
    //         }
    //         let res = await rewardApi.dispatch("editReward", payload)
    //         if(res.success){
    //             this.$swal("Edit success","","success")
    //         }else{
    //             this.$swal("Edit fail","","success")
    //         }
    //         this.closeForm()
    //         this.fetchReward()
    //     },
    //     closeForm() {
    //         this.editIndex = -1,
    //         this.require_points = "",
    //         this.name_reward = ""
    //     },
    //     deleteReward(){

    //     },
    //     async fetchReward(){
    //         await rewardApi.dispatch("fetchReward")
    //         this.rewards = rewardApi.getters.rewards
    //     }
    // }
}
</script>

<style>

</style>