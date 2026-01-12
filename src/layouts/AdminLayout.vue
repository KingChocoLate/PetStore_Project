<template>
    <div class="flex">
        <SideBar />
        <RouterView />
    </div>
    
</template>

<script lang="ts">
    import SideBar from '@/components/Admin/SideBar.vue';
    export default {
        name: 'AdminLayout',
        components: {
            SideBar
        }
    }
</script>