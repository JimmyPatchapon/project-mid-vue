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
                    <button @click="redeem">Exchange</button>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
import rewardApi from "@/store/RewardApi"
import AuthUser from "@/store/AuthUser"


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
            await AuthUser.dispatch("getPoint")
            console.log(AuthUser.getters.user)
            this.points = AuthUser.getters.user.points
        },
        redeem(){
            this.points-=this.require_points
        }
    }
}
</script>

<style>

</style>