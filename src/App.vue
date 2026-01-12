<template>
  <RouterView/>
</template>

<script lang = "ts">
  import Navigation from './components/navigation.vue';
  export default {
    name: 'App',
    components: {
        Navigation
    }
  }
</script>