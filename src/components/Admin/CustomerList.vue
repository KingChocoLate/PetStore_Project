<template>
  <div class="w-full h-full p-6 font-sans bg-gray-50/50">
    
    <div class="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 bg-green-100 text-green-600 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Total Customers</p>
          <p class="text-2xl font-bold text-gray-800">1,240</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 bg-blue-100 text-blue-600 rounded-full">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Active Now</p>
          <p class="text-2xl font-bold text-gray-800">84</p>
        </div>
      </div>

       <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="p-3 bg-orange-100 text-orange-600 rounded-full">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Avg. Spend</p>
          <p class="text-2xl font-bold text-gray-800">$150</p>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-bold text-black mb-4">Customer List</h2>

    <div class="flex flex-col gap-3 w-full">
      
      <div v-if="loading" class="space-y-3 w-full">
         <div v-for="n in 3" :key="n" class="h-16 bg-gray-100 rounded-lg animate-pulse w-full"></div>
      </div>

      <div v-else-if="error" class="p-4 bg-red-50 text-red-500 rounded-lg border border-red-200 text-center">
        {{ error }}
      </div>

      <div v-else-if="customers.length === 0" class="text-center py-10 text-gray-500">
        No customers found.
      </div>

      <div 
        v-else 
        v-for="customer in customers" 
        :key="customer.id"
        class="w-full bg-white border border-[#4ade80] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 transition-shadow hover:shadow-md"
      >
        <div class="flex items-center gap-3 w-full md:w-1/4 min-w-[200px]">
          <img 
            :src="customer.avatar" 
            :alt="customer.name" 
            class="w-10 h-10 rounded-full object-cover bg-gray-200"
          >
          <span class="font-medium text-gray-800">{{ customer.name }}</span>
        </div>

        <div class="text-gray-600 text-sm md:w-1/4 truncate">
          {{ customer.email }}
        </div>

        <div class="text-gray-800 font-medium w-20 text-center">
          {{ customer.orders }}
        </div>

        <div class="text-gray-800 font-medium w-24">
          ${{ customer.spent }}
        </div>

        <div class="w-24">
          <span class="text-gray-800">{{ customer.status }}</span>
        </div>

        <div class="flex items-center gap-3 ml-auto">
          <button class="relative bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap">
            Message
            <span v-if="customer.hasNotification" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-2 mt-8">
      <div class="w-8 h-8 flex items-center justify-center bg-[#dcfce7] text-green-800 font-bold rounded">1</div>
      <span class="text-gray-500 font-medium text-lg">/</span>
      <span class="text-gray-800 font-medium text-lg">1</span>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 1. Strict Typing for Data
interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: 'Active' | 'Inactive';
  avatar: string;
  hasNotification: boolean;
}

export default defineComponent({
  name: 'CustomerList',
  
  data() {
    return {
      customers: [] as Customer[],
      loading: true,
      error: null as string | null,
    };
  },

  mounted() {
    this.fetchCustomers();
  },

  methods: {
    async fetchCustomers() {
      this.loading = true;
      try {
        // --- SIMULATING API CALL ---
        await new Promise(resolve => setTimeout(resolve, 600));

        // Generating mock data that matches your screenshot EXACTLY
        this.customers = Array.from({ length: 6 }).map((_, i) => ({
          id: i + 1,
          name: 'Sophat Odom',
          email: 'abc123@gmail.com',
          orders: 5,
          spent: 150,
          status: 'Active',
          avatar: `https://i.pravatar.cc/150?u=${i + 10}`, // Dynamic avatar generator
          hasNotification: true // Shows the red dot
        }));

      } catch (err) {
        this.error = "Failed to load customers.";
      } finally {
        this.loading = false;
      }
    }
  }
});
</script>