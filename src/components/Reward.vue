<template>
    <div>
        <h1>Reward</h1>
        <h3>Point: {{ users.points }}</h3>
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
export default {
    data(){
        return{
            rewards:[],
            users:[],
            points:"",
            require_points:"",
            name_reward:"",
        }
    },
    created(){
        this.fetchReward()
    },
    methods:{
        async fetchReward(){
            await rewardApi.dispatch("fetchReward")
            this.rewards = rewardApi.getters.rewards
        },
        redeem(){

        }
    }
}
</script>

<style>

</style>