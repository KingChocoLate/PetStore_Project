<template>
  <div class="nav_display">
    <Navigation />
  </div>
  
</template>

<script lang="ts">
  import Navigation from './components/navigation.vue'
  export default {
    name: 'App',
    components: {
      Navigation
    }
  }
</script>

<style scoped>
  .nav_display {
    width: 100%;
  }
</style>