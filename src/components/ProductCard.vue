<template>
  <div class="product-card group relative flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:border-green-500 hover:-translate-y-1">

    <!-- Discount Badge -->
    <div
      v-if="hasProductDiscount"
      class="absolute top-3 left-3 z-20 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-black shadow-lg"
    >
      {{ discountLabel }}
    </div>

    <!-- Low Stock Badge -->
    <div
      v-else-if="isLowStock"
      class="absolute top-3 left-3 z-20 bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-black shadow-lg flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Low {{ product.stockQuantity }}
    </div>

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
          :src="resolvedImage"
          :alt="product.name"
          class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </router-link>
    </div>

    <div class="flex flex-col flex-grow">

      <div class="flex gap-1 mb-2">
        <span v-for="i in 5" :key="i" class="text-sm" :class="i <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-200'">★</span>
      </div>

      <h3 class="font-bold text-lg text-gray-900 mb-1 leading-tight">{{ product.name }}</h3>

      <p class="text-xs text-gray-400 mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="mt-auto flex items-end justify-between">
        <div>
          <!-- Price with strikethrough for discounts -->
          <div v-if="hasProductDiscount" class="flex items-center gap-2">
            <span class="text-sm text-gray-400 line-through">${{ formattedOriginalPrice }}</span>
            <span class="text-2xl font-bold text-red-500">${{ formattedDiscountedPrice }}</span>
          </div>
          <span v-else class="block text-2xl font-bold text-[#009200]">${{ formattedOriginalPrice }}</span>
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
import { defineComponent, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useDiscountStore } from '@/stores/discount';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const BACKEND_URL = "https://petstore-backend-api.onrender.com";

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
    const wishlistStore = useWishlistStore();
    const discountStore = useDiscountStore();
    const authStore = useAuthStore();
    const router = useRouter();

    // Fetch discounts if not loaded
    onMounted(() => {
      if (!discountStore.isLoaded) {
        discountStore.fetchProductDiscounts();
      }
    });

    // Check if product has discount
    const hasProductDiscount = computed(() => {
      return discountStore.hasDiscount(props.product._id);
    });

    // Get discount label (e.g., "-20%")
    const discountLabel = computed(() => {
      return discountStore.getDiscountLabel(props.product._id);
    });

    // Check for Low Stock (e.g., <= 5 items)
    const isLowStock = computed(() => {
      return (props.product.stockQuantity || 0) > 0 && (props.product.stockQuantity || 0) <= 5;
    });

    // Original price formatted
    const formattedOriginalPrice = computed(() => {
      return Number(props.product.price).toFixed(2);
    });

    // Discounted price formatted
    const formattedDiscountedPrice = computed(() => {
      const discountedPrice = discountStore.getDiscountedPrice(props.product._id, props.product.price);
      return discountedPrice.toFixed(2);
    });

    // 👇 Helper to fix image URL (handles relative/absolute/missing)
    const resolvedImage = computed(() => {
      const path = props.product.imageUrl || props.product.image;
      if (!path) return 'https://via.placeholder.com/300';
      if (path.startsWith('http')) return path;
      return `${BACKEND_URL}${path}`;
    });

    const isWishlisted = computed(() => {
      return wishlistStore.isInWishlist(props.product._id);
    });

    const addToCart = () => {
      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        router.push('/login');
        return;
      }

      // Pass the discounted price if applicable
      const finalPrice = hasProductDiscount.value
        ? discountStore.getDiscountedPrice(props.product._id, props.product.price)
        : props.product.price;

      cartStore.addToCart({
        ...props.product,
        image: resolvedImage.value,
        originalPrice: props.product.price,
        price: finalPrice,
        hasDiscount: hasProductDiscount.value
      });
    };

    const toggleWishlist = () => {
      wishlistStore.toggleWishlist({
        ...props.product,
        image: resolvedImage.value // Force use of the resolved URL
      });
    };

    return {
      formattedOriginalPrice,
      formattedDiscountedPrice,
      addToCart,
      isWishlisted,
      toggleWishlist,
      resolvedImage,
      hasProductDiscount,
      discountLabel,
      isLowStock
    };
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

