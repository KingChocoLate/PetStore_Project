<script setup>
const props = defineProps({
  tittle: String
});
</script>
<template>
  <button 
    class="w-full bg-[#008C00] border-2 border-solid border-[#008C00] text-white text-md font-semibold py-2 px-4 rounded-[10px] hover:bg-green-700 transition-colors active:scale-95"
    @click="$emit('click')"
  >
    {{ props.tittle }}
  </button>
</template>