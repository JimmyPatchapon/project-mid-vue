<template>
    <div class='wow'>
        <h1>Reward</h1>
        <h3>Point: {{ points }}</h3>
        <b-table head-variant='dark' striped outlined hover fixed :items="rewards" :fields="fields" class='text-left' v-if="isAdmin()">
            <template #cell(redeem)=row>
                <b-button variant='success' size="sm" @click="redeem(row.index)" class="mr-1">
                    Earn
                </b-button>
            </template>
            <template #cell(edit)=row>
                <b-button :to='`/reward/${rewards[row.index].id}/edit`' variant='danger' size="sm" class="mr-1">
                    Edit
                </b-button>
            </template>
        </b-table>

        <b-table head-variant='dark' striped outlined hover fixed :items="rewards" :fields="fields2" class='text-left' v-if="!isAdmin()">
            <template #cell(redeem)=row>
                <b-button variant='success' size="sm" @click="redeem(row.index)" class="mr-1">
                    Earn
                </b-button>
            </template>
        </b-table>        

        <!-- <table class='wow'>
            <thead>
                <th>NO.</th>
                <th>Reward</th>
                <th>Point</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="(reward, index) in rewards" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ reward.name_reward }}</td>
                    <td>{{ reward.require_points }}</td>
                    <button @click="redeem(index)">Exchange</button>
                    <td v-if="isAdmin()">
                        <router-link :to="{ name: 'RewardEdit', params: { id: reward.id } }">Edit</router-link>
                    </td>
                </tr>
                <router-link to="/reward/add">
                    <button v-if="isAdmin()" >Add Reward</button>
                </router-link>
                
            </tbody>
            
        </table> -->
        
    </div>
</template>

<script>
import rewardApi from "@/store/rewardApi"
import AuthUser from "@/store/AuthUser"
import UserApi from "@/store/UsersApi"
import RewardService from "@/services/RewardService"
import AuthService from "@/services/AuthService"
export default {
    data(){
        return{
            fields: ['id','name_reward','require_points','redeem','edit'],
            fields2: ['id','name_reward','require_points','redeem'],
            rewards:[],
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
        isAdmin() {
            if (AuthUser.getters.user.role !== undefined) {
                if (AuthUser.getters.user.role.name === "Administration") {
                return true
                } else {
                return false
                }
            } else {
                return false
            }
        },
        async fetchReward(){
            await rewardApi.dispatch("fetchReward")
            this.rewards = rewardApi.getters.rewards
        },
        getPoint(){
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
            await AuthUser.dispatch("editPoint", payload)
            await RewardService.redeemPoint(this.rewards[index].name_reward, this.rewards[index].require_points)
        },
        


    }
}
</script>

<style lang="scss" scoped>

// table {
//   width: 100%;
//   border: 1px solid black;
//   border-collapse: collapse ;
//   border-radius: 5px;
// }
// th {
//   background-color: antiquewhite;
//   border-bottom: 1px solid black;
// }
// td {
//   margin-top: 100px;
//   padding: 5px;
// }
// tr:hover {background-color: #ddd;}
.wow {
    text-align: center;
    width: 66%;
    margin: auto
}
</style>

