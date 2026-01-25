<template>
  <div class="min-h-screen bg-[#F3F4F6] font-sans text-gray-900 pb-20">

    <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-12">

      <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
          <p class="text-gray-500 mt-2">{{ wishlistStore.totalItems }} saved items</p>
        </div>
        <router-link to="/shop" class="text-[#009200] font-bold hover:underline flex items-center gap-1">
           Continue Shopping <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </router-link>
      </header>

      <div v-if="wishlistStore.items.length === 0" class="bg-white p-20 rounded-3xl text-center shadow-sm border border-gray-100">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p class="text-gray-500 mb-8">Save items you love here to check them out later.</p>
        <router-link to="/shop" class="bg-[#009200] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007a00] transition shadow-lg">
          Explore Products
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <div
          v-for="item in wishlistStore.items"
          :key="item._id"
          class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
        >
          <!-- Discount Badge -->
          <div 
            v-if="hasDiscount(item._id)" 
            class="absolute top-3 left-3 z-20 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-black shadow-lg"
          >
            {{ getDiscountLabel(item._id) }}
          </div>

          <button
            @click="wishlistStore.removeFromWishlist(item._id)"
            class="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            title="Remove"
          >
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div class="relative w-full aspect-square bg-[#F9F9F9] rounded-xl flex items-center justify-center p-6 mb-4 overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div class="flex-1 flex flex-col">
            <div class="mb-auto">
               <p class="text-xs text-[#009200] font-bold uppercase tracking-wider mb-1">{{ item.category }}</p>
               <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#009200] transition-colors">
                 {{ item.name }}
               </h3>
               <div class="flex items-center justify-between">
                  <!-- Price with strikethrough for discounts -->
                  <div v-if="hasDiscount(item._id)" class="flex items-center gap-2">
                    <span class="text-sm text-gray-400 line-through">${{ item.price.toFixed(2) }}</span>
                    <span class="text-xl font-extrabold text-red-500">${{ getDiscountedPrice(item._id, item.price).toFixed(2) }}</span>
                  </div>
                  <span v-else class="text-xl font-extrabold text-gray-900">${{ item.price.toFixed(2) }}</span>
                  <span class="text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">In Stock</span>
               </div>
            </div>

            <button
              @click="moveToCart(item)"
              class="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#009200] transition-colors shadow-md active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              Add to Cart
            </button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useWishlistStore } from '@/stores/wishlist';
import { useCartStore } from '@/stores/cart';
import { useDiscountStore } from '@/stores/discount';
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'WishlistView',
  setup() {
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();
    const discountStore = useDiscountStore();
    const toast = useToast();

    // Fetch discounts on mount
    onMounted(() => {
      if (!discountStore.isLoaded) {
        discountStore.fetchProductDiscounts();
      }
    });

    // Discount helpers
    const hasDiscount = (productId: string) => discountStore.hasDiscount(productId);
    const getDiscountLabel = (productId: string) => discountStore.getDiscountLabel(productId);
    const getDiscountedPrice = (productId: string, originalPrice: number) => 
      discountStore.getDiscountedPrice(productId, originalPrice);

    const moveToCart = (item: any) => {
      // Calculate final price with discount if applicable
      const finalPrice = hasDiscount(item._id) 
        ? getDiscountedPrice(item._id, item.price) 
        : item.price;

      cartStore.addToCart({
        ...item,
        originalPrice: item.price,
        price: finalPrice,
        hasDiscount: hasDiscount(item._id)
      });
      wishlistStore.removeFromWishlist(item._id);

      toast.success("Moved to Cart!", {
         timeout: 2000,
         hideProgressBar: true,
      });
    };

    return { 
      wishlistStore, moveToCart, 
      hasDiscount, getDiscountLabel, getDiscountedPrice 
    };
  }
});
</script>

