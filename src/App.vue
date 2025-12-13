<template>
  <div class="nav_display h-[120px]">
    <Navigation />
  </div>
  <RouterView/>
</template>

<script lang = "ts">
  export default {
    name: 'App',
    components: {
        Navigation
    }
  }
</script>