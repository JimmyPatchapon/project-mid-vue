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
                    <td>{{ reward.name_reward }}</td>
                    <td>{{ reward.require_points }}</td>
                    <button @click="redeem(index)">Exchange</button>
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
        this.getPoint()
    },
    methods:{
        async fetchReward(){
            await rewardApi.dispatch("fetchReward")
            this.rewards = rewardApi.getters.rewards
        },
        async getPoint(){
            console.log(AuthUser.getters.user)
            
            this.points = AuthUser.getters.user.points
            console.log(typeof(this.points));
        },
        redeem(index){
            if(this.points>=this.rewards[index].require_points){
                this.points-=this.rewards[index].require_points 
                this.usePoint(index)
                this.$swal("Redeem Success", "", "success")
            }else{
                this.$swal("Your points are not enough","", "error")
            }  
            
        },
        async usePoint(index) {
            let payload = {
                id: AuthUser.getters.user.id,
                points: this.points
            }
            await UserApi.dispatch("editPoint", payload)
            await RewardService.redeemPoint(this.rewards[index].name_reward, this.rewards[index].require_points)
        },
        

    }
}
</script>

<style>

</style>