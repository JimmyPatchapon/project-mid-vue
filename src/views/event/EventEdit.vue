<template>
    <div class='text-center wow'>
        <h1>Edit Event {{ id }}</h1>
        <div>
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

      <b-button @click="editEvent()" type="submit" variant="primary">Confirm Edit</b-button>
      <span></span>
      <b-button @click="deleteEvent()" variant='danger'>Delete</b-button>

    </b-form>
  </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import EventApiStore from "@/store/eventListApi.js"
export default {
    props: ['checked'],
data() {
    return {
      id: '',
      form: {
        event_name: '',
        earn_point: '',
        total: '',
        button: ''
      }
    }
  },
    async created() {
    this.id = this.$route.params.id
    let event = await EventService.getEventById(this.id)
    this.form.event_name = event.event_name
    this.form.earn_point = event.earn_point
    this.form.total = event.total
    this.form.button = event.button
  },
    methods: {
    async editEvent() {
      let payload = {
        id: this.id,
        event_name: this.form.event_name,
        earn_point: this.form.earn_point,
        total: this.form.total,
        button: this.form.button
      }
      let res = await EventApiStore.dispatch('editEvent', payload)
      if(res.success) {
        this.$router.push("/eventList")
      } else {
        this.$swal("Edit Failed", res.message, "error")
      }
    },        
    async deleteEvent() {
      let payload = {
        id: this.id
      }
      let res = await EventApiStore.dispatch('deleteEvent', payload)
      if(res.success) {
        this.$router.push("/eventList")
      } else {
        this.$swal("Delete Failed", res.message, "error")
      }
    }

}

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