<template>
  <div>
      <h1>Event</h1>
      <h2>Total: {{ points }}</h2>
      <div>
          <table>
              <thead>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Point</th>
              </thead>
              <tbody>
                  <tr v-for="(event, index) in events" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ event.event_name }}</td>
                      <td>{{ event.total }}</td>
                      <td>{{ event.earn_point }}</td>
                      <button @click="earn(index)">claim</button> 
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import EventListApi from "@/store/eventListApi"
import AuthUser from "@/store/AuthUser"
import UserApi from "@/store/UsersApi"
import EventService from "@/services/EventService"
export default {
    data(){
        return{
            claimIndex:-1,
            events:[],
            points:"",
            id:"",
            event_name:"",
            total:"",
            earn_point:"",
            claim_button: "",
        }
    },
    created(){
        this.fetchEventList()
        this.getPoint()
    },
    methods:{
        async fetchEventList(){
            await EventListApi.dispatch("fetchEventList")
            this.events = EventListApi.getters.events
        },
        getPoint(){
            this.points = parseInt(AuthUser.getters.user.points)
        },
        earn(index){
            if(this.events[index].total<=AuthUser.getters.user.accumulativePoints){
                this.points+=this.events[index].earn_point
                this.$swal("Complete","Earn point from "+this.events[index].event_name,"success")
                this.earnPoint(index)
            }else{
                this.$swal("Point are not enough","","error")
            }
        },
        async earnPoint(index){
            let payload = {
                id: AuthUser.getters.user.id,
                points: this.points
            }
            console.log(payload.points);
            await UserApi.dispatch("editPoint", payload)
            await EventService.earnPoint(this.events[index].event_name, this.points)
        },
    },

}
</script>

<style lang="scss" scoped>

</style>>
