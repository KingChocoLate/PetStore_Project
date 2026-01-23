<template>
  <RouterView />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Navigation from './components/navigation.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Navigation
    }
  })
</script>
