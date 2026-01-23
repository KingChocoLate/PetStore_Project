<template>
  <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">

    <button
      @click.stop="toggleWishlist"
      class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm border border-gray-50"
      :class="isInWishlist ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'"
    >
      <svg class="w-5 h-5" :class="{ 'fill-current': isInWishlist }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </button>

    <div class="relative w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-6 mb-4 overflow-hidden cursor-pointer" @click="goToDetail">
      <img :src="displayImage" :alt="displayName" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
    </div>

    <div class="flex-1 flex flex-col cursor-pointer" @click="goToDetail">
      <p class="text-xs text-[#009200] font-bold uppercase tracking-wider mb-1">{{ displayCategory }}</p>
      <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#009200] transition-colors">
        {{ displayName }}
      </h3>
      <div class="mt-auto flex items-center justify-between">
         <span class="text-xl font-extrabold text-gray-900">{{ formattedPrice }}</span>

         <button
            @click.stop="addToCart"
            class="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-[#009200] transition-colors shadow-md active:scale-95"
            title="Add to Cart"
         >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
         </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'ProductCard',
  props: {
    // Supports "Shop" usage (Object passed directly)
    product: {
      type: Object,
      default: null
    },
    // Supports "Home" usage (Individual props passed)
    name: String,
    price: [String, Number],
    image: String,
    category: String,
    id: String
  },
  setup(props) {
    const router = useRouter();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const toast = useToast();

    // 1. Normalize data: Use `props.product` if available, otherwise build object from individual props
    const item = computed(() => {
       if (props.product) return props.product;

       // Fallback for Home page items
       return {
          _id: props.id || 'unknown_' + Math.random(), // Prevent crash if ID is missing
          name: props.name || 'Unknown Product',
          price: props.price || 0,
          image: props.image || '',
          category: props.category || 'Pet Product'
       };
    });

    const displayImage = computed(() => item.value.image || item.value.imageUrl || '');
    const displayName = computed(() => item.value.name);
    const displayCategory = computed(() => item.value.category || 'Pet Product');

    // Fix price formatting (Home passes "$67.67", Shop passes number 67.67)
    const formattedPrice = computed(() => {
       const p = item.value.price;
       if (typeof p === 'number') return `$${p.toFixed(2)}`;
       return p; // Assume it's already a string with $
    });

    // 2. SAFE Wishlist Check (The Fix)
    const isInWishlist = computed(() => {
       // Guard clause: If no ID or is a dummy item, return false immediately
       if (!item.value._id || typeof item.value._id === 'string' && item.value._id.startsWith('unknown')) {
           return false;
       }
       // Safe check
       return wishlistStore.items.some((i: any) => i._id === item.value._id);
    });

    const toggleWishlist = () => {
       if (!item.value._id || typeof item.value._id === 'string' && item.value._id.startsWith('unknown')) {
          toast.info("This item cannot be saved to wishlist.");
          return;
       }

       if (isInWishlist.value) {
          wishlistStore.removeFromWishlist(item.value._id);
          toast.error("Removed from Wishlist");
       } else {
          wishlistStore.addToWishlist(item.value);
          toast.success("Added to Wishlist");
       }
    };

    const addToCart = () => {
       cartStore.addToCart(item.value);
       toast.success("Added to Cart!");
    };

    const goToDetail = () => {
       // Only navigate if it's a real product with a real ID
       if (item.value._id && !String(item.value._id).startsWith('unknown')) {
          router.push(`/productDetail/${item.value._id}`);
       } else {
          // Optional: handle dummy items
          console.log("Clicked item without ID:", item.value);
       }
    };

    return {
       item, displayImage, displayName, displayCategory, formattedPrice,
       isInWishlist, toggleWishlist, addToCart, goToDetail
    };
  }
});
</script>
