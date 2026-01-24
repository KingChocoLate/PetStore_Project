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
import { defineComponent } from 'vue'
import AppFooter from '../components/AppFooter.vue' // Import renamed component
import Navigation from '../components/navigation.vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {
    Navigation,
    AppFooter,
  },
})
</script>
