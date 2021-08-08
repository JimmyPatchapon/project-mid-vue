<template>
    <div>
        <h1>Reward</h1>
        <h3>Point: {{ points }}</h3>
        <div v-if="isAdministration()">
            <label for="name">Reward name</label>
            <input type="text" v-model="name_reward">
        </div>
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
        isAdministration() {
        return this.isAuthen() && user.role.name === "Administration"
        },
        addReward(){
            let payload ={
                name_reward:this.name_reward,
                require_points:this.require_points
            }
            let res = await rewardApi.dispatch("addReward", payload)
            if(res.success){
                this.$swal("Add finish",this.name_reward+" is created","success")
            }else{
                this.$swal("Add failed",res.message,"error")
            }
        },
        editReward(){

        },
        deleteReward(){

        },
        async fetchReward(){
            await rewardApi.dispatch("fetchReward")
            this.rewards = rewardApi.getters.rewards
        },
        getPoint(){
            console.log(AuthUser.getters.user)
            this.points = AuthUser.getters.user.points
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