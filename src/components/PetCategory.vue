<template>
    <RouterLink to="/shop">
        <div class="w-[250px] flex flex-col items-center group cursor-pointer">
            
            <div class="w-full h-[280px] overflow-hidden rounded-xl bg-white flex justify-center items-center">
                <img 
                    :src="petImg" 
                    alt="" 
                    class="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                >
            </div>

            <p class="mt-2.5 font-poppins-medium text-[21px] text-black text-center group-hover:text-[#008C00] transition-colors duration-300">
                {{ petName }}
            </p>
        </div>
    </RouterLink>
</template>

<script lang="ts">
    export default {
        name: 'PetCategory', // Renamed to match your Home.vue import
        props: {
            petName: String,
            petImg: String
        }
    }
</script>