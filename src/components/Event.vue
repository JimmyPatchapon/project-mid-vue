<template>
  <div>
      <h1 class='text-center'>Event</h1>
      <h2 class='text-center'>Total: {{ points }}</h2>
      <br>
        <div class='wow' v-if="isAdmin()">
            <b-table head-variant='dark' striped outlined hover fixed :items="events" :fields="fields" class='text-center'>
                <template #cell(earn)=row>
                    <b-button variant='warning' size="sm" :disabled="!buttonDisable(row.index)" @click="earn(row.index)" class="mr-1">
                        Earn
                    </b-button>
                </template>

                <template #cell(edit)=row>
                    <b-button :to='`/events/${events[row.index].id}/edit`' variant='danger' size="sm" class="mr-1">
                        Edit
                    </b-button>
                </template>
            </b-table>
        </div>

        <div class='wow' v-if="!isAdmin()">
            <b-table head-variant='dark' striped outlined hover fixed :items="events" :fields="fields2" class='text-center'>
                <template #cell(earn)=row>
                    <b-button variant='warning' size="sm" :disabled="!buttonDisable(row.index)" @click="earn(row.index)" class="mr-1">
                        Earn
                    </b-button>
                </template>
            </b-table>
        </div>
                
        <b-button variant='primary'  to="/events/add" class="mr-1">Add Event</b-button>
      <!-- <div>
        <b-table head-variant='dark' striped outlined hover fixed :items="events" :fields="fields" class='text-left'></b-table>
          
          <table>
              <thead>
                  <th>NO.</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Point</th>
                  <th></th>
              </thead>
              <tbody>
                  <tr v-for="(event, index) in events" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ event.event_name }}</td>
                      <td>{{ event.total }}</td>
                      <td>{{ event.earn_point }}</td>
                      <td>
                        <button :disabled="buttonDisable(index)" @click="earn(index)">claim</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div> -->
  </div>
</template>

<script>
import EventListApi from "@/store/eventListApi"
import AuthUser from "@/store/AuthUser"
import UserApi from "@/store/UsersApi"
import EventService from "@/services/EventService"
import AuthService from "@/services/AuthService"
export default {
    data(){
        return{
            fields:['event_name',{key:'total', label:'Require Points'},'earn_point','earn','edit'],
            fields2:['event_name',{key:'total', label:'Require Points'},'earn_point','earn'],
            events:[],
            points:"",
            id:"",
            event_name:"",
            total:"",
            earn_point:"",
        }
    },
    created(){
        this.fetchEventList()
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
        async fetchEventList(){
            await EventListApi.dispatch("fetchEventList")
            this.events = EventListApi.getters.events
        },
        getPoint(){
            this.points = parseInt(AuthUser.getters.user.points)
        },
        earn(index){
            if(this.events[index].total<=AuthUser.getters.user.points){
                this.points+=this.events[index].earn_point
                this.$swal("Complete","Earn point from "+this.events[index].event_name,"success")
                this.events[index].button = true
                this.disableEvent(index)
                this.earnPoint(index)
            }else{
                this.$swal("Point are not enough","","error")
            }
        },
        buttonDisable(index){
            return this.events[index].button
        },
        async disableEvent(index){
            let payload = {
                id:this.events[index].id,
                event_name: this.events[index].event_name,
                earn_point: this.events[index].earn_point,
                button: true
            }   
            await EventListApi.dispatch("buttonDisable", payload)
            this.fetchEventList()
        },
        async earnPoint(index){
            let payload = {
                id: AuthUser.getters.user.id,
                points: this.points
            }
            await AuthUser.dispatch("editPoint", payload)
            await EventService.earnPoint(this.events[index].event_name, this.events[index].earn_point)
        },
    },

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
//   padding: 5px;
// }
// tr:hover {background-color: #ddd;}
.wow {
    text-align: center;
    width: 66%;
    margin: auto
}
</style>>
