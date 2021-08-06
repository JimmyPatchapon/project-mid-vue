<template>
  <div>
      <h1>for admin</h1>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen
        }
    }
}
</script>

<style>
    h1 {
        text-align: center;
    }
</style>