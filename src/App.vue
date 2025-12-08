<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang = "ts">
  // Since we are removing the component from the template, we remove the import and declaration as well.
  export default {
    name: 'App',
    // The components object is now empty or removed since Navigation is gone.
    // If you had other persistent components, they would remain here.
    components: {
      // No components are imported here now
    }
  }
</script>

<style scoped>
  #app {
    /* Ensures the application container takes up at least the full height of the viewport */
    min-height: 100vh;
  }
</style>
