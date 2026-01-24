<template>
  <div class="group relative bg-white rounded-[24px] border border-slate-100 p-5 flex flex-col transition-all duration-300 hover:shadow-xl hover:border-slate-200 hover:-translate-y-1">

    <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <button @click.stop="$emit('edit', product)" class="p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
      </button>
      <button @click.stop="$emit('delete', product)" class="p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>

    <div class="relative h-48 w-full bg-[#F8FAFC] rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#F1F5F9] transition-colors">
      <img
        :src="resolvedImage"
        :alt="product.name"
        class="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
      />
      <div v-if="(product.stockQuantity || product.stock || 0) < 5" class="absolute bottom-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
        Low Stock
      </div>
    </div>

    <div class="flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-1">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{{ product.category }}</span>
        <div class="flex text-amber-400">
          <svg v-for="i in 5" :key="i" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>

      <h3 class="text-base font-bold text-slate-900 leading-tight mb-auto line-clamp-2">
        {{ product.name }}
      </h3>

      <div class="mt-4 flex items-end justify-between border-t border-slate-50 pt-3">
        <div>
          <p class="text-xs font-semibold text-slate-400">Price</p>
          <p class="text-xl font-black text-slate-900">${{ formatPrice(product.price) }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs font-semibold text-slate-400">Stock</p>
          <p class="text-sm font-bold" :class="(product.stockQuantity || 0) > 0 ? 'text-emerald-600' : 'text-red-500'">
            {{ product.stockQuantity || 0 }} units
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

// 👇 Define your backend URL constant
const BACKEND_URL = "https://petstore-backend-api.onrender.com";

export default defineComponent({
  name: 'AdminProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props) {
    // 👇 Computed property to fix image URLs
    const resolvedImage = computed(() => {
      const path = props.product.imageUrl || props.product.image;
      if (!path) return 'https://via.placeholder.com/150';
      // If it starts with http, it's already a full URL (external image)
      if (path.startsWith('http')) return path;
      // Otherwise, prepend the backend URL
      return `${BACKEND_URL}${path}`;
    });

    const formatPrice = (price: number) => {
      return Number(price).toFixed(2);
    };

    return { resolvedImage, formatPrice };
  }
});
</script>
