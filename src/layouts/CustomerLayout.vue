<template>
    <Navigation />
    <RouterView />
</template>
<script lang="ts">
    import Navigation from '../components/navigation.vue';
    export default {
        name: 'CustomerLayout',
        components: {
            Navigation 
        }
    }
</script>