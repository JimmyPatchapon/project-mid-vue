<template>
  <div>
    <event></event>
  </div>
</template>

<script>
import Event from '@/components/Event.vue'
import AuthUser from '@/store/AuthUser'
export default {
  components: { 
    Event 
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen
    }
  }
}
</script>

<style>

</style>