<template>
  <div class="w-full">
    
    <h3 v-if="title" class="font-poppins-semibold text-[24.10px] mb-4 text-[#181818]">
      {{ title }}
    </h3>

    <ul :class="['flex',
       layout === 'row' 
       ? 'flex-row justify-center gap-12 mb-8' :
      'flex-col gap-2.5']">
      <li 
        v-for="item in items" 
        :key="item" 
        :class="[
          'font-poppins text-[20px] transition-colors duration-200', 
          layout === 'col' ? 'pl-4' : '' 
        ]" 
      >
        <span 
          :class="[
            'text-[20px] hover:text-[#008C00]',
            activeItem === item 
                  ? 'text-[#008C00] font-poppins-semibold' // Use the forceful class
                  : 'text-[#000000] font-poppins-semibold' // Use the forceful class
          ]" 
        >
          {{ item }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'Menu',
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array as PropType<string[]>,
      required: true
    },
    layout: {
      type: String as PropType<'row' | 'col'>,
      default: 'col'
    },
    activeItem: {
      type: String,
      default: ''
    },
  },
});
</script>