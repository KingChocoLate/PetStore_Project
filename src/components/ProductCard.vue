<script setup>
import { ref } from 'vue';
import { toy } from '@/assets';

const props = defineProps({
  productName: String,
  rating: Number,
  description: String,
  price: Number,
  image: String,
});

// Heart state
const liked = ref(false);
const hover = ref(false);
</script>

<template>
  <RouterLink to="/productDetail">
    <div class="w-[200px] border border-[#8A8A8A] rounded-sm overflow-hidden shadow-sm bg-white
          transition-all duration-300 hover:scale-101 hover:shadow-2xl hover:border-transparent">
      
      <!-- Image with heart icon -->
      <div 
        class="relative"
      >
        <img :src="toy" class="w-full h-48 object-cover">
        <div 
          class="absolute top-2 right-2 cursor-pointer"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          @click="liked = !liked"
        >
          <font-awesome-icon
            v-if="liked || hover"
            icon="fa-solid fa-heart"
            class="text-red-500 text-2xl transition"
          />
          <font-awesome-icon
            v-else
            icon="fa-regular fa-heart"
            class="text-black text-2xl transition"
          />
        </div>
      </div>

      <!-- Rating and product name -->
      <div class="px-1 pt-2">
        <div class="flex items-center text-xl">
          <!-- Rating stars using v-for -->
          <span class="flex gap-0.5">
            <font-awesome-icon
              v-for="i in Math.floor(props.rating ?? 0)"
              :key="'filled' + i"
              icon="fa-solid fa-star"
              class="text-[#fdbc2c]"
            />
            <font-awesome-icon
              v-for="i in 5 - Math.floor(props.rating ?? 0)"
              :key="'empty' + i"
              icon="fa-regular fa-star"
              class="text-gray-300"
            />
          </span>
        </div>

        <h1 class="text-black text-xl font-bold truncate pt-2 px-1">
          {{ props.productName }}
        </h1>

        <!-- Description -->
        <p class="text-[#B0B0B0] text-xs wrap-break-word line-clamp-3 px-1">
          {{ props.description }}
        </p>
      </div>

      <!-- Price and cart button -->
      <div class="flex items-center justify-between px-2 py-2 border-[#E0E0E0] mt-32">
        <div>
          <h3 class="text-[#008C00] text-2xl font-bold">
            ${{ props.price }}
          </h3>
        </div>
        <button class="bg-[#008C00] w-14 h-14 flex items-center justify-center rounded-sm hover:bg-green-700 transition">
          <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-white text-xl"/>
        </button>
      </div>

    </div>
  </RouterLink>
</template>
