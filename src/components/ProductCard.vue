<template>
  <div class="product-card group relative flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:border-green-500 hover:-translate-y-1">

    <button
      @click.prevent="toggleWishlist"
      class="absolute top-4 right-4 z-10 transition-colors duration-200 p-1"
      :class="isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-500'"
      title="Add to Wishlist"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
        :fill="isWishlisted ? 'currentColor' : 'none'"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>

    <div class="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg cursor-pointer">
      <router-link :to="{ name: 'product-detail', params: { id: product._id } }" class="w-full h-full">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </router-link>
    </div>

    <div class="flex flex-col flex-grow">

      <div class="flex gap-1 mb-2">
        <span v-for="i in 5" :key="i" class="text-orange-400 text-sm">★</span>
      </div>

      <h3 class="font-bold text-lg text-gray-900 mb-1 leading-tight">{{ product.name }}</h3>

      <p class="text-xs text-gray-400 mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="mt-auto flex items-end justify-between">
        <div>
          <span class="block text-2xl font-bold text-[#009200]">${{ formattedPrice }}</span>
          <span class="text-[10px] uppercase tracking-wide text-gray-400">{{ product.category || 'Product' }}</span>
        </div>

        <button
          @click.prevent="addToCart"
          class="bg-[#009200] hover:bg-[#007a00] text-white p-3 rounded-lg shadow-md transition-colors flex items-center justify-center active:scale-95"
          title="Add to Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist'; // 1. Import Wishlist Store

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore(); // 2. Initialize it

    const formattedPrice = computed(() => {
      return Number(props.product.price).toFixed(2);
    });

    // 3. Check if this specific item is currently in the wishlist
    const isWishlisted = computed(() => {
      return wishlistStore.isInWishlist(props.product._id);
    });

    const addToCart = () => {
      cartStore.addToCart(props.product);
    };

    // 4. Toggle function (Add/Remove)
    const toggleWishlist = () => {
      wishlistStore.toggleWishlist(props.product);
    };

    return {
      formattedPrice,
      addToCart,
      isWishlisted,
      toggleWishlist
    };
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
