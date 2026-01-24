<template>
  <div class="w-full min-h-screen">

    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">Customers</h1>
        <p class="text-slate-500 mt-1 font-medium">View and manage your user base.</p>
      </div>
      <div class="flex gap-3">
        <div class="relative">
          <input v-model="search" type="text" placeholder="Search customers..." class="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-64 shadow-sm transition">
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Total Users</p>
          <p class="text-2xl font-black text-slate-900">{{ customers.length }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Admins</p>
          <p class="text-2xl font-black text-slate-900">{{ customers.filter(c => c.role === 'admin').length }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="p-12 flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>

      <div v-else-if="filteredCustomers.length === 0" class="p-12 text-center text-slate-500 font-medium">
        No customers found matching your search.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th class="py-4 px-6">User</th>
              <th class="py-4 px-6">Email</th>
              <th class="py-4 px-6">Role</th>
              <th class="py-4 px-6">Joined</th>
              <th class="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="c in filteredCustomers" :key="c._id" class="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#CBDAAF] text-slate-800 flex items-center justify-center font-bold text-sm shadow-sm border border-white">
                    {{ c.firstName[0] }}
                  </div>
                  <span class="font-bold text-slate-900">{{ c.firstName }} {{ c.lastName }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-slate-600 font-medium">{{ c.email }}</td>
              <td class="py-4 px-6">
                <span class="px-3 py-1 rounded-full text-xs font-bold border capitalize"
                  :class="c.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'">
                  {{ c.role }}
                </span>
              </td>
              <td class="py-4 px-6 text-slate-500 font-medium">{{ formatDate(c.createdAt) }}</td>
              <td class="py-4 px-6 text-right">
                <button class="text-slate-400 hover:text-slate-600 font-bold text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition">
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: 'Customers',
  setup() {
    const authStore = useAuthStore();
    const customers = ref<any[]>([]);
    const loading = ref(true);
    const search = ref('');

    const getAuthHeader = () => {
      let token = authStore.token;
      if (!token) {
         const stored = localStorage.getItem('userInfo');
         if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchCustomers = async () => {
      loading.value = true;
      try {
        const { data } = await axios.get(`${API_BASE}/auth/users`, getAuthHeader());
        customers.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const filteredCustomers = computed(() => {
      if (!search.value) return customers.value;
      const q = search.value.toLowerCase();
      return customers.value.filter(c =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    });

    const formatDate = (iso: string) => {
      if (!iso) return '-';
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    onMounted(fetchCustomers);

    return { customers, loading, search, filteredCustomers, formatDate };
  }
});
</script>
