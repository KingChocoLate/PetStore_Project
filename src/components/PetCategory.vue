<template>
    <div class="w-[250px] h-[332px] flex-col">
        <img :src="petImg" alt="">
        <p class="mt-2.5 font-poppins-medium text-[21px] text-black text-center">{{ petName }}</p>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Category',
        props: {
            petName: String,
            petImg: String
        }
    }
</script>