<script setup>
const props = defineProps({
  buttonTittle: String
});
</script>
<template>
  <button 
    class="w-full bg-white border-2 border-solid border-[#008C00] text-[#008C00] text-md font-semibold py-2 px-4 rounded-[10px] hover:bg-[#008C00] hover:text-white transition-colors active:scale-95 flex items-center justify-center gap-2"
    @click="$emit('click')"
  >
    {{ props.buttonTittle }}
  </button>
</template>