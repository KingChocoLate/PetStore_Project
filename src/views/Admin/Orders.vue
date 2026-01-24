<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col font-sans">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10">

      <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50 opacity-60"></div>
        <div class="relative p-6 sm:p-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="min-w-0">
              <h1 class="mt-3 text-3xl font-black text-slate-900 tracking-tight">Orders Center</h1>
              <p class="mt-2 text-sm text-slate-600 max-w-xl">Track revenue and manage order fulfillment in real-time.</p>
            </div>
            <div class="flex gap-2">
              <button @click="fetchOrders" class="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                <svg v-if="isLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span v-else>Refresh</span>
              </button>
              <button class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export CSV
              </button>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Orders</p>
              <p class="mt-1 text-2xl font-black text-slate-900">{{ stats.total }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Revenue</p>
              <p class="mt-1 text-2xl font-black text-slate-900">{{ formatMoney(stats.revenue) }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Paid Orders</p>
              <p class="mt-1 text-2xl font-black text-emerald-600">{{ stats.paid }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Pending</p>
              <p class="mt-1 text-2xl font-black text-amber-500">{{ stats.pending }}</p>
            </div>
          </div>
        </div>
      </section>

      <div class="pt-8 flex flex-col gap-6">
        <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2">
          <div class="p-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex flex-wrap gap-1">
              <button v-for="t in statusTabs" :key="t.key"
                class="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
                :class="activeStatus === t.key ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'"
                @click="activeStatus = t.key; page = 1">
                {{ t.label }}
                <span class="ml-2 px-1.5 py-0.5 rounded-md text-[10px]"
                  :class="activeStatus === t.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'">
                  {{ t.count }}
                </span>
              </button>
            </div>
            <div class="relative w-full sm:w-72 group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input v-model.trim="q" type="text" placeholder="Search Order ID or Customer..."
                class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-slate-400"/>
            </div>
          </div>
        </section>

        <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[400px]">

          <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center p-12">
             <div class="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500"></div>
             <p class="mt-4 text-sm font-bold text-slate-400">Loading orders...</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th class="py-4 px-6">Order ID</th>
                  <th class="py-4 px-4">Customer</th>
                  <th class="py-4 px-4">Date</th>
                  <th class="py-4 px-4">Total</th>
                  <th class="py-4 px-4">Status</th>
                  <th class="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-if="paged.length === 0">
                  <td colspan="6" class="py-20 text-center">
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                      </div>
                      <p class="text-slate-500 font-bold">No orders found</p>
                      <p class="text-slate-400 text-xs mt-1">Try changing your filters</p>
                    </div>
                  </td>
                </tr>
                <tr v-for="o in paged" :key="o.id" class="group hover:bg-slate-50 transition cursor-pointer" @click="openDetails(o)">

                  <td class="py-4 px-6">
                    <span class="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">#{{ o.id.slice(-6).toUpperCase() }}</span>
                  </td>

                  <td class="py-4 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-black text-slate-600 border border-white shadow-sm">
                        {{ initials(o.customer) }}
                      </div>
                      <div>
                        <div class="text-sm font-bold text-slate-900">{{ o.customer }}</div>
                        <div class="text-[11px] font-medium text-slate-400">{{ o.email }}</div>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 px-4 text-sm font-semibold text-slate-600">{{ formatDate(o.date) }}</td>
                  <td class="py-4 px-4 text-sm font-black text-slate-900">{{ formatMoney(o.total) }}</td>

                  <td class="py-4 px-4" @click.stop>
                    <div class="relative">
                      <select
                        :value="o.status"
                        @change="updateStatus(o, $event)"
                        class="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-colors w-32 focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                        :class="statusPill(o.status)"
                      >
                         <option value="Pending">Pending</option>
                         <option value="Processing">Processing</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled">Cancelled</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 px-6 text-right">
                    <button class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors" @click.stop="openDetails(o)">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
             <span class="text-xs font-semibold text-slate-500">Showing page {{ page }} of {{ totalPages }}</span>
             <div class="flex gap-2">
                <button :disabled="page === 1" @click="page--" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-50 hover:bg-slate-50">Previous</button>
                <button :disabled="page === totalPages" @click="page++" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-50 hover:bg-slate-50">Next</button>
             </div>
          </div>
        </section>
      </div>

      <transition name="fade">
        <div v-if="showDetails && selected" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeDetails"></div>
          <div class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] scale-100 transition-transform">

            <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 class="text-xl font-black text-slate-900">Order Details</h3>
                <p class="text-xs font-bold text-slate-400 font-mono mt-1">ID: #{{ selected.id.slice(-8).toUpperCase() }}</p>
              </div>
              <button @click="closeDetails" class="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="p-8 overflow-y-auto flex flex-col gap-6">

              <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Customer Information</h4>
                <div class="flex items-center gap-4 mb-4">
                   <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg font-black text-slate-700 border border-slate-200 shadow-sm">
                      {{ initials(selected.customer) }}
                   </div>
                   <div>
                      <p class="font-bold text-slate-900">{{ selected.customer }}</p>
                      <p class="text-sm text-slate-500">{{ selected.email }}</p>
                   </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200/50">
                   <div>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Date Placed</p>
                      <p class="text-sm font-bold text-slate-900">{{ formatDate(selected.date) }}</p>
                   </div>
                   <div>
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Total Amount</p>
                      <p class="text-lg font-black text-emerald-600">{{ formatMoney(selected.total) }}</p>
                   </div>
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-xs font-bold text-slate-500 uppercase">Order Status</label>
                <div class="relative">
                   <select
                      v-model="selected.status"
                      @change="updateStatus(selected, $event)"
                      class="w-full px-4 py-3 rounded-xl text-sm font-bold border outline-none cursor-pointer appearance-none"
                      :class="statusPill(selected.status)"
                    >
                       <option value="Pending">Pending - Order Received</option>
                       <option value="Processing">Processing - Packing Items</option>
                       <option value="Shipped">Shipped - Out for Delivery</option>
                       <option value="Delivered">Delivered - Completed</option>
                       <option value="Cancelled">Cancelled - Refunded</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-current opacity-50">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
                <p class="text-xs text-slate-400 px-1">
                   Changing to <b>Delivered</b> will automatically mark COD orders as paid.
                </p>
              </div>

            </div>

            <div class="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
               <button @click="closeDetails" class="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition transform hover:-translate-y-0.5">
                  Done
               </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="toast" class="fixed bottom-6 right-6 z-[100] bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold">
           <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
           {{ toast }}
        </div>
      </transition>

    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

type Status = "Paid" | "Pending" | "Shipped" | "Cancelled" | "Processing" | "Delivered";

interface OrderRow {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: Status;
}

export default defineComponent({
  name: "Orders",
  data() {
    return {
      orders: [] as OrderRow[],
      isLoading: false,
      toast: "",
      q: "",
      activeStatus: "all",
      page: 1,
      pageSize: 8,
      showDetails: false,
      selected: null as OrderRow | null,
    };
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    return { router, authStore };
  },
  computed: {
    statusTabs() {
      const all = this.orders.length;
      const pending = this.orders.filter(o => o.status === 'Pending').length;
      const paid = this.orders.filter(o => o.status === 'Paid').length;
      const shipped = this.orders.filter(o => o.status === 'Shipped').length;
      return [
        { key: "all", label: "All", count: all },
        { key: "Pending", label: "Pending", count: pending },
        { key: "Paid", label: "Paid", count: paid },
        { key: "Shipped", label: "Shipped", count: shipped },
      ];
    },
    filteredSorted() {
      let list = this.orders;
      if (this.activeStatus !== "all") list = list.filter(o => o.status === this.activeStatus);
      const search = this.q.toLowerCase().trim();
      if (search) list = list.filter(o => o.id.toLowerCase().includes(search) || o.customer.toLowerCase().includes(search));
      return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    totalPages() { return Math.max(1, Math.ceil(this.filteredSorted.length / this.pageSize)); },
    paged() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredSorted.slice(start, start + this.pageSize);
    },
    stats() {
      return {
        total: this.orders.length,
        revenue: this.orders.reduce((s, o) => s + (o.total || 0), 0),
        paid: this.orders.filter(o => o.status === 'Paid' || o.status === 'Delivered').length,
        pending: this.orders.filter(o => o.status === 'Pending').length,
      };
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    getAuthHeader() {
      let token = this.authStore.token;
      if (!token) {
         const stored = localStorage.getItem('userInfo');
         if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    },

    async fetchOrders() {
      this.isLoading = true;
      try {
        const { data } = await axios.get(`${API_BASE}/orders`, this.getAuthHeader());

        this.orders = data.map((o: any) => ({
          id: o._id,
          customer: o.user ? `${o.user.firstName} ${o.user.lastName}` : 'Guest',
          email: o.user ? o.user.email : (o.paymentResult?.email_address || 'N/A'),
          date: o.createdAt,
          total: o.totalPrice,
          status: o.status || 'Pending'
        }));
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
           this.showToast("Session expired. Please log in.");
           this.authStore.logout();
           this.router.push('/login');
        } else {
           console.error("Fetch Error:", err);
        }
      } finally {
        this.isLoading = false;
      }
    },

    async updateStatus(order: OrderRow, event: any) {
       const newStatus = event.target ? event.target.value : event;

       // Optimistic UI Update (Update screen instantly)
       const oldStatus = order.status;
       order.status = newStatus;

       try {
          await axios.put(`${API_BASE}/orders/${order.id}/status`, { status: newStatus }, this.getAuthHeader());
          this.showToast(`Order updated to ${newStatus}`);
       } catch (error) {
          console.error(error);
          order.status = oldStatus; // Revert if failed
          this.showToast("Failed to update status. Check connection.");
       }
    },

    formatMoney(n: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n); },
    formatDate(iso: string) { if(!iso) return '-'; return new Date(iso).toLocaleDateString(); },
    initials(name: string) { return (name || 'G').slice(0, 2).toUpperCase(); },

    statusPill(status: string) {
      const map: any = {
        'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
        'Processing': 'bg-blue-50 text-blue-700 border-blue-200',
        'Shipped': 'bg-purple-50 text-purple-700 border-purple-200',
        'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-300',
        'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200'
      };
      return map[status] || 'bg-slate-50 text-slate-700 border-slate-200';
    },

    openDetails(o: OrderRow) { this.selected = o; this.showDetails = true; },
    closeDetails() { this.showDetails = false; },
    showToast(msg: string) { this.toast = msg; setTimeout(() => this.toast = "", 3000); }
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
