<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{date}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: (new Date()).toISOString().slice(0,10)
    }
  }
}
</script>