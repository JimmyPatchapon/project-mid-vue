<template>
    <div>
        <h1>Reward</h1>
        <h3>Point: </h3>
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
                    <button>Exchange</button>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
import rewardApi from "@/store/rewardApi"
import userApi from "@/store/userApi"
export default {
    data(){
        return{
            rewards:[],
            users:[],
            require_points:"",
            points:"",
            name_reward:""
        }
    },
    created(){
        this.fetchReward()
        this.fetchUser()
    },
    methods:{
        async fetchReward(){
            await rewardApi.dispatch("fetchReward")
            this.rewards = rewardApi.getters.rewards
        },
        async fetchUser(){
            await userApi.dispatch("fetchUser")
            this.users = userApi.getters.users
        }
    }
}
</script>

<style>

</style>