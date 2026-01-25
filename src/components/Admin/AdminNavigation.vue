<template>
  <header class="w-full h-20 flex items-center justify-between px-6 lg:px-10 bg-[#F8FAFC] sticky top-0 z-30">

    <div>
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">{{ title }}</h1>
    </div>

    <div class="flex items-center gap-4">

      <div class="hidden md:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all w-64">
        <svg class="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input
          v-model="query"
          type="text"
          placeholder="Search..."
          class="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 placeholder-slate-400 w-full"
        >
      </div>

      <!-- Notification Bell -->
      <div class="relative">
        <button @click="toggleNotifications" class="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span v-if="totalNotifications > 0" class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white text-[10px] font-bold text-white flex items-center justify-center">
            {{ totalNotifications > 9 ? '9+' : totalNotifications }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <transition name="fade">
          <div v-if="notifOpen" class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
            <div class="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h4 class="font-bold text-slate-900 text-sm">Notifications</h4>
              <span class="text-xs font-bold text-slate-400">{{ totalNotifications }} alerts</span>
            </div>

            <div class="max-h-80 overflow-y-auto divide-y divide-slate-50">
              <!-- New Orders -->
              <router-link v-if="notifications.newOrders > 0" to="/admin/orders" @click="notifOpen = false" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                <div class="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-900">{{ notifications.newOrders }} New Orders</p>
                  <p class="text-xs text-slate-500">Received in last 24 hours</p>
                </div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              </router-link>

              <!-- Pending Payments -->
              <router-link v-if="notifications.pendingPayments > 0" to="/admin/orders" @click="notifOpen = false" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                <div class="w-9 h-9 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-900">{{ notifications.pendingPayments }} Pending Payments</p>
                  <p class="text-xs text-slate-500">Awaiting payment confirmation</p>
                </div>
                <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
              </router-link>

              <!-- Low Stock -->
              <router-link v-if="notifications.lowStock > 0" to="/admin/products" @click="notifOpen = false" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                <div class="w-9 h-9 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-900">{{ notifications.lowStock }} Low Stock Items</p>
                  <p class="text-xs text-slate-500">Less than 5 units remaining</p>
                </div>
                <div class="w-2 h-2 bg-rose-500 rounded-full"></div>
              </router-link>

              <!-- New Customers -->
              <router-link v-if="notifications.newCustomers > 0" to="/admin/customers" @click="notifOpen = false" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer">
                <div class="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-900">{{ notifications.newCustomers }} New Customers</p>
                  <p class="text-xs text-slate-500">Registered today</p>
                </div>
                <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </router-link>

              <!-- Empty State -->
              <div v-if="totalNotifications === 0" class="py-8 text-center">
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p class="text-sm font-medium text-slate-500">All caught up!</p>
                <p class="text-xs text-slate-400">No new notifications</p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="relative">
        <button @click="toggleMenu" class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-white transition cursor-pointer">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-slate-900 leading-tight">{{ name }}</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#CBDAAF] border-2 border-white shadow-sm flex items-center justify-center text-slate-800 font-bold text-sm">
            {{ initials }}
          </div>
        </button>

        <transition name="fade">
          <div v-if="menuOpen" class="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
            <div class="p-2 space-y-1">
              <button class="w-full text-left px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition">Profile</button>
              <button class="w-full text-left px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition">Settings</button>
            </div>
            <div class="h-px bg-slate-50 my-1"></div>
            <div class="p-2">
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition">Logout</button>
            </div>
          </div>
        </transition>
      </div>

    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: "AdminNavigation",
  props: {
    title: { type: String, required: true },
    name: { type: String, required: true },
  },
  emits: ["search-change"],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const router = useRouter();
    const query = ref("");
    const menuOpen = ref(false);
    const notifOpen = ref(false);

    // Notification data
    const notifications = ref({
      newOrders: 0,
      pendingPayments: 0,
      lowStock: 0,
      newCustomers: 0
    });

    const totalNotifications = computed(() => {
      return notifications.value.newOrders +
             notifications.value.pendingPayments +
             notifications.value.lowStock +
             notifications.value.newCustomers;
    });

    const initials = computed(() => {
      const parts = (props.name || "A").split(" ");
      const first = parts[0]?.[0] ?? "A";
      const second = parts.length > 1 ? (parts[1]?.[0] ?? "") : "";
      return first + second;
    });

    const getAuthHeader = () => {
      let token = authStore.token || localStorage.getItem('token');
      if (!token) {
        const stored = localStorage.getItem('userInfo');
        if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchNotifications = async () => {
      try {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Fetch data in parallel
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/orders`, getAuthHeader()),
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/auth/users`, getAuthHeader()).catch(() => ({ data: [] }))
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;
        const users = usersRes.data;

        // Calculate notifications
        notifications.value = {
          // Orders from last 24 hours
          newOrders: orders.filter((o: any) => new Date(o.createdAt) >= yesterday).length,
          // Orders awaiting payment
          pendingPayments: orders.filter((o: any) => !o.isPaid && o.status !== 'Cancelled').length,
          // Products with low stock (< 5)
          lowStock: products.filter((p: any) => p.stockQuantity < 5).length,
          // Users registered today
          newCustomers: users.filter((u: any) => new Date(u.createdAt).toDateString() === now.toDateString()).length
        };
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
      if (menuOpen.value) notifOpen.value = false;
    };

    const toggleNotifications = () => {
      notifOpen.value = !notifOpen.value;
      if (notifOpen.value) menuOpen.value = false;
    };

    const handleLogout = () => {
      authStore.logout();
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      router.push('/login');
    };

    // Close dropdowns on click outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        menuOpen.value = false;
        notifOpen.value = false;
      }
    };

    onMounted(() => {
      fetchNotifications();
      // Refresh notifications every 60 seconds
      const interval = setInterval(fetchNotifications, 60000);
      document.addEventListener('click', handleClickOutside);

      onUnmounted(() => {
        clearInterval(interval);
        document.removeEventListener('click', handleClickOutside);
      });
    });

    return {
      query, menuOpen, notifOpen, initials, toggleMenu, toggleNotifications, handleLogout,
      notifications, totalNotifications
    };
  },
  watch: {
    query(val) { this.$emit("search-change", val); }
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>

