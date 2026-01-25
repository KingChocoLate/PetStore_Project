<template>
  <div class="min-h-screen bg-[#F3F4F6] font-sans text-gray-900 pb-20">

    <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-12">

      <header class="mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Shopping Bag</h1>
        <p class="text-gray-500">{{ cartStore.totalItems }} items in your bag</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <div class="lg:col-span-8 space-y-6">

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
             <div class="flex justify-between text-sm font-bold mb-2">
               <span v-if="subtotal >= 50" class="text-[#009200] flex items-center gap-2">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                 You've unlocked Free Shipping!
               </span>
               <span v-else class="text-gray-600 flex items-center gap-2">
                 <svg class="w-5 h-5 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Spend <span class="text-[#009200] ml-1">${{ (50 - subtotal).toFixed(2) }}</span>&nbsp;more for Free Shipping
               </span>
               <span class="text-gray-400">{{ Math.min((subtotal / 50) * 100, 100).toFixed(0) }}%</span>
             </div>
             <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
               <div
                 class="h-full bg-gradient-to-r from-green-400 to-[#009200] transition-all duration-1000 ease-out"
                 :style="{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }"
               ></div>
             </div>
          </div>

          <div v-if="cartStore.items.length === 0" class="bg-white p-16 rounded-3xl text-center shadow-sm border border-gray-100">
            <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
            <p class="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't made your choice yet. Explore our premium products for your furry friend.</p>
            <router-link to="/shop" class="inline-flex items-center gap-2 bg-[#009200] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#007a00] transition shadow-lg shadow-green-200 hover:-translate-y-1">
              Start Shopping
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </router-link>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item._id"
              class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition hover:shadow-md group"
            >
              <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex-shrink-0 p-2 border border-gray-100">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
              </div>

              <div class="flex-1 text-center sm:text-left w-full">
                <div class="flex justify-between items-start mb-2">
                   <div>
                      <h3 class="text-lg font-bold text-gray-900 line-clamp-1">{{ item.name }}</h3>
                      <p class="text-sm text-gray-500 font-medium">{{ item.category }}</p>
                      <!-- Show discount badge if applicable -->
                      <span v-if="item.hasDiscount" class="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600">DISCOUNTED</span>
                   </div>
                   <button
                      @click="cartStore.removeFromCart(item._id)"
                      class="text-gray-300 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-full"
                      title="Remove Item"
                   >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                   </button>
                </div>

                <div class="flex items-center justify-between mt-4">
                   <div class="flex items-center bg-gray-100 rounded-lg p-1">
                      <button @click="cartStore.updateQuantity(item._id, -1)" class="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#009200] font-bold transition disabled:opacity-50">-</button>
                      <span class="w-10 text-center font-bold text-gray-900">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item._id, 1)" class="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-[#009200] font-bold transition">+</button>
                   </div>

                   <div class="text-right">
                      <p class="text-xs text-gray-400 mb-0.5">Total</p>
                      <!-- Show strikethrough for discounted items -->
                      <div v-if="item.hasDiscount && item.originalPrice" class="flex flex-col items-end">
                        <span class="text-xs text-gray-400 line-through">${{ (item.originalPrice * item.quantity).toFixed(2) }}</span>
                        <p class="text-xl font-extrabold text-red-500">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      </div>
                      <p v-else class="text-xl font-extrabold text-[#009200]">${{ (item.price * item.quantity).toFixed(2) }}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-4">
          <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-8">
            <h3 class="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              Order Summary
            </h3>

            <div class="mb-6">
              <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Promo Code</label>
              <div class="flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 uppercase"
                >
                <button
                  @click="applyCoupon"
                  :disabled="isLoadingPromo || !couponCode"
                  class="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {{ isLoadingPromo ? '...' : 'Apply' }}
                </button>
              </div>
              <p v-if="discount > 0" class="text-xs font-bold text-green-600 mt-2">
                Coupon Applied! You saved ${{ discount.toFixed(2) }}
              </p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span class="font-bold text-gray-900">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span :class="shipping === 0 ? 'text-[#009200] font-bold' : 'font-bold text-gray-900'">
                  {{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Tax (8%)</span>
                <span class="font-bold text-gray-900">${{ tax.toFixed(2) }}</span>
              </div>

              <div v-if="discount > 0" class="flex justify-between text-[#009200]">
                <span>Discount</span>
                <span class="font-bold">-${{ discount.toFixed(2) }}</span>
              </div>

              <div class="h-px bg-gray-100 my-4"></div>

              <div class="flex justify-between items-end">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-3xl font-extrabold text-[#009200]">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <router-link to="/checkout" class="block w-full">
              <button
                class="w-full bg-[#000800] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-[#007a00] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                :disabled="cartStore.items.length === 0"
                :class="{ 'opacity-50 cursor-not-allowed': cartStore.items.length === 0 }"
              >
                Checkout Now
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </router-link>

            <p class="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               Secure Checkout
            </p>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: 'CartView',
  setup() {
    const cartStore = useCartStore();
    const toast = useToast();

    const couponCode = ref("");
    const discount = ref(0);
    const isLoadingPromo = ref(false);

    const subtotal = computed(() => cartStore.subtotal);
    const shipping = computed(() => subtotal.value > 50 ? 0 : 5.00);
    const tax = computed(() => subtotal.value * 0.08);

    // Updated total calculation
    const total = computed(() => Math.max(0, subtotal.value + shipping.value + tax.value - discount.value));

    const applyCoupon = async () => {
      if (!couponCode.value) return;
      isLoadingPromo.value = true;
      discount.value = 0; // Reset previous discount

      try {
        const { data } = await axios.post(`${API_BASE}/promotions/validate`, {
          code: couponCode.value,
          cartTotal: subtotal.value
        });

        if (data.success) {
          discount.value = data.discountAmount;
          toast.success(`Coupon applied! Saved $${data.discountAmount.toFixed(2)}`);
        }
      } catch (error: any) {
        const msg = error.response?.data?.message || "Invalid coupon code";
        toast.error(msg);
        discount.value = 0;
      } finally {
        isLoadingPromo.value = false;
      }
    };

    return {
      cartStore, subtotal, shipping, tax, total,
      couponCode, discount, applyCoupon, isLoadingPromo
    };
  }
});
</script>
