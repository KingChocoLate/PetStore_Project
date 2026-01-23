<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
    <div class="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
      <h1 class="text-3xl font-bold mb-8">Order History</h1>

      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="h-40 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"></div>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
        <div class="w-20 h-20 bg-green-50 text-[#009200] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <h2 class="text-xl font-bold mb-2">No orders yet</h2>
        <p class="text-gray-500 mb-8">Once you order, your history will appear here.</p>
        <router-link to="/shop" class="px-8 py-3 bg-[#009200] text-white font-bold rounded-lg shadow hover:bg-[#007a00] transition">Start Shopping</router-link>
      </div>

      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order._id" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
          <div class="bg-gray-50/50 p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Placed</p>
              <p class="font-bold text-gray-900">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="space-y-1">
               <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</p>
               <p class="font-bold text-[#009200]">${{ order.totalPrice.toFixed(2) }}</p>
            </div>
            <div class="ml-auto">
               <span :class="{
                 'bg-yellow-100 text-yellow-700': order.status === 'Pending',
                 'bg-blue-100 text-blue-700': order.status === 'Shipped',
                 'bg-green-100 text-green-700': order.status === 'Delivered'
               }" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                 {{ order.status || 'Pending' }}
               </span>
            </div>
          </div>

          <div class="p-6 space-y-4">
            <div v-for="item in order.orderItems" :key="item._id" class="flex items-center gap-4">
               <div class="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 p-1">
                 <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply" />
               </div>
               <div>
                 <h4 class="font-bold text-gray-900">{{ item.name }}</h4>
                 <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/services/api';

export default defineComponent({
  name: 'OrderHistory',
  setup() {
    const orders = ref<any[]>([]);
    const loading = ref(true);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    };

    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/myorders');
        orders.value = response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => fetchOrders());
    return { orders, loading, formatDate };
  }
});
</script>
