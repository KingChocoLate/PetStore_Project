<script setup>
const props = defineProps({
  tittle: String
});
</script>
<template>
  <button 
    class="w-full max-w-lg bg-[#008C00] border-2 border-solid border-[#008C00] text-white text-xl font-semibold py-3 px-6 rounded-[10px] hover:bg-green-700 transition-colors active:scale-95"
    @click="$emit('click')"
  >
    {{ props.tittle }}
  </button>
</template>