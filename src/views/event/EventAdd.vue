<template>
         <div class="text-center wow">
             <h1>Add Event</h1>
            <b-form @submit.stop.prevent>
            <b-form-group
                id="input-group-1"
                label="Event Name"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.event_name"
                type="text"
                placeholder="Event Name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Earning Points" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.earn_point"
                placeholder="Enter Earning Points"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Required Points" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="form.total"
                placeholder="Enter Required Points"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-checkbox
                id="checkbox-1"
                v-model="form.button"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
                :checked='form.button === "true"'
                >
                Enabled
            </b-form-checkbox>
            <br>

      <b-button @click="addEvent()" type="submit" variant="primary">Confirm Add</b-button>
      <span></span>
    </b-form>
  </div> 
</template>

<script>
import EventApiStore from '@/store/eventListApi'
export default {
    data() {
        return {
            form: {
                event_name: '',
                earn_point: '',
                total: '',
                button: ''
            }
        }
    },
    methods: {
        async addEvent(){
            let payload ={
                event_name:this.form.event_name,
                earn_point: parseInt(this.form.earn_point),
                total: parseInt(this.form.total),
                button: this.form.button
            }
            let res = await EventApiStore.dispatch("addEvent", payload)
            if(res.success){
                this.$swal("Add Success",payload.event_name+" is created","success")
                this.$router.push("/eventList")
            }else{
                this.$swal("Add failed",res.message,"error")
            }
        },
    },    

}
</script>

<style scoped lang='scss'>
.wow {
    text-align: center;
    width: 45%;
    margin: auto
}
span {
    margin-right: 5px;
}
</style>