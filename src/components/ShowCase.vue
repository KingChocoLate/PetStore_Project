<template>
    <div class="flex gap-[5px] overflow-hidden w-full">
        <div class="flex gap-[5px] animate-slider shrink-0">
            <img v-for="(img, index) in images" :key="'first-' + index" :src="img" alt="">
        </div>

        <div class="flex gap-[5px] animate-slider shrink-0">
            <img v-for="(img, index) in images" :key="'second-' + index" :src="img" alt="">
        </div>
    </div>
    
</template>

<script lang="ts">
import type { PropType } from 'vue';

    export default {
        name: 'ShowCase',
        props: {
            images: {
                type: Array as PropType<string[]>,
                required: true
            }
        }
    }
</script>


