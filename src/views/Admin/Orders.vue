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
              <button @click="exportCSV" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export CSV
              </button>
              <button @click="generateFinancialReport" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Revenue Report
              </button>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Orders</p>
              <p class="mt-1 text-2xl font-black text-slate-900">{{ stats.total }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Revenue</p>
              <p class="mt-1 text-2xl font-black text-slate-900">{{ formatMoney(stats.revenue) }}</p>
            </div>
            <div class="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm cursor-pointer hover:bg-emerald-50 transition" @click="activePaymentFilter = 'paid'; page = 1">
              <p class="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Paid</p>
              <p class="mt-1 text-2xl font-black text-emerald-600">{{ stats.paidCount }}</p>
            </div>
            <div class="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 shadow-sm cursor-pointer hover:bg-amber-50 transition" @click="activePaymentFilter = 'unpaid'; page = 1">
              <p class="text-[11px] font-bold text-amber-600 uppercase tracking-wide">Unpaid</p>
              <p class="mt-1 text-2xl font-black text-amber-500">{{ stats.unpaidCount }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Pending</p>
              <p class="mt-1 text-2xl font-black text-orange-500">{{ stats.pending }}</p>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Delivered</p>
              <p class="mt-1 text-2xl font-black text-emerald-600">{{ stats.delivered }}</p>
            </div>
          </div>
        </div>
      </section>

      <div class="pt-8 flex flex-col gap-6">
        <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden p-2">
          <div class="p-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex flex-wrap gap-1">
              <button v-for="t in statusTabs" :key="t.key"
                class="px-3 py-2 rounded-xl text-xs font-bold transition-all border"
                :class="activeStatus === t.key ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'"
                @click="activeStatus = t.key; page = 1">
                {{ t.label }}
                <span class="ml-1 px-1.5 py-0.5 rounded-md text-[10px]"
                  :class="activeStatus === t.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'">
                  {{ t.count }}
                </span>
              </button>
            </div>
            <div class="flex items-center gap-3">
              <!-- Payment Status Filter -->
              <div class="flex bg-slate-100 rounded-xl p-1 gap-1">
                <button 
                  @click="activePaymentFilter = 'all'; page = 1"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition"
                  :class="activePaymentFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                >
                  All Payment
                </button>
                <button 
                  @click="activePaymentFilter = 'paid'; page = 1"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition"
                  :class="activePaymentFilter === 'paid' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                >
                  Paid
                </button>
                <button 
                  @click="activePaymentFilter = 'unpaid'; page = 1"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition"
                  :class="activePaymentFilter === 'unpaid' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                >
                  Unpaid
                </button>
              </div>
              <!-- Search -->
              <div class="relative w-full sm:w-64 group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input v-model.trim="q" type="text" placeholder="Search Order ID or Customer..."
                  class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-slate-400"/>
              </div>
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
                    <!-- Show locked badge for cancelled orders -->
                    <div v-if="o.status === 'Cancelled'" class="flex items-center gap-2">
                      <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Cancelled
                      </span>
                    </div>
                    <!-- Show dropdown for non-cancelled orders -->
                    <div v-else class="relative inline-block">
                      <select
                        :value="o.status"
                        @change="updateStatus(o, $event)"
                        class="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-slate-200"
                        :class="statusPill(o.status)"
                      >
                         <option value="Pending">Pending</option>
                         <option value="Processing">Processing</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled">Cancelled</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
                        <svg class="h-3 w-3 text-current opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 px-6 text-right">
                    <div class="flex gap-2 justify-end">
                      <button
                        class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        @click.stop="openDetails(o)"
                      >
                        View Details
                      </button>
                      <button
                        class="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        @click.stop="generateInvoice(o)"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Invoice
                      </button>
                    </div>
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
          <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] scale-100 transition-transform">

            <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 class="text-xl font-black text-slate-900">Order Details</h3>
                <div class="flex items-center gap-3 mt-1">
                  <p class="text-xs font-bold text-slate-400 font-mono">ID: #{{ selected.id.slice(-8).toUpperCase() }}</p>
                  <span 
                    class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    :class="selected.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                  >
                    {{ selected.isPaid ? 'PAID' : 'UNPAID' }}
                  </span>
                </div>
              </div>
              <button @click="closeDetails" class="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="p-8 overflow-y-auto flex flex-col gap-6">

              <!-- Customer & Shipping Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Customer</h4>
                  <div class="flex items-center gap-3">
                     <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-black text-slate-700 border border-slate-200 shadow-sm">
                        {{ initials(selected.customer) }}
                     </div>
                     <div>
                        <p class="font-bold text-slate-900 text-sm">{{ selected.customer }}</p>
                        <p class="text-xs text-slate-500">{{ selected.email }}</p>
                     </div>
                  </div>
                </div>
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Shipping Address</h4>
                  <p class="text-sm font-medium text-slate-700 leading-relaxed">
                    {{ selected.shippingAddress?.address || 'N/A' }}<br>
                    {{ selected.shippingAddress?.city }}, {{ selected.shippingAddress?.postalCode }}<br>
                    {{ selected.shippingAddress?.country }}
                  </p>
                </div>
              </div>

              <!-- Order Items -->
              <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div class="px-5 py-3 bg-slate-50 border-b border-slate-100">
                  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Order Items ({{ selected.orderItems?.length || 0 }})</h4>
                </div>
                <div class="divide-y divide-slate-100">
                  <div v-if="!selected.orderItems || selected.orderItems.length === 0" class="p-6 text-center text-slate-400 text-sm">
                    No items data available
                  </div>
                  <div v-for="(item, idx) in selected.orderItems" :key="idx" class="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 overflow-hidden">
                      <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-slate-900 text-sm truncate">{{ item.name }}</p>
                      <p class="text-xs text-slate-500">Qty: {{ item.quantity }} × {{ formatMoney(item.price) }}</p>
                    </div>
                    <p class="font-bold text-slate-900 text-sm">{{ formatMoney(item.price * item.quantity) }}</p>
                  </div>
                </div>
                <div class="px-5 py-3 bg-slate-900 text-white flex justify-between items-center">
                  <span class="font-bold text-sm">Total</span>
                  <span class="font-black text-lg">{{ formatMoney(selected.total) }}</span>
                </div>
              </div>

              <!-- Payment & Status -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Payment Status -->
                <div class="space-y-3">
                  <label class="text-xs font-bold text-slate-500 uppercase">Payment Status</label>
                  <div class="flex items-center gap-3">
                    <div 
                      class="flex-1 px-4 py-3 rounded-xl text-sm font-bold border"
                      :class="selected.isPaid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'"
                    >
                      <div class="flex items-center gap-2">
                        <svg v-if="selected.isPaid" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {{ selected.isPaid ? 'Paid' : 'Awaiting Payment' }}
                      </div>
                      <p v-if="selected.isPaid && selected.paidAt" class="text-xs mt-1 opacity-75">{{ formatDate(selected.paidAt) }}</p>
                    </div>
                    <button 
                      v-if="!selected.isPaid"
                      @click="markAsPaid(selected)"
                      class="px-4 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      Mark Paid
                    </button>
                  </div>
                  <p class="text-xs text-slate-400">Method: {{ selected.paymentMethod }}</p>
                </div>

                <!-- Order Status -->
                <div class="space-y-3">
                  <label class="text-xs font-bold text-slate-500 uppercase">Order Status</label>
                  <div class="relative">
                     <select
                        v-model="selected.status"
                        @change="updateStatus(selected, $event)"
                        class="w-full px-4 py-3 rounded-xl text-sm font-bold border outline-none cursor-pointer appearance-none"
                        :class="statusPill(selected.status)"
                      >
                         <option value="Pending">Pending</option>
                         <option value="Processing">Processing</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled">Cancelled</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-current opacity-50">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between gap-3">
               <div class="flex gap-2">
                 <button
                   @click="generateInvoice(selected)"
                   class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2"
                 >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                   Invoice
                 </button>
                 <button
                   v-if="selected.status !== 'Cancelled' && selected.paymentMethod !== 'Cash' && selected.paymentMethod !== 'COD'"
                   @click="handleRefund(selected)"
                   class="px-5 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-100 transition flex items-center gap-2"
                 >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                   Cancel & Refund
                 </button>
                 <!-- Cash/COD payment cannot be refunded -->
                 <span
                   v-if="selected.status !== 'Cancelled' && (selected.paymentMethod === 'Cash' || selected.paymentMethod === 'COD')"
                   class="px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-400 rounded-xl text-xs font-bold flex items-center gap-2 cursor-not-allowed"
                   title="Cash/COD payments cannot be auto-refunded"
                 >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   Cash (No Refund)
                 </span>
               </div>
               <button @click="closeDetails" class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition">
                  Done
               </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Cancel Confirmation Modal -->
      <transition name="fade">
        <div v-if="showCancelConfirm" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="cancelCancelConfirm"></div>
          <div class="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div class="p-8 text-center">
              <div class="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-2">Cancel This Order?</h3>
              <p class="text-slate-500 mb-6">This action <span class="font-bold text-rose-600">cannot be undone</span>. The order will be permanently cancelled and status changes will be locked.</p>
              <div class="flex gap-3">
                <button @click="cancelCancelConfirm" class="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition">
                  Keep Order
                </button>
                <button @click="confirmCancelOrder" class="flex-1 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition">
                  Yes, Cancel
                </button>
              </div>
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

type Status = "Paid" | "Pending" | "Shipped" | "Cancelled" | "Processing" | "Delivered" | "Refunded";

interface OrderRow {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: Status;
  orderItems: Array<{ name: string; quantity: number; price: number; image?: string }>;
  isPaid: boolean;
  paidAt?: string;
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
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
      showCancelConfirm: false,
      pendingCancelOrder: null as OrderRow | null,
      pendingCancelEvent: null as any,
      activePaymentFilter: 'all' as 'all' | 'paid' | 'unpaid',
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
      const processing = this.orders.filter(o => o.status === 'Processing').length;
      const shipped = this.orders.filter(o => o.status === 'Shipped').length;
      const delivered = this.orders.filter(o => o.status === 'Delivered').length;
      const cancelled = this.orders.filter(o => o.status === 'Cancelled').length;
      return [
        { key: "all", label: "All", count: all },
        { key: "Pending", label: "Pending", count: pending },
        { key: "Processing", label: "Processing", count: processing },
        { key: "Shipped", label: "Shipped", count: shipped },
        { key: "Delivered", label: "Delivered", count: delivered },
        { key: "Cancelled", label: "Cancelled", count: cancelled },
      ];
    },
    filteredSorted() {
      let list = this.orders;
      // Filter by status
      if (this.activeStatus !== "all") list = list.filter(o => o.status === this.activeStatus);
      // Filter by payment status
      if (this.activePaymentFilter === 'paid') list = list.filter(o => o.isPaid);
      if (this.activePaymentFilter === 'unpaid') list = list.filter(o => !o.isPaid);
      // Search
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
      const pending = this.orders.filter(o => o.status === 'Pending').length;
      const delivered = this.orders.filter(o => o.status === 'Delivered').length;
      return {
        total: this.orders.length,
        revenue: this.orders.reduce((s, o) => s + (o.total || 0), 0),
        paidCount: this.orders.filter(o => o.isPaid).length,
        unpaidCount: this.orders.filter(o => !o.isPaid).length,
        pending: pending,
        delivered: delivered,
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

    // --- Helper Methods for Template ---
    formatMoney(amount: number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount || 0);
    },

    formatDate(dateString: string) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    initials(name: string) {
      if (!name) return '??';
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    },

    statusPill(status: string) {
      const map: Record<string, string> = {
        Paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
        Pending: "bg-amber-50 text-amber-700 border-amber-100",
        Shipped: "bg-blue-50 text-blue-700 border-blue-100",
        Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
        Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
        Processing: "bg-indigo-50 text-indigo-700 border-indigo-100",
        Refunded: "bg-purple-50 text-purple-700 border-purple-100"
      };
      return map[status] || "bg-slate-50 text-slate-700 border-slate-100";
    },

    showToast(msg: string) {
      this.toast = msg;
      setTimeout(() => { this.toast = ""; }, 3000);
    },

    openDetails(order: OrderRow) {
      this.selected = { ...order };
      this.showDetails = true;
    },

    closeDetails() {
      this.showDetails = false;
      this.selected = null;
    },

    // --- API & Logic Methods ---
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
          status: o.status || 'Pending',
          orderItems: o.orderItems || [],
          isPaid: o.isPaid || false,
          paidAt: o.paidAt,
          paymentMethod: o.paymentMethod || 'N/A',
          shippingAddress: o.shippingAddress || {
            address: 'N/A',
            city: 'N/A',
            postalCode: 'N/A',
            country: 'N/A'
          }
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
       
       // If order is already cancelled, prevent any changes
       if (order.status === 'Cancelled') {
         this.showToast("Cannot modify a cancelled order.");
         return;
       }
       
       // If changing to Cancelled, show confirmation modal
       if (newStatus === 'Cancelled') {
         this.pendingCancelOrder = order;
         this.pendingCancelEvent = event;
         this.showCancelConfirm = true;
         // Reset the select to old value (will update if confirmed)
         if (event.target) event.target.value = order.status;
         return;
       }
       
       const oldStatus = order.status;
       order.status = newStatus;

       try {
          await axios.put(`${API_BASE}/orders/${order.id}/status`, { status: newStatus }, this.getAuthHeader());
          this.showToast(`Order updated to ${newStatus}`);
       } catch (error) {
          console.error(error);
          order.status = oldStatus;
          this.showToast("Failed to update status.");
       }
    },

    cancelCancelConfirm() {
      this.showCancelConfirm = false;
      this.pendingCancelOrder = null;
      this.pendingCancelEvent = null;
    },

    async confirmCancelOrder() {
      if (!this.pendingCancelOrder) return;
      
      const order = this.pendingCancelOrder;
      const oldStatus = order.status;
      order.status = 'Cancelled' as Status;
      
      try {
        await axios.put(`${API_BASE}/orders/${order.id}/status`, { status: 'Cancelled' }, this.getAuthHeader());
        this.showToast("Order has been cancelled.");
        // Update in main orders array
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1 && this.orders[idx]) {
          this.orders[idx].status = 'Cancelled' as Status;
        }
      } catch (error) {
        console.error(error);
        order.status = oldStatus;
        this.showToast("Failed to cancel order.");
      } finally {
        this.cancelCancelConfirm();
      }
    },

    async markAsPaid(order: OrderRow) {
      try {
        await axios.put(`${API_BASE}/orders/${order.id}/pay`, {}, this.getAuthHeader());
        order.isPaid = true;
        order.paidAt = new Date().toISOString();
        // Also update in main orders array
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1 && this.orders[idx]) {
          this.orders[idx]!.isPaid = true;
          this.orders[idx]!.paidAt = order.paidAt;
        }
        this.showToast("Order marked as paid!");
      } catch (error) {
        console.error(error);
        this.showToast("Failed to update payment status.");
      }
    },

    async handleRefund(order: OrderRow) {
      const oldStatus = order.status;
      
      try {
        // Cancel the order
        await axios.put(`${API_BASE}/orders/${order.id}/status`, { status: 'Cancelled' }, this.getAuthHeader());
        
        // Update local state
        order.status = 'Cancelled' as Status;
        
        // Update in main orders array
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1 && this.orders[idx]) {
          this.orders[idx].status = 'Cancelled' as Status;
        }
        
        // If in detail view, update selected
        if (this.selected && this.selected.id === order.id) {
          this.selected.status = 'Cancelled' as Status;
        }
        
        // Show success
        this.showToast(`Order cancelled. Refund ${this.formatMoney(order.total)} to ${order.customer}`);
        
        // Close the details modal
        this.closeDetails();
        
      } catch (error: any) {
        console.error('Refund error:', error);
        order.status = oldStatus;
        this.showToast("Failed to cancel order. Please try again.");
      }
    },

    async generateInvoice(order: OrderRow) {
      try {
        this.showToast("Preparing invoice...");
        const { data } = await axios.get(`${API_BASE}/orders/${order.id}`, this.getAuthHeader());
        this.downloadInvoicePDF(data);
      } catch (error) {
        console.error('Invoice error:', error);
        this.showToast("Failed to generate invoice");
      }
    },

    downloadInvoicePDF(order: any) {
      const formatCurrency = (amount: number) => this.formatMoney(amount);
      const formatDateStr = (date: string) => this.formatDate(date);

      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Invoice #${order._id.slice(-6).toUpperCase()}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f8fafc; }
            .invoice { max-width: 800px; margin: 0 auto; background: white; padding: 60px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
            .header { display: flex; justify-content: space-between; margin-bottom: 50px; padding-bottom: 30px; border-bottom: 3px solid #0f172a; }
            .logo { font-size: 32px; font-weight: 900; color: #0f172a; }
            .logo-sub { font-size: 12px; color: #64748b; font-weight: 600; margin-top: 4px; }
            .invoice-details { text-align: right; }
            .section-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
            .info-value { font-size: 14px; color: #0f172a; font-weight: 600; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            thead { background: #f8fafc; }
            th { text-align: left; padding: 14px 16px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
            td { padding: 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 500; }
            .text-right { text-align: right; }
            .totals { margin-top: 30px; }
            .total-row { display: flex; justify-content: space-between; padding: 12px 16px; font-size: 14px; font-weight: 600; color: #64748b; }
            .total-row.grand { background: #0f172a; color: white; font-size: 16px; font-weight: 700; border-radius: 8px; margin-top: 8px; }
            .footer { margin-top: 60px; padding-top: 30px; border-top: 2px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8; }
            .status-badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #d1fae5; color: #065f46; margin-top: 8px; }
            @media print { body { padding: 0; background: white; } .invoice { box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div>
                <div class="logo">PetStore+</div>
                <div class="logo-sub">Premium Pet Supplies</div>
              </div>
              <div class="invoice-details">
                <div style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">INVOICE #${order._id.slice(-6).toUpperCase()}</div>
                <div style="font-size: 13px; color: #64748b;">${formatDateStr(order.createdAt)}</div>
                ${order.isPaid ? '<div class="status-badge">PAID</div>' : ''}
              </div>
            </div>

            <div class="info-grid">
              <div>
                <div class="section-title">Bill To</div>
                <div class="info-value">
                  ${order.user.firstName} ${order.user.lastName}<br>
                  ${order.user.email}<br>
                  ${order.user.phone || order.shippingAddress.phone || 'N/A'}
                </div>
              </div>
              <div>
                <div class="section-title">Shipping Address</div>
                <div class="info-value">
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                  ${order.shippingAddress.country}
                </div>
              </div>
            </div>

            <div class="section-title">Order Items</div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">Price</th>
                  <th class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.orderItems.map((item: any) => `
                  <tr>
                    <td style="font-weight: 600;">${item.name}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">${formatCurrency(item.price)}</td>
                    <td class="text-right">${formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${formatCurrency(order.itemsPrice)}</span>
              </div>
              <div class="total-row">
                <span>Tax</span>
                <span>${formatCurrency(order.taxPrice)}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>${formatCurrency(order.shippingPrice)}</span>
              </div>
              <div class="total-row grand">
                <span>Total Amount</span>
                <span>${formatCurrency(order.totalPrice)}</span>
              </div>
            </div>

            <div style="margin-top: 40px;">
              <div class="info-grid">
                <div>
                  <div class="section-title">Payment Method</div>
                  <div class="info-value">${order.paymentMethod}</div>
                </div>
                <div>
                  <div class="section-title">Payment Date</div>
                  <div class="info-value">${order.paidAt ? formatDateStr(order.paidAt) : 'Pending'}</div>
                </div>
              </div>
            </div>

            <div class="footer">
              Thank you for your purchase!<br>
              Questions? Contact us at support@petstore.com<br>
              <strong>PetStore+</strong> • Phnom Penh, Cambodia
            </div>
          </div>
        </body>
        </html>
      `;

      // Download
      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${order._id.slice(-6).toUpperCase()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
      }

      this.showToast("Invoice generated successfully!");
    },

    // Export all orders to CSV
    exportCSV() {
      if (this.orders.length === 0) {
        this.showToast("No orders to export.");
        return;
      }

      const headers = ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status', 'Payment Status', 'Payment Method'];
      const rows = this.orders.map(o => [
        o.id,
        o.customer,
        o.email,
        this.formatDate(o.date),
        o.total.toFixed(2),
        o.status,
        o.isPaid ? 'Paid' : 'Unpaid',
        o.paymentMethod
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      this.showToast("Orders exported to CSV!");
    },

    // Generate simple financial report
    generateFinancialReport() {
      const totalRevenue = this.orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const paidOrders = this.orders.filter(o => o.isPaid);
      const paidRevenue = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const pendingRevenue = totalRevenue - paidRevenue;
      
      const cancelledOrders = this.orders.filter(o => o.status === 'Cancelled');
      const refundedOrders = this.orders.filter(o => o.status === 'Refunded');
      const deliveredOrders = this.orders.filter(o => o.status === 'Delivered');
      
      const avgOrderValue = this.orders.length > 0 ? totalRevenue / this.orders.length : 0;

      // Group by month
      const byMonth: Record<string, { count: number; revenue: number }> = {};
      this.orders.forEach(o => {
        const month = new Date(o.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        if (!byMonth[month]) byMonth[month] = { count: 0, revenue: 0 };
        byMonth[month].count++;
        byMonth[month].revenue += o.total || 0;
      });

      const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Financial Report - PetStore+</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: #f8fafc; }
            .report { max-width: 900px; margin: 0 auto; background: white; padding: 50px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
            .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #0f172a; }
            .logo { font-size: 28px; font-weight: 900; color: #0f172a; }
            .date { color: #64748b; font-size: 12px; margin-top: 8px; }
            .section { margin-bottom: 40px; }
            .section-title { font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .stat-card { background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; }
            .stat-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
            .stat-value { font-size: 28px; font-weight: 900; color: #0f172a; }
            .stat-value.green { color: #059669; }
            .stat-value.amber { color: #d97706; }
            .stat-value.red { color: #dc2626; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; background: #f8fafc; border-bottom: 2px solid #e2e8f0; }
            td { padding: 14px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 500; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
            @media print { body { padding: 0; background: white; } .report { box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="report">
            <div class="header">
              <div class="logo">PetStore+ Financial Report</div>
              <div class="date">Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <div class="section">
              <div class="section-title">Revenue Summary</div>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-label">Total Revenue</div>
                  <div class="stat-value">${this.formatMoney(totalRevenue)}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Collected (Paid)</div>
                  <div class="stat-value green">${this.formatMoney(paidRevenue)}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Pending Collection</div>
                  <div class="stat-value amber">${this.formatMoney(pendingRevenue)}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Order Statistics</div>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-label">Total Orders</div>
                  <div class="stat-value">${this.orders.length}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Avg. Order Value</div>
                  <div class="stat-value">${this.formatMoney(avgOrderValue)}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Delivered Orders</div>
                  <div class="stat-value green">${deliveredOrders.length}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Order Status Breakdown</div>
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Count</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Pending</td><td>${this.orders.filter(o => o.status === 'Pending').length}</td><td>${(this.orders.filter(o => o.status === 'Pending').length / this.orders.length * 100).toFixed(1)}%</td></tr>
                  <tr><td>Processing</td><td>${this.orders.filter(o => o.status === 'Processing').length}</td><td>${(this.orders.filter(o => o.status === 'Processing').length / this.orders.length * 100).toFixed(1)}%</td></tr>
                  <tr><td>Shipped</td><td>${this.orders.filter(o => o.status === 'Shipped').length}</td><td>${(this.orders.filter(o => o.status === 'Shipped').length / this.orders.length * 100).toFixed(1)}%</td></tr>
                  <tr><td>Delivered</td><td>${deliveredOrders.length}</td><td>${(deliveredOrders.length / this.orders.length * 100).toFixed(1)}%</td></tr>
                  <tr><td>Cancelled</td><td>${cancelledOrders.length}</td><td>${(cancelledOrders.length / this.orders.length * 100).toFixed(1)}%</td></tr>
                  <tr><td>Refunded</td><td>${refundedOrders.length}</td><td>${(refundedOrders.length / this.orders.length * 100).toFixed(1)}%</td></tr>
                </tbody>
              </table>
            </div>

            <div class="section">
              <div class="section-title">Revenue by Month</div>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(byMonth).map(([month, data]) => `
                    <tr>
                      <td>${month}</td>
                      <td>${data.count}</td>
                      <td>${this.formatMoney(data.revenue)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="footer">
              This report was automatically generated by PetStore+ Admin Dashboard<br>
              © ${new Date().getFullYear()} PetStore+ • All Rights Reserved
            </div>
          </div>
        </body>
        </html>
      `;

      // Download
      const blob = new Blob([reportHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Financial_Report_${new Date().toISOString().slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Open in new window
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(reportHTML);
        printWindow.document.close();
      }

      this.showToast("Financial report generated!");
    }
  }
});
</script>
