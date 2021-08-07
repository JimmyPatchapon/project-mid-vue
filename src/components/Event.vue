<template>
  <div>
      <h1>Event</h1>
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
                      <td v-if="index===claimIndex">
                          <button @click="claimReward(index, event)">claim</button>
                      </td> 
                      <td v-if="index!==claimIndex">
                          <button :disabled="isDisabled">claimed</button>
                      </td> 
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import EventListApi from "@/store/EventListApi"
export default {
    data(){
        return{
            claimIndex:-1,
            events:[],
            id:"",
            event_name:"",
            total:"",
            earn_point:"",
            claim_button: "",
        }
    },
    created(){
        this.fetchEventList()
    },
    methods:{
        async fetchEventList(){
            await EventListApi.dispatch("fetchEventList")
            this.events = EventListApi.getters.events
        },
        claimReward(index, event){
            this.claim_button=true
            this.claimIndex=index
            this.editButton(event)
        },
        async editButton(event) {
            let cloned = JSON.parse(JSON.stringify(event))
            this.id = cloned.id
            this.claim_button=cloned.claim_button
            let payload = {
                id: this.id,
                claim_button: this.claim_button,
            }
            console.log(payload)
            await EventListApi.dispatch("editButton", payload)
            this.fetchEventList()
        },
    },
    computed:{
        isDisabled: function(){
            return this.claim_button
        }
    }
  
}
</script>

<style lang="scss" scoped>

</style>>
