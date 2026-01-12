<template>
    <div class="summary min-w-[250px] h-[120px] grid grid-rows-2 border-2 border-[#008C00] rounded-[7px] bg-white pl-[17px]">
        <div class="flex justify-between items-center pr-11">
            <p class="font-poppins-regular text-[10px] text-black">{{ title }}</p>
            <img :src="icon" alt="">
        </div>

        <div class="flex justify-between items-center pr-[17px]">
            <p v-if="title === 'Total sales'" class="font-poppins-medium text-[20px] text-black">${{ total }}</p>
            <p v-else class="font-poppins-medium text-[20px] text-black">{{ total }}</p>
            <div class="font-poppins-regular flex flex-col items-center">
                <p class="text-[12px] text-[#13AD13]">{{ gain }}%</p>
                <p class="text-[8px] text-[#8D8D8D]">against last month</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Summary',
        props: {
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            total: {
                type: Number,
                default: 0
            },
            gain: {
                type: Number,
                default: 0
            }
        }
    }
</script>