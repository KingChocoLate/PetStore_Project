<template>
  <div class="w-full min-h-screen bg-[#F8FAFC]">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10">

      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ currentDate }}</p>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Performance Overview</h1>
        </div>
        <div class="flex gap-3">
          <button @click="loadData" class="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
            <span v-if="isLoading" class="animate-spin h-3 w-3 border-2 border-slate-400 border-t-transparent rounded-full"></span>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            {{ isLoading ? 'Loading...' : 'Refresh Data' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div class="group relative p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-500">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.81 2.13-1.88 0-1.1-.68-1.57-1.75-1.82l-2.02-.46c-1.75-.41-3.04-1.5-3.04-3.56 0-1.77 1.29-3.06 3.2-3.4V3h2.67v1.93c1.38.3 2.48 1.34 2.63 3.03h-1.97c-.09-.86-.82-1.54-1.92-1.54-1.21 0-1.87.82-1.87 1.63 0 1.05.79 1.57 2.02 1.83l1.8.41c1.92.46 3.1 1.58 3.1 3.73 0 1.78-1.18 3.27-3.16 3.69z"></path></svg>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
          <h3 class="text-3xl font-black text-slate-900 mt-2">{{ formatMoney(stats.revenue) }}</h3>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-1 rounded-lg" :class="stats.trend >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
              {{ stats.trend >= 0 ? '+' : '' }}{{ stats.trend }}%
            </span>
            <span class="text-xs text-slate-400 font-medium">vs last month</span>
          </div>
        </div>

        <div class="group relative p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-blue-500">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
          <h3 class="text-3xl font-black text-slate-900 mt-2">{{ stats.orders }}</h3>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">{{ stats.pendingOrders }} Pending</span>
          </div>
        </div>

        <div class="group relative p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-purple-500">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11z"/><path d="M10 22h4v-5.5h-4z"/></svg>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventory</p>
          <h3 class="text-3xl font-black text-slate-900 mt-2">{{ stats.products }}</h3>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-1 rounded-lg" :class="stats.lowStock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'">
              {{ stats.lowStock > 0 ? `${stats.lowStock} Low Stock` : 'Stock Healthy' }}
            </span>
          </div>
        </div>

        <div class="group relative p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-amber-500">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
          </div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Customers</p>
          <h3 class="text-3xl font-black text-slate-900 mt-2">{{ stats.customers }}</h3>
          <div class="mt-4 flex items-center gap-2">
            <span v-if="stats.newCustomers > 0" class="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-lg">+{{ stats.newCustomers }} New</span>
            <span v-else class="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg">No new users</span>
            <span class="text-xs text-slate-400 font-medium">Today</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        <div class="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black text-slate-900">Revenue Analytics</h3>
            <span class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">2026</span>
          </div>

          <div class="relative h-64 w-full">
            <div class="absolute inset-0 flex flex-col justify-between">
              <div v-for="i in 5" :key="i" class="w-full h-px bg-slate-100"></div>
            </div>

            <svg class="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path :d="areaPath" fill="url(#chartGradient)" />
              <path :d="linePath" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" />
              <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="4" fill="#fff" stroke="#10B981" stroke-width="2" class="hover:r-6 transition-all cursor-pointer">
                <title>${{ revenueSeries[i] }}</title>
              </circle>
            </svg>
          </div>

          <div class="flex justify-between mt-4 text-xs font-semibold text-slate-400">
            <span v-for="m in ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']" :key="m">{{ m }}</span>
          </div>
        </div>

        <div class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 class="text-lg font-black text-slate-900 mb-6">Order Status</h3>

          <div class="relative flex-1 flex items-center justify-center">
            <svg viewBox="0 0 36 36" class="w-48 h-48 transform -rotate-90">
              <path class="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.8" />
              <path class="text-emerald-500 drop-shadow-md transition-all duration-1000"
                :stroke-dasharray="`${stats.paidPercent}, 100`"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" stroke-width="3.8" />
              <path class="text-amber-400 transition-all duration-1000"
                :stroke-dasharray="`${stats.pendingPercent}, 100`"
                :stroke-dashoffset="`-${stats.paidPercent}`"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="currentColor" stroke-width="3.8" />
            </svg>
            <div class="absolute text-center">
              <span class="block text-3xl font-black text-slate-900">{{ stats.orders }}</span>
              <span class="text-xs font-bold text-slate-400 uppercase">Total</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span class="text-sm font-bold text-slate-600">Paid ({{ stats.paidPercent }}%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <span class="text-sm font-bold text-slate-600">Pending ({{ stats.pendingPercent }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 class="text-lg font-black text-slate-900 mb-6">Top Selling Products</h3>
          <div class="space-y-5">
            <div v-for="(p, i) in topProducts" :key="i" class="flex flex-col gap-2">
              <div class="flex justify-between text-sm font-bold text-slate-700">
                <span>{{ p.name }}</span>
                <span>{{ p.qty }} sold</span>
              </div>
              <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-slate-800 rounded-full" :style="{ width: p.percent + '%' }"></div>
              </div>
            </div>
            <div v-if="topProducts.length === 0" class="flex flex-col items-center justify-center py-8 text-center">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <p class="text-slate-400 text-sm font-medium">No products sold yet</p>
              <p class="text-slate-300 text-xs mt-1">Sales data will appear here</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex flex-col">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900">Recent Transactions</h3>
            <router-link to="/admin/orders" class="text-sm font-bold text-blue-600 hover:underline">View All</router-link>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th class="pb-3">ID</th>
                  <th class="pb-3">Customer</th>
                  <th class="pb-3">Date</th>
                  <th class="pb-3 text-right">Amount</th>
                  <th class="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="text-sm font-medium text-slate-600">
                <tr v-if="recentOrders.length === 0">
                  <td colspan="5" class="py-6 text-center text-slate-400">No orders yet</td>
                </tr>
                <tr v-for="order in recentOrders" :key="order._id" class="group hover:bg-slate-50 transition-colors">
                  <td class="py-3 border-b border-slate-50 font-mono text-slate-400 text-xs">#{{ order._id.slice(-6).toUpperCase() }}</td>
                  <td class="py-3 border-b border-slate-50 text-slate-900 font-bold">
                    {{ order.user ? order.user.firstName + ' ' + order.user.lastName : 'Guest' }}
                  </td>
                  <td class="py-3 border-b border-slate-50 text-slate-500">{{ formatDate(order.createdAt) }}</td>
                  <td class="py-3 text-right text-slate-900 font-bold border-b border-slate-50">{{ formatMoney(order.totalPrice) }}</td>
                  <td class="py-3 text-right border-b border-slate-50">
                    <span class="px-2 py-1 rounded-lg text-[10px] font-bold border" :class="statusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Promotion Effectiveness Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div class="bg-gradient-to-br from-purple-500 to-purple-700 rounded-[32px] p-8 text-white shadow-lg">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black">Promotion Summary</h3>
            <router-link to="/admin/promotions" class="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition">Manage</router-link>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-purple-200 text-xs font-bold uppercase mb-1">Active Campaigns</p>
              <p class="text-3xl font-black">{{ promoStats.active }}</p>
            </div>
            <div>
              <p class="text-purple-200 text-xs font-bold uppercase mb-1">Total Redemptions</p>
              <p class="text-3xl font-black">{{ promoStats.totalRedemptions }}</p>
            </div>
            <div class="col-span-2 pt-4 border-t border-white/20">
              <p class="text-purple-200 text-xs font-bold uppercase mb-1">Est. Savings Given</p>
              <p class="text-2xl font-black">{{ formatMoney(promoStats.estimatedSavings) }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 class="text-lg font-black text-slate-900 mb-6">Top Performing Promos</h3>
          <div class="space-y-4 flex-1">
            <div v-for="(promo, i) in topPromos" :key="i" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  :class="promo.type === 'percent' ? 'bg-purple-500' : 'bg-emerald-500'">
                  {{ promo.type === 'percent' ? '%' : '$' }}
                </div>
                <div>
                  <p class="font-mono font-black text-slate-900">{{ promo.code }}</p>
                  <p class="text-xs text-slate-500">{{ promo.type === 'percent' ? promo.value + '% Off' : '$' + promo.value + ' Off' }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-black text-slate-900">{{ promo.usageCount || 0 }}</p>
                <p class="text-xs text-slate-500">redemptions</p>
              </div>
            </div>
            <div v-if="topPromos.length === 0" class="flex flex-col items-center justify-center py-8 text-center">
              <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
              </div>
              <p class="text-slate-400 text-sm font-medium">No redemptions yet</p>
              <p class="text-slate-300 text-xs mt-1">Promo usage will appear here</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const authStore = useAuthStore();
    const isLoading = ref(true);

    // Stats Container
    const stats = ref({
      revenue: 0,
      orders: 0,
      products: 0,
      customers: 0,
      newCustomers: 0,
      lowStock: 0,
      pendingOrders: 0,
      paidPercent: 0,
      pendingPercent: 0,
      trend: 0
    });

    // 👇 FIXED: Typed explicitly as any[] to solve TypeScript error
    const recentOrders = ref<any[]>([]);
    const topProducts = ref<{name: string, qty: number, percent: number}[]>([]);
    const topPromos = ref<any[]>([]);

    // Promotion Stats
    const promoStats = ref({
      active: 0,
      totalRedemptions: 0,
      estimatedSavings: 0
    });

    // Revenue Data for Chart (12 months)
    const revenueSeries = ref(new Array(12).fill(0));

    const getAuthHeader = () => {
      let token = authStore.token || localStorage.getItem('userToken');
      if (!token) {
         const stored = localStorage.getItem('userInfo');
         if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    const loadData = async () => {
      isLoading.value = true;
      try {
        // 1. Fetch ALL Data
        const [ordersRes, productsRes, usersRes, promosRes] = await Promise.all([
          axios.get(`${API_BASE}/orders`, getAuthHeader()),
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/auth/users`, getAuthHeader()),
          axios.get(`${API_BASE}/promotions`, getAuthHeader()).catch(() => ({ data: [] }))
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;
        const users = usersRes.data;
        const promos = promosRes.data || [];

        // --- CALCULATE KPI ---
        const totalRev = orders.filter((o: any) => o.status !== 'Cancelled').reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0);
        const paidCount = orders.filter((o: any) => o.status === 'Paid' || o.status === 'Delivered').length;
        const pendingCount = orders.filter((o: any) => o.status === 'Pending').length;

        stats.value = {
          revenue: totalRev,
          orders: orders.length,
          products: products.length,
          customers: users.length,
          newCustomers: users.filter((u: any) => new Date(u.createdAt).toDateString() === new Date().toDateString()).length,
          lowStock: products.filter((p: any) => p.stockQuantity < 5).length,
          pendingOrders: pendingCount,
          paidPercent: orders.length ? Math.round((paidCount / orders.length) * 100) : 0,
          pendingPercent: orders.length ? Math.round((pendingCount / orders.length) * 100) : 0,
          trend: 12.5 // Mock trend for now (needs historical data to calculate real)
        };

        // --- CALCULATE REVENUE GRAPH (Monthly) ---
        const currentYear = new Date().getFullYear();
        const monthlyRev = new Array(12).fill(0);

        orders.forEach((o: any) => {
          const d = new Date(o.createdAt);
          if (d.getFullYear() === currentYear && o.status !== 'Cancelled') {
            monthlyRev[d.getMonth()] += (o.totalPrice || 0);
          }
        });
        revenueSeries.value = monthlyRev;

        // --- CALCULATE TOP PRODUCTS ---
        // Aggregate all orderItems
        const itemMap: Record<string, number> = {};
        orders.forEach((o: any) => {
          if (o.orderItems && Array.isArray(o.orderItems)) {
            o.orderItems.forEach((item: any) => {
              // Use 'quantity' (the actual field name) with fallback to 'qty'
              const qty = item.quantity || item.qty || 0;
              itemMap[item.name] = (itemMap[item.name] || 0) + qty;
            });
          }
        });

        // Convert to array, sort, take top 5 - ONLY include items with qty > 0
        const sortedItems = Object.entries(itemMap)
          .map(([name, qty]) => ({ name, qty }))
          .filter(item => item.qty > 0)  // Only show products that have been sold
          .sort((a, b) => b.qty - a.qty)
          .slice(0, 5);

        const maxQty = sortedItems.length && sortedItems[0] ? sortedItems[0].qty : 1;
        topProducts.value = sortedItems.map(i => ({
          ...i,
          percent: Math.round((i.qty / maxQty) * 100)
        }));

        // Recent Orders
        recentOrders.value = orders.slice(0, 5);

        // --- CALCULATE PROMO STATS ---
        const now = new Date();
        const activePromos = promos.filter((p: any) => 
          new Date(p.startDate) <= now && new Date(p.endDate) >= now
        );
        
        const totalRedemptions = promos.reduce((sum: number, p: any) => sum + (p.usageCount || 0), 0);
        const avgOrderValue = 50; // Estimate
        const estSavings = promos.reduce((sum: number, p: any) => {
          const uses = p.usageCount || 0;
          if (p.type === 'percent') {
            return sum + (p.value / 100) * avgOrderValue * uses;
          }
          return sum + p.value * uses;
        }, 0);

        promoStats.value = {
          active: activePromos.length,
          totalRedemptions,
          estimatedSavings: estSavings
        };

        // Top performing promos (by usage count) - ONLY include promos with usageCount > 0
        topPromos.value = [...promos]
          .filter((p: any) => (p.usageCount || 0) > 0)  // Only show promos that have been used
          .sort((a: any, b: any) => (b.usageCount || 0) - (a.usageCount || 0))
          .slice(0, 3);

      } catch (error) {
        console.error("Dashboard Load Error", error);
      } finally {
        isLoading.value = false;
      }
    };

    // SVG Graph Math
    const points = computed(() => {
      const max = Math.max(...revenueSeries.value, 100); // Minimum scale
      return revenueSeries.value.map((val, i) => ({
        x: (i / (11)) * 100 + "%",
        y: 100 - (val / max) * 100 + "%"
      }));
    });

    const linePath = computed(() => {
        const max = Math.max(...revenueSeries.value, 100);
        const data = revenueSeries.value.map((val, i) => {
            const x = (i / 11) * 100;
            const y = 100 - (val / max) * 100;
            return `${x},${y}`;
        });
        return `M ${data.join(" L ")}`;
    });

    const areaPath = computed(() => `${linePath.value} L 100,100 L 0,100 Z`);

    // Helpers
    const formatMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
    const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
    const currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const statusClass = (status: string) => {
      const map: any = {
        'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
        'Processing': 'bg-blue-50 text-blue-700 border-blue-200',
        'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200',
      };
      return map[status] || 'bg-slate-50 text-slate-600';
    };

    onMounted(() => { loadData(); });

    return {
      isLoading, stats, recentOrders, topProducts, loadData, revenueSeries,
      formatMoney, formatDate, statusClass, currentDate,
      points, linePath, areaPath,
      promoStats, topPromos
    };
  }
});
</script>
