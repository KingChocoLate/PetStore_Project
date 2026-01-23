<template>
  <div class="min-h-screen flex flex-col bg-white font-poppins">
    <Navigation />

    <main class="flex-grow">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '../components/navigation.vue';
import AppFooter from '../components/AppFooter.vue'; // Import renamed component

export default defineComponent({
  name: 'CustomerLayout',
  components: {
    Navigation,
    AppFooter
  }
});
</script>
