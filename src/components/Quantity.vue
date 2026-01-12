<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: Infinity
  }
})

const emit = defineEmits(['update:modelValue'])

const increase = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const decrease = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const isMin = computed(() => props.modelValue <= props.min)
const isMax = computed(() => props.modelValue >= props.max)
</script>

<template>
  <div class="flex items-center gap-5">
    <!-- Minus -->
    <font-awesome-icon
      icon="minus"
      class="text-xl cursor-pointer"
      :class="isMin ? 'text-gray-300 cursor-not-allowed' : 'text-[#008C00]'"
      @click="decrease"
    />

    <!-- Quantity -->
    <span class="text-2xl text-black select-none">
      {{ modelValue }}
    </span>

    <!-- Plus -->
    <font-awesome-icon
      icon="plus"
      class="text-xl cursor-pointer"
      :class="isMax ? 'text-gray-300 cursor-not-allowed' : 'text-[#008C00]'"
      @click="increase"
    />
  </div>
</template>
