<script setup>
import { ref, computed } from 'vue'
import ArrowButtonLeft from './ArrowButtonLeft.vue'
import ArrowButtonRight from './ArrowButtonRight.vue'

import dogtoy1 from '../assets/images/66026_kong_scrunch_knots_fuchs_7.webp'
import dogtoy2 from '../assets/images/66026_kong_scrunch_knots_fuchs_lifestyle_4.webp'
import dogtoy3 from '../assets/images/kong_scrunch_knots_logo_1.webp'
/**
 * MOCK DATA (replace later with backend)
 */
const images = ref([
  dogtoy1,
  dogtoy1,
  dogtoy2,
  dogtoy3
])

const currentIndex = ref(0)

/**
 * Computed current image
 */
const mainImg = computed(() => images.value[currentIndex.value])

/**
 * Handlers
 */
const nextImage = () => {
  currentIndex.value =
    (currentIndex.value + 1) % images.value.length
}

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) %
    images.value.length
}
</script>

<template>
  <div class="w-1/2 flex flex-col justify-between items-center gap-6">
    <div class="flex justify-between items-center gap-10">
    <!-- Left Arrow -->
    <ArrowButtonLeft @click="prevImage" />

    <!-- Main Image -->
    <div class="flex justify-center items-center">
      <img
        :src="mainImg"
        class="w-full object-contain"
        alt="Product image"
      />
    </div>

    <!-- Right Arrow -->
    <ArrowButtonRight @click="nextImage" />
  </div>

  <!-- Thumbnails -->
  <div class="flex gap-4 pt-10">
  <img
    v-for="(img, index) in images"
    :key="index"
    :src="img"
    @click="currentIndex = index"
    class="w-20 h-20 object-contain cursor-pointer rounded-md
           border-2 border-transparent
           hover:border-[#008C00]
           ring-offset-2 ring-offset-white transition"
    :class="{
      'ring-2 ring-[#008C00]': currentIndex === index
    }"
  />
</div>
  </div>

</template>
