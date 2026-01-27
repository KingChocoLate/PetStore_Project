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

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
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

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-amber-50 text-amber-600 rounded-2xl">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Blocked</p>
          <p class="text-2xl font-black text-slate-900">{{ customers.filter(c => c.isBlocked).length }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-purple-50 text-purple-600 rounded-2xl">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">New Today</p>
          <p class="text-2xl font-black text-slate-900">{{ newTodayCount }}</p>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
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
              <th class="py-4 px-6">Status</th>
              <th class="py-4 px-6">Joined</th>
              <th class="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="c in filteredCustomers" :key="c._id" class="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#CBDAAF] text-slate-800 flex items-center justify-center font-bold text-sm shadow-sm border border-white">
                    {{ c.firstName?.[0] || '?' }}
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
              <td class="py-4 px-6">
                <span class="px-3 py-1 rounded-full text-xs font-bold border"
                  :class="c.isBlocked ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'">
                  {{ c.isBlocked ? 'Blocked' : 'Active' }}
                </span>
              </td>
              <td class="py-4 px-6 text-slate-500 font-medium">{{ formatDate(c.createdAt) }}</td>
              <td class="py-4 px-6 text-right">
                <div class="flex gap-2 justify-end">
                  <button 
                    @click="openUserDetails(c)"
                    class="text-slate-500 hover:text-slate-700 font-bold text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition"
                  >
                    Details
                  </button>
                  <button 
                    v-if="c.role !== 'admin'"
                    @click="toggleBlock(c)"
                    class="font-bold text-xs px-3 py-1.5 rounded-lg border transition"
                    :class="c.isBlocked ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'"
                  >
                    {{ c.isBlocked ? 'Unblock' : 'Block' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Details Modal -->
    <transition name="fade">
      <div v-if="showModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 class="text-xl font-black text-slate-900">Customer Details</h3>
              <p class="text-xs font-bold text-slate-400 mt-1">{{ selectedUser.email }}</p>
            </div>
            <button @click="closeModal" class="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="p-8 overflow-y-auto flex flex-col gap-6">

            <!-- User Info Card -->
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 rounded-full bg-[#CBDAAF] text-slate-800 flex items-center justify-center font-black text-2xl shadow-sm border-2 border-white">
                  {{ selectedUser.firstName?.[0] || '?' }}
                </div>
                <div>
                  <p class="font-black text-slate-900 text-lg">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize"
                      :class="selectedUser.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'">
                      {{ selectedUser.role }}
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      :class="selectedUser.isBlocked ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'">
                      {{ selectedUser.isBlocked ? 'Blocked' : 'Active' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200/50">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                  <p class="text-sm font-bold text-slate-900">{{ selectedUser.email }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase">Member Since</p>
                  <p class="text-sm font-bold text-slate-900">{{ formatDate(selectedUser.createdAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Order History -->
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div class="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Order History</h4>
                <span class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold">
                  {{ userOrders.length }} orders
                </span>
              </div>
              <div class="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div v-if="loadingOrders" class="p-8 flex justify-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                </div>
                <div v-else-if="userOrders.length === 0" class="p-6 text-center text-slate-400 text-sm">
                  No orders found for this customer.
                </div>
                <div v-else v-for="order in userOrders" :key="order._id" class="flex items-center justify-between p-4 hover:bg-slate-50 transition">
                  <div>
                    <p class="font-mono text-xs font-bold text-slate-500">#{{ order._id.slice(-6).toUpperCase() }}</p>
                    <p class="text-xs text-slate-400 mt-0.5">{{ formatDate(order.createdAt) }}</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      :class="getOrderStatusClass(order.status)">
                      {{ order.status }}
                    </span>
                    <span class="font-black text-slate-900 text-sm">{{ formatMoney(order.totalPrice) }}</span>
                  </div>
                </div>
              </div>
              <div v-if="userOrders.length > 0" class="px-5 py-3 bg-slate-900 text-white flex justify-between items-center">
                <span class="font-bold text-sm">Total Spent</span>
                <span class="font-black text-lg">{{ formatMoney(totalSpent) }}</span>
              </div>
            </div>

            <!-- Admin Notes (Local Storage) -->
            <div class="space-y-3">
              <label class="text-xs font-bold text-slate-500 uppercase">Admin Notes</label>
              <textarea 
                v-model="adminNotes"
                @blur="saveNotes"
                rows="3"
                placeholder="Add notes about this customer..."
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition resize-none"
              ></textarea>

            </div>

          </div>

          <div class="p-6 bg-slate-50 border-t border-slate-100 flex justify-between gap-3">
            <button 
              v-if="selectedUser.role !== 'admin'"
              @click="toggleBlock(selectedUser); closeModal();"
              class="px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
              :class="selectedUser.isBlocked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-rose-600 text-white hover:bg-rose-700'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="selectedUser.isBlocked" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
              {{ selectedUser.isBlocked ? 'Unblock User' : 'Block User' }}
            </button>
            <div v-else></div>
            <button @click="closeModal" class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition">
              Done
            </button>
          </div>

        </div>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="fade">
      <div v-if="toast" class="fixed bottom-6 right-6 z-[100] bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold">
        <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        {{ toast }}
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: 'Customers',
  props: ['globalSearch'],
  setup(props) {
    const authStore = useAuthStore();
    const customers = ref<any[]>([]);
    const loading = ref(true);
    const search = ref('');
    const toast = ref('');

    // Watch global search
    watch(() => props.globalSearch, (newVal) => {
      search.value = newVal || '';
    });

    // Modal state
    const showModal = ref(false);
    const selectedUser = ref<any>(null);
    const userOrders = ref<any[]>([]);
    const loadingOrders = ref(false);
    const adminNotes = ref('');

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
        c.firstName?.toLowerCase().includes(q) ||
        c.lastName?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      );
    });

    const newTodayCount = computed(() => {
      const today = new Date().toDateString();
      return customers.value.filter(c => new Date(c.createdAt).toDateString() === today).length;
    });

    const totalSpent = computed(() => {
      return userOrders.value.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    });

    const formatDate = (iso: string) => {
      if (!iso) return '-';
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatMoney = (n: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);
    };

    const showToast = (msg: string) => {
      toast.value = msg;
      setTimeout(() => { toast.value = ''; }, 3000);
    };

    const toggleBlock = async (user: any) => {
      const newStatus = !user.isBlocked;
      try {
        // Attempt to update via API (graceful fallback if endpoint doesn't exist)
        await axios.put(`${API_BASE}/auth/users/${user._id}/block`, { isBlocked: newStatus }, getAuthHeader());
        user.isBlocked = newStatus;
        showToast(newStatus ? 'User blocked' : 'User unblocked');
      } catch (error: any) {
        // If API doesn't support block, update locally (UI-only for demo)
        if (error.response?.status === 404) {
          user.isBlocked = newStatus;
          showToast(`${newStatus ? 'Blocked' : 'Unblocked'} (API not available)`);
        } else {
          console.error(error);
          showToast('Failed to update user status');
        }
      }
    };

    const fetchUserOrders = async (userId: string) => {
      loadingOrders.value = true;
      userOrders.value = [];
      try {
        const { data } = await axios.get(`${API_BASE}/orders`, getAuthHeader());
        // Filter orders by user ID
        userOrders.value = data.filter((o: any) => o.user?._id === userId);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        loadingOrders.value = false;
      }
    };

    const openUserDetails = async (user: any) => {
      selectedUser.value = user;
      showModal.value = true;
      // Load notes from localStorage
      adminNotes.value = localStorage.getItem(`admin_notes_${user._id}`) || '';
      // Fetch orders
      await fetchUserOrders(user._id);
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
      userOrders.value = [];
    };

    const saveNotes = () => {
      if (selectedUser.value) {
        localStorage.setItem(`admin_notes_${selectedUser.value._id}`, adminNotes.value);
        showToast('Notes saved');
      }
    };

    const getOrderStatusClass = (status: string) => {
      const map: Record<string, string> = {
        'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Pending': 'bg-amber-50 text-amber-700 border-amber-100',
        'Shipped': 'bg-blue-50 text-blue-700 border-blue-100',
        'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'Cancelled': 'bg-rose-50 text-rose-700 border-rose-100',
        'Processing': 'bg-indigo-50 text-indigo-700 border-indigo-100'
      };
      return map[status] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    onMounted(fetchCustomers);

    return { 
      customers, loading, search, filteredCustomers, formatDate, formatMoney,
      newTodayCount, toggleBlock, toast,
      showModal, selectedUser, openUserDetails, closeModal,
      userOrders, loadingOrders, totalSpent, getOrderStatusClass,
      adminNotes, saveNotes
    };
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
