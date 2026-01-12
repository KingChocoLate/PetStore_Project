<template>
    <div class="navigation w-full h-[72px] bg-[#F6F6F6] flex items-center justify-between text-black pl-[25px] pr-[70px]">
        <h1 class="font-poppins-semiBold text-[20px]">{{ title }}</h1>
        <div class="flex gap-[30px] items-center">
            <img src="../../assets/search.svg" alt="">
            <img src="../../assets/Admin_icons/NavBar/notifications.svg" alt="">
            <img src="../../assets/Admin_icons/NavBar/profile.svg" alt="">
            <div>
                <p class="font-poppins-medium text-[15px]">{{ name }}</p>
                <p class="font-poppins-regular text-[10px]">Admin</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'AdminNavigation',
        props: {
            title: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>