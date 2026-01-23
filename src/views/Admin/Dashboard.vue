<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-8">
      <div class="w-full">
        <!-- HERO HEADER -->
        <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50"></div>

          <div class="relative p-6 sm:p-7">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div class="min-w-0">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span class="px-2 py-1 rounded-lg bg-white/70 border border-slate-200">Admin</span>
                  <span>•</span>
                  <span class="truncate">{{ todayText }}</span>
                </div>

                <h1 class="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Overview Dashboard
                </h1>

                <p class="mt-1 text-sm text-slate-600">
                  Sales performance, products, promotions, and recent orders — all in one place.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
                <!-- Range -->
                <div class="bg-white/70 border border-slate-200 rounded-2xl p-1 flex text-xs font-bold shadow-sm w-fit">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl transition"
                    :class="range === 'daily' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                    @click="setRange('daily')"
                  >
                    Daily
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl transition"
                    :class="range === 'monthly' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                    @click="setRange('monthly')"
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl transition"
                    :class="range === 'yearly' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                    @click="setRange('yearly')"
                  >
                    Yearly
                  </button>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition"
                    @click="refreshMock"
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                    @click="generateReport"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            <!-- QUICK STATS STRIP -->
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoTile label="Total Revenue" :value="formattedTotalRevenue" />
              <InfoTile label="Average" :value="formattedAverageRevenue" />
              <InfoTile
                label="Trend"
                :value="trendUp ? 'Upward' : 'Downward'"
                :valueClass="trendUp ? 'text-emerald-700' : 'text-rose-600'"
              />
            </div>
          </div>
        </section>

        <div class="pt-8 flex flex-col gap-8">
          <!-- KPI CARDS -->
          <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div
              v-for="(kpi, i) in summaryData"
              :key="i"
              class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <p class="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">
                    {{ kpi.title }}
                  </p>
                  <p class="mt-2 text-2xl font-black text-slate-900 leading-tight">
                    {{ kpi.value }}
                  </p>
                </div>

                <div class="shrink-0 w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <div class="text-emerald-700">
                    <component :is="kpi.iconComponent" class="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div class="pt-4 flex items-center justify-between">
                <p class="text-[11px] text-slate-500">vs last {{ compareLabel }}</p>
                <span
                  class="text-xs font-black px-2.5 py-1 rounded-xl border"
                  :class="kpi.isPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'"
                >
                  {{ kpi.isPositive ? "+" : "" }}{{ kpi.percentage }}%
                </span>
              </div>

              <div class="pt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <p class="text-[11px] font-bold text-slate-500">Progress</p>
                  <p class="text-[11px] font-black text-slate-800">{{ kpi.progress }}%</p>
                </div>

                <div class="h-2.5 bg-white rounded-full overflow-hidden border border-slate-200">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="kpi.isPositive ? 'bg-emerald-500' : 'bg-rose-400'"
                    :style="{ width: kpi.progress + '%' }"
                  />
                </div>

                <svg class="w-full h-10" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <polyline
                    :points="kpi.sparkPoints"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    :class="kpi.isPositive ? 'text-emerald-600' : 'text-rose-500'"
                  />
                </svg>
              </div>
            </div>
          </section>

          <!-- MAIN GRID -->
          <!-- ✅ FIX: stop stretching items (removes huge empty space under Revenue Analytics) -->
          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <!-- REVENUE CARD -->
            <div class="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Revenue Analytics</h2>
                  <p class="pt-1 text-xs text-slate-500">Hover a bar to see the value.</p>
                </div>
                <span class="text-xs font-black px-3 py-1 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  {{ rangeLabel }}
                </span>
              </div>

              <!-- chart container -->
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div class="grid grid-cols-12 gap-4 items-end h-64">
                  <!-- ✅ Revenue axis (0, 10k, 20k...) -->
                  <div class="hidden sm:flex col-span-2 h-full flex-col justify-between text-xs text-slate-400 font-semibold">
                    <span v-for="t in revenueTicks" :key="t">{{ formatMoney(t) }}</span>
                  </div>

                  <!-- plot area -->
                  <div class="col-span-12 sm:col-span-10 h-full relative">
                    <div class="absolute inset-0 flex flex-col justify-between py-3 pointer-events-none">
                      <div class="border-b border-slate-200/70"></div>
                      <div class="border-b border-slate-200/50"></div>
                      <div class="border-b border-slate-200/50"></div>
                      <div class="border-b border-slate-200/70"></div>
                    </div>

                    <div class="relative h-full flex items-end gap-2">
                      <div
                        v-for="(bar, i) in revenueBars"
                        :key="i"
                        class="relative flex-1 h-full flex flex-col items-center justify-end"
                        @mouseenter="hoverIndex = i"
                        @mouseleave="hoverIndex = -1"
                      >
                        <div class="absolute -top-10 transition" :class="hoverIndex === i ? 'opacity-100' : 'opacity-0'">
                          <div class="text-[11px] font-black bg-slate-900 text-white px-2 py-1 rounded-lg shadow">
                            {{ formatMoney(bar.value) }}
                          </div>
                        </div>

                        <div
                          class="w-3 sm:w-5 rounded-t-2xl transition-all duration-500"
                          :class="bar.isPeak ? 'bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'"
                          :style="{ height: bar.heightPx + 'px' }"
                        />

                        <span class="pt-2 text-[11px] font-semibold text-slate-500">{{ bar.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatChip label="Total" :value="formattedTotalRevenue" />
                <StatChip label="Average" :value="formattedAverageRevenue" />
                <StatChip label="Peak" :value="formatMoney(maxRevenue)" />
                <StatChip label="Trend" :value="trendUp ? 'Up' : 'Down'" :valueClass="trendUp ? 'text-emerald-700' : 'text-rose-600'" />
              </div>
            </div>

            <!-- TOP PRODUCTS CARD -->
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Top Products</h2>
                  <p class="pt-1 text-xs text-slate-500">Sorted list with share bars.</p>
                </div>

                <div class="relative" ref="sortDropdown">
                  <button
                    type="button"
                    class="text-xs font-black bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl border border-slate-200 transition flex items-center gap-2"
                    @click="toggleSortMenu"
                  >
                    Sort
                    <span class="hidden sm:inline text-slate-500 font-extrabold">•</span>
                    <span class="hidden sm:inline">{{ sortShortLabel }}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <transition name="fade">
                    <div
                      v-if="showSortMenu"
                      class="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden"
                    >
                      <button
                        v-for="opt in sortOptions"
                        :key="opt.key"
                        type="button"
                        class="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-between"
                        @click="selectSort(opt.key)"
                      >
                        <span class="text-slate-800">{{ opt.label }}</span>
                        <span v-if="opt.key === sortBy" class="text-emerald-700 font-black">✓</span>
                      </button>
                    </div>
                  </transition>
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(p, i) in sortedTopProducts"
                  :key="i"
                  class="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="w-2.5 h-2.5 rounded-full" :class="p.colorClass"></span>
                      <p class="text-sm font-black text-slate-900 truncate">{{ p.name }}</p>
                    </div>
                    <p class="text-sm font-black text-slate-900">{{ p.qty }}</p>
                  </div>

                  <div class="h-2.5 bg-white rounded-full overflow-hidden border border-slate-200">
                    <div class="h-full rounded-full" :class="p.colorBar" :style="{ width: p.percent + '%' }" />
                  </div>

                  <div class="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Share</span>
                    <span class="text-slate-700 font-black">{{ p.percent }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ✅ NEW: INSIGHTS & ALERTS (fills gap between Revenue and Promotion) -->
          <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-black text-slate-900">Insights & Alerts</h2>
                <p class="pt-1 text-xs text-slate-500">
                  Quick summary linking sales, promotions, and inventory.
                </p>
              </div>

              <span class="text-xs font-black px-3 py-1 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                Live Summary
              </span>
            </div>

            <div class="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- SALES INSIGHTS -->
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">Sales insights</p>
                  <span
                    class="text-[10px] font-black px-2 py-1 rounded-xl border"
                    :class="trendUp ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'"
                  >
                    {{ trendUp ? "Trending Up" : "Trending Down" }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="text-[11px] font-bold text-slate-500">Peak</p>
                    <p class="mt-1 text-sm font-black text-slate-900">
                      {{ peakRevenuePoint.label }}
                    </p>
                    <p class="text-[11px] font-semibold text-slate-500">
                      {{ formatMoney(peakRevenuePoint.value) }}
                    </p>
                  </div>

                  <div class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="text-[11px] font-bold text-slate-500">Lowest</p>
                    <p class="mt-1 text-sm font-black text-slate-900">
                      {{ lowRevenuePoint.label }}
                    </p>
                    <p class="text-[11px] font-semibold text-slate-500">
                      {{ formatMoney(lowRevenuePoint.value) }}
                    </p>
                  </div>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-[11px] font-bold text-slate-500">Last change</p>
                  <div class="mt-1 flex items-end justify-between gap-3">
                    <p class="text-sm font-black text-slate-900">{{ lastChangeLabel }}</p>
                    <span
                      class="text-xs font-black px-2.5 py-1 rounded-xl border"
                      :class="lastChangePct >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'"
                    >
                      {{ lastChangePct >= 0 ? "+" : "" }}{{ lastChangePct.toFixed(1) }}%
                    </span>
                  </div>
                  <p class="text-[11px] font-semibold text-slate-500 pt-1">
                    {{ lastPointLabel }} vs {{ prevPointLabel }}
                  </p>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    class="flex-1 text-xs font-black px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition"
                    @click="toastMsg('Sales report opened (mock)')"
                  >
                    View Report
                  </button>
                  <button
                    type="button"
                    class="flex-1 text-xs font-black px-4 py-2 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    @click="toastMsg('Exported sales insights (mock)')"
                  >
                    Export
                  </button>
                </div>
              </div>

              <!-- PROMOTION IMPACT -->
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">Promotion impact</p>
                  <span class="text-[10px] font-black px-2 py-1 rounded-xl border bg-emerald-50 text-emerald-700 border-emerald-100">
                    Active
                  </span>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-[11px] font-bold text-slate-500">Campaign</p>
                  <p class="mt-1 text-sm font-black text-slate-900 truncate">{{ selectedCampaign }}</p>
                  <p class="text-[11px] font-semibold text-slate-500 pt-1">
                    ROI {{ promoStats.roi }}% • Conversions {{ promoStats.conversions }}
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="text-[11px] font-bold text-slate-500">Clicks</p>
                    <p class="mt-1 text-lg font-black text-slate-900">{{ promoStats.clicks.toLocaleString() }}</p>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="text-[11px] font-bold text-slate-500">ROI</p>
                    <p class="mt-1 text-lg font-black text-slate-900">{{ promoStats.roi }}%</p>
                  </div>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-[11px] font-bold text-slate-500">Insight</p>
                  <p class="mt-1 text-[12px] font-semibold text-slate-700 leading-relaxed">
                    {{ promoInsightText }}
                  </p>
                </div>

                <button
                  type="button"
                  class="text-xs font-black px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition"
                  @click="toastMsg('Promotion details opened (mock)')"
                >
                  Manage Promotions
                </button>
              </div>

              <!-- INVENTORY ALERTS -->
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">Inventory alerts</p>
                  <span
                    class="text-[10px] font-black px-2 py-1 rounded-xl border"
                    :class="lowStockItems.length ? 'bg-amber-50 text-amber-800 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'"
                  >
                    {{ lowStockItems.length ? `${lowStockItems.length} Low` : "All Good" }}
                  </span>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-[11px] font-bold text-slate-500">Threshold</p>
                  <p class="mt-1 text-sm font-black text-slate-900">
                    Below {{ lowStockThreshold }} units
                  </p>
                  <p class="text-[11px] font-semibold text-slate-500 pt-1">
                    Based on your Top Products quantities (mock inventory).
                  </p>
                </div>

                <div class="space-y-3">
                  <div v-if="!lowStockItems.length" class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="text-[12px] font-semibold text-slate-700">No low-stock items 🎉</p>
                    <p class="text-[11px] text-slate-500 pt-1">Inventory levels look healthy.</p>
                  </div>

                  <div
                    v-for="it in lowStockItems"
                    :key="it.name"
                    class="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between"
                  >
                    <div class="min-w-0">
                      <p class="text-sm font-black text-slate-900 truncate">{{ it.name }}</p>
                      <p class="text-[11px] font-semibold text-slate-500">Low stock alert</p>
                    </div>
                    <span class="text-xs font-black px-2.5 py-1 rounded-xl border bg-amber-50 text-amber-800 border-amber-100">
                      {{ it.qty }} left
                    </span>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    class="flex-1 text-xs font-black px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition"
                    @click="toastMsg('Inventory page opened (mock)')"
                  >
                    View Inventory
                  </button>
                  <button
                    type="button"
                    class="flex-1 text-xs font-black px-4 py-2 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    @click="toastMsg('Reorder request sent (mock)')"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- PROMOTION + ORDERS -->
          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <!-- PROMOTION -->
            <div class="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Promotion Effectiveness</h2>
                  <p class="pt-1 text-xs text-slate-500">Hover to see exact value (crosshair).</p>
                </div>

                <div class="relative" ref="promoDropdown">
                  <button
                    type="button"
                    class="text-xs font-black bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl border border-slate-200 transition flex items-center gap-2"
                    @click="togglePromoMenu"
                  >
                    {{ selectedCampaign }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <transition name="fade">
                    <div
                      v-if="showPromoMenu"
                      class="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden"
                    >
                      <button
                        v-for="(c, idx) in campaigns"
                        :key="c"
                        type="button"
                        class="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-between"
                        @click="selectCampaign(idx)"
                      >
                        <span class="text-slate-800">{{ c }}</span>
                        <span v-if="idx === campaignIndex" class="text-emerald-700 font-black">✓</span>
                      </button>
                    </div>
                  </transition>
                </div>
              </div>

              <div class="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden">
                <div class="relative h-64">
                  <!-- ✅ Promo y-axis with nice steps -->
                  <div class="absolute left-0 top-0 bottom-0 w-20 border-r border-slate-200 bg-white/60">
                    <div class="h-full flex flex-col justify-between py-4 text-[10px] text-slate-500 font-black">
                      <span v-for="t in promoTicks" :key="t" class="pl-2">{{ formatMoney(t) }}</span>
                    </div>
                  </div>

                  <!-- plot area + hover crosshair -->
                  <div
                    class="absolute left-20 right-0 top-0 bottom-0"
                    ref="promoPlot"
                    @mousemove="onPromoMove"
                    @mouseleave="onPromoLeave"
                  >
                    <div class="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
                      <div class="border-b border-slate-200/70"></div>
                      <div class="border-b border-slate-200/50"></div>
                      <div class="border-b border-slate-200/50"></div>
                      <div class="border-b border-slate-200/70"></div>
                    </div>

                    <div v-if="promoHoverIndex !== -1" class="absolute inset-0 pointer-events-none">
                      <div class="absolute top-0 bottom-0 w-px bg-slate-300" :style="{ left: promoHoverX + '%' }"></div>

                      <div class="absolute top-3" :style="{ left: promoHoverX + '%' }">
                        <div class="-translate-x-1/2 rounded-xl bg-slate-900 text-white px-3 py-2 shadow-lg">
                          <p class="text-[10px] font-extrabold opacity-80">
                            {{ promoLabels[promoHoverIndex] }}
                          </p>
                          <p class="text-xs font-black">
                            {{ formatMoney(promoSeries[promoHoverIndex]) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 240">
                      <polyline
                        :points="promoPoints"
                        fill="none"
                        stroke="#059669"
                        stroke-width="3"
                        vector-effect="non-scaling-stroke"
                      />
                      <circle
                        v-for="(pt, i) in promoDots"
                        :key="i"
                        :cx="pt.x"
                        :cy="pt.y"
                        :r="promoHoverIndex === i ? 5.5 : 3.5"
                        :fill="promoHoverIndex === i ? '#047857' : '#059669'"
                      />
                    </svg>

                    <div class="absolute bottom-1 left-0 right-0 px-6 flex justify-between text-[10px] text-slate-500 font-semibold">
                      <span v-for="(d, i) in promoLabels" :key="i">{{ d }}</span>
                    </div>
                  </div>
                </div>

                <div class="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border-t border-slate-200">
                  <MetricBox title="Clicks" :value="promoStats.clicks" />
                  <MetricBox title="Conversions" :value="promoStats.conversions" />
                  <MetricBox title="ROI" :value="promoStats.roi + '%'" />
                </div>
              </div>
            </div>

            <!-- ORDERS -->
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Recent Orders</h2>
                  <p class="pt-1 text-xs text-slate-500">Latest transactions & status.</p>
                </div>
                <button
                  type="button"
                  class="text-xs font-black bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-2xl border border-slate-200 transition"
                  @click="addMockOrder"
                >
                  + Add
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr class="text-[11px] text-slate-400 font-black border-b">
                      <th class="py-2 pr-3">Order</th>
                      <th class="py-2 pr-3">Customer</th>
                      <th class="py-2 pr-3">Total</th>
                      <th class="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="o in recentOrders" :key="o.id" class="border-b last:border-b-0">
                      <td class="py-3 pr-3 text-sm font-black text-slate-900">#{{ o.id }}</td>
                      <td class="py-3 pr-3 text-sm text-slate-700 font-semibold">{{ o.customer }}</td>
                      <td class="py-3 pr-3 text-sm font-black text-slate-900">{{ formatMoney(o.total) }}</td>
                      <td class="py-3">
                        <span class="text-[10px] font-black px-2.5 py-1 rounded-xl border" :class="statusPill(o.status)">
                          {{ o.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p
                v-if="toast"
                class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-2xl"
              >
                {{ toast }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
/** Small clean tiles */
const InfoTile = defineComponent({
  name: "InfoTile",
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    valueClass: { type: String, default: "text-slate-900" },
  },
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white/70 p-4">
      <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{{ label }}</p>
      <p class="mt-1 text-lg font-black" :class="valueClass">{{ value }}</p>
    </div>
  `,
});

const StatChip = defineComponent({
  name: "StatChip",
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    valueClass: { type: String, default: "text-slate-900" },
  },
  template: `
    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">{{ label }}</p>
      <p class="mt-1 text-sm font-black" :class="valueClass">{{ value }}</p>
    </div>
  `,
});

const MetricBox = defineComponent({
  name: "MetricBox",
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
  },
  template: `
    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">{{ title }}</p>
      <p class="mt-1 text-lg font-black text-slate-900">{{ value }}</p>
    </div>
  `,
});

// Icons
const IconSales = { template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>` };
const IconOrders = { template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>` };
const IconProducts = { template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>` };
const IconCustomers = { template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>` };

type RangeKey = "daily" | "monthly" | "yearly";
type SortKey = "qty_desc" | "qty_asc" | "name_asc";

function spark(points: number[]) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(max - min, 1);

  return points
    .map((v, i) => {
      const x = (100 / (points.length - 1)) * i;
      const y = 28 - ((v - min) / span) * 22;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

// ✅ helper: round up to the next step
function niceCeil(value: number, step: number) {
  if (value <= 0) return step;
  return Math.ceil(value / step) * step;
}

export default defineComponent({
  name: "Dashboard",
  components: { InfoTile, StatChip, MetricBox },

  data() {
    return {
      toast: "" as string,
      hoverIndex: -1 as number,

      // ✅ Insights & Alerts config
      lowStockThreshold: 250,

      // promo hover state
      promoHoverIndex: -1 as number,
      promoHoverX: 0 as number, // 0..100 (%)

      range: "monthly" as RangeKey,

      showPromoMenu: false,
      showSortMenu: false,

      sortBy: "qty_desc" as SortKey,
      sortOptions: [
        { key: "qty_desc", label: "Quantity: High to Low", short: "Qty ↓" },
        { key: "qty_asc", label: "Quantity: Low to High", short: "Qty ↑" },
        { key: "name_asc", label: "Name: A to Z", short: "A→Z" },
      ] as Array<{ key: SortKey; label: string; short: string }>,

      summaryData: [
        { title: "Total Sales", value: "$50,933", percentage: 3.5, isPositive: true, progress: 72, iconComponent: markRaw(IconSales), sparkPoints: spark([2, 4, 3, 6, 7, 8, 10]) },
        { title: "Total Orders", value: "250,999", percentage: 2.9, isPositive: false, progress: 54, iconComponent: markRaw(IconOrders), sparkPoints: spark([10, 9, 8, 8, 7, 6, 6]) },
        { title: "Total Products", value: "105", percentage: 0.5, isPositive: true, progress: 38, iconComponent: markRaw(IconProducts), sparkPoints: spark([1, 2, 2, 3, 3, 4, 5]) },
        { title: "Total Customers", value: "10,001", percentage: 0.1, isPositive: false, progress: 41, iconComponent: markRaw(IconCustomers), sparkPoints: spark([8, 8, 7, 6, 6, 5, 5]) },
      ] as Array<any>,

      revenueSeries: {
        daily: [
          { label: "Mon", value: 4200 },
          { label: "Tue", value: 5100 },
          { label: "Wed", value: 4800 },
          { label: "Thu", value: 5900 },
          { label: "Fri", value: 7200 },
          { label: "Sat", value: 6800 },
          { label: "Sun", value: 7600 },
        ],
        monthly: [
          { label: "Feb", value: 21000 },
          { label: "Mar", value: 24000 },
          { label: "Apr", value: 37000 },
          { label: "May", value: 32000 },
          { label: "Jun", value: 58000 },
          { label: "Jul", value: 43000 },
          { label: "Aug", value: 51000 },
          { label: "Sep", value: 28000 },
          { label: "Oct", value: 50000 },
          { label: "Nov", value: 54000 },
        ],
        yearly: [
          { label: "2021", value: 320000 },
          { label: "2022", value: 410000 },
          { label: "2023", value: 520000 },
          { label: "2024", value: 610000 },
          { label: "2025", value: 740000 },
        ],
      } as Record<RangeKey, Array<{ label: string; value: number }>>,

      products: [
        { name: "Dresses", qty: 550, colorClass: "bg-emerald-600", colorBar: "bg-emerald-600" },
        { name: "Shoes", qty: 400, colorClass: "bg-emerald-500", colorBar: "bg-emerald-500" },
        { name: "Bags", qty: 350, colorClass: "bg-emerald-400", colorBar: "bg-emerald-400" },
        { name: "Accessories", qty: 230, colorClass: "bg-emerald-300", colorBar: "bg-emerald-300" },
        { name: "Others", qty: 200, colorClass: "bg-emerald-200", colorBar: "bg-emerald-200" },
      ] as Array<{ name: string; qty: number; colorClass: string; colorBar: string }>,

      campaigns: ["Black Friday 2025", "New Year Sale 2026", "Weekend Flash Deals"],
      campaignIndex: 0,

      promoSeries: [2200, 3100, 2900, 3300, 5200, 4300, 6100, 5900, 6400, 7000],
      promoLabels: ["1 Nov", "2 Nov", "3 Nov", "4 Nov", "5 Nov", "6 Nov", "7 Nov", "8 Nov", "9 Nov", "10 Nov"],
      promoStats: { clicks: 18240, conversions: 1240, roi: 36 },

      recentOrders: [
        { id: 10421, customer: "Sok Dara", total: 129.5, status: "Paid" },
        { id: 10420, customer: "Chan Sopheak", total: 58.0, status: "Pending" },
        { id: 10419, customer: "Ly Samnang", total: 210.0, status: "Shipped" },
        { id: 10418, customer: "Heng Ratha", total: 19.9, status: "Cancelled" },
      ] as Array<{ id: number; customer: string; total: number; status: string }>,
    };
  },

  computed: {
    todayText(): string {
      const d = new Date();
      return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    },

    compareLabel(): string {
      return this.range === "daily" ? "day" : this.range === "monthly" ? "month" : "year";
    },

    rangeLabel(): string {
      return this.range === "daily" ? "This Week" : this.range === "monthly" ? "This Year" : "Last 5 Years";
    },

    revenueData(): Array<{ label: string; value: number }> {
      return this.revenueSeries[this.range];
    },

    maxRevenue(): number {
      return Math.max(...this.revenueData.map((d) => d.value), 0);
    },

    // ✅ Revenue axis fixed step: 0, 10k, 20k...
    revenueAxisMax(): number {
      return niceCeil(this.maxRevenue, 10000);
    },

    revenueTicks(): number[] {
      const step = 10000;
      const max = this.revenueAxisMax;
      const ticks: number[] = [];
      for (let v = max; v >= 0; v -= step) ticks.push(v);
      return ticks;
    },

    formattedTotalRevenue(): string {
      const total = this.revenueData.reduce((s, d) => s + d.value, 0);
      return this.formatMoney(total);
    },

    formattedAverageRevenue(): string {
      const avg = this.revenueData.length
        ? this.revenueData.reduce((s, d) => s + d.value, 0) / this.revenueData.length
        : 0;
      return this.formatMoney(avg);
    },

    trendUp(): boolean {
      if (this.revenueData.length < 2) return true;
      return this.revenueData[this.revenueData.length - 1].value >= this.revenueData[0].value;
    },

    // ✅ Bars scale using axis max (so the tick labels match the visual scale)
    revenueBars(): Array<{ label: string; value: number; heightPx: number; isPeak: boolean }> {
      const axisMax = Math.max(this.revenueAxisMax, 1);
      const minPx = 14;
      const maxPx = 210;

      return this.revenueData.map((d) => {
        const ratio = d.value / axisMax;
        const heightPx = Math.round(minPx + ratio * (maxPx - minPx));
        return {
          label: d.label,
          value: d.value,
          heightPx,
          isPeak: d.value === this.maxRevenue,
        };
      });
    },

    // ✅ Insights & Alerts: sales insights
    peakRevenuePoint(): { label: string; value: number } {
      const data = this.revenueData;
      if (!data.length) return { label: "-", value: 0 };
      return data.reduce((best, cur) => (cur.value > best.value ? cur : best), data[0]);
    },

    lowRevenuePoint(): { label: string; value: number } {
      const data = this.revenueData;
      if (!data.length) return { label: "-", value: 0 };
      return data.reduce((worst, cur) => (cur.value < worst.value ? cur : worst), data[0]);
    },

    lastChangePct(): number {
      const data = this.revenueData;
      if (data.length < 2) return 0;
      const last = data[data.length - 1].value;
      const prev = data[data.length - 2].value;
      const denom = Math.max(prev, 1);
      return ((last - prev) / denom) * 100;
    },

    lastPointLabel(): string {
      const data = this.revenueData;
      return data.length ? data[data.length - 1].label : "-";
    },

    prevPointLabel(): string {
      const data = this.revenueData;
      return data.length >= 2 ? data[data.length - 2].label : "-";
    },

    lastChangeLabel(): string {
      const data = this.revenueData;
      if (data.length < 2) return "N/A";
      const last = data[data.length - 1].value;
      const prev = data[data.length - 2].value;
      return this.formatMoney(last - prev);
    },

    sortShortLabel(): string {
      const f = this.sortOptions.find((o) => o.key === this.sortBy);
      return f ? f.short : "Qty ↓";
    },

    sortedTopProducts(): Array<{ name: string; qty: number; colorClass: string; colorBar: string; percent: number }> {
      const copy = [...this.products];
      if (this.sortBy === "qty_desc") copy.sort((a, b) => b.qty - a.qty);
      if (this.sortBy === "qty_asc") copy.sort((a, b) => a.qty - b.qty);
      if (this.sortBy === "name_asc") copy.sort((a, b) => a.name.localeCompare(b.name));

      const top = copy.slice(0, 5);
      const max = Math.max(...top.map((p) => p.qty), 1);
      return top.map((p) => ({ ...p, percent: Math.round((p.qty / max) * 100) }));
    },

    selectedCampaign(): string {
      return this.campaigns[this.campaignIndex];
    },

    promoMax(): number {
      return Math.max(...this.promoSeries, 0);
    },

    // ✅ Promo axis with nice steps (1,000)
    promoAxisMax(): number {
      return niceCeil(this.promoMax, 1000);
    },

    promoTicks(): number[] {
      const step = 1000;
      const max = this.promoAxisMax;
      const ticks: number[] = [];
      for (let v = max; v >= 0; v -= step) ticks.push(v);
      return ticks;
    },

    // ✅ Scale line chart using promoAxisMax
    promoPoints(): string {
      const w = 1000;
      const h = 240;
      const max = Math.max(this.promoAxisMax, 1);
      return this.promoSeries
        .map((v, i) => {
          const x = (w / (this.promoSeries.length - 1)) * i;
          const y = h - (v / max) * (h - 45) - 10;
          return `${x},${y}`;
        })
        .join(" ");
    },

    promoDots(): Array<{ x: number; y: number }> {
      const w = 1000;
      const h = 240;
      const max = Math.max(this.promoAxisMax, 1);
      return this.promoSeries.map((v, i) => {
        const x = (w / (this.promoSeries.length - 1)) * i;
        const y = h - (v / max) * (h - 45) - 10;
        return { x, y };
      });
    },

    // ✅ Insights & Alerts: inventory alerts (mock from products.qty)
    lowStockItems(): Array<{ name: string; qty: number }> {
      const t = this.lowStockThreshold;
      return [...this.products]
        .filter((p) => p.qty <= t)
        .sort((a, b) => a.qty - b.qty)
        .slice(0, 3)
        .map((p) => ({ name: p.name, qty: p.qty }));
    },

    // ✅ Insights & Alerts: promo insight text
    promoInsightText(): string {
      const roi = this.promoStats.roi;
      const conv = this.promoStats.conversions;

      if (roi >= 40) return `Strong campaign performance. ROI is ${roi}% with ${conv} conversions. Consider extending the campaign duration.`;
      if (roi >= 30) return `Healthy performance. ROI is ${roi}% and conversions are stable (${conv}). Try A/B testing a better discount or banner.`;
      return `Campaign performance is low (ROI ${roi}%). Consider changing discount rules or targeting different products.`;
    },
  },

  mounted() {
    document.addEventListener("click", this.handleOutsideClick, true);
    document.addEventListener("keydown", this.handleKeydown, true);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, true);
    document.removeEventListener("keydown", this.handleKeydown, true);
  },

  methods: {
    setRange(r: RangeKey) {
      this.range = r;
      this.toastMsg(`Switched to ${r}`);
    },

    togglePromoMenu() {
      this.showPromoMenu = !this.showPromoMenu;
      if (this.showPromoMenu) this.showSortMenu = false;
    },

    toggleSortMenu() {
      this.showSortMenu = !this.showSortMenu;
      if (this.showSortMenu) this.showPromoMenu = false;
    },

    selectCampaign(idx: number) {
      this.campaignIndex = idx;
      this.showPromoMenu = false;

      const bump = idx + 1;
      this.promoStats = {
        clicks: 18000 + bump * 520,
        conversions: 1200 + bump * 55,
        roi: 34 + bump * 2,
      };
      this.toastMsg(`Campaign: ${this.selectedCampaign}`);
    },

    selectSort(key: SortKey) {
      this.sortBy = key;
      this.showSortMenu = false;
      this.toastMsg(`Sorting: ${this.sortShortLabel}`);
    },

    handleOutsideClick(e: MouseEvent) {
      const promo = this.$refs.promoDropdown as HTMLElement | undefined;
      const sort = this.$refs.sortDropdown as HTMLElement | undefined;
      const target = e.target as Node | null;

      if (this.showPromoMenu && promo && target && !promo.contains(target)) this.showPromoMenu = false;
      if (this.showSortMenu && sort && target && !sort.contains(target)) this.showSortMenu = false;
    },

    handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.showPromoMenu = false;
        this.showSortMenu = false;
      }
    },

    addMockOrder() {
      const nextId = (this.recentOrders[0]?.id ?? 10400) + 1;
      const statuses = ["Paid", "Pending", "Shipped", "Cancelled"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const total = Math.round((Math.random() * 300 + 10) * 10) / 10;

      this.recentOrders.unshift({ id: nextId, customer: "Mock Customer", total, status });
      this.recentOrders = this.recentOrders.slice(0, 6);
      this.toastMsg(`Added order #${nextId}`);
    },

    refreshMock() {
      this.summaryData = this.summaryData.map((k: any) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = Math.min(100, Math.max(0, k.progress + delta));
        return { ...k, progress: next };
      });
      this.toastMsg("Dashboard refreshed ✅");
    },

    statusPill(status: string) {
      switch (status) {
        case "Paid":
          return "bg-emerald-50 text-emerald-700 border-emerald-100";
        case "Shipped":
          return "bg-sky-50 text-sky-700 border-sky-100";
        case "Pending":
          return "bg-amber-50 text-amber-800 border-amber-100";
        case "Cancelled":
          return "bg-rose-50 text-rose-700 border-rose-100";
        default:
          return "bg-slate-50 text-slate-700 border-slate-200";
      }
    },

    formatMoney(n: number): string {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
    },

    toastMsg(msg: string) {
      this.toast = msg;
      window.clearTimeout((this as any)._t);
      (this as any)._t = window.setTimeout(() => (this.toast = ""), 1400);
    },

    // Promotion hover crosshair
    onPromoMove(e: MouseEvent) {
      const plot = this.$refs.promoPlot as HTMLElement | undefined;
      if (!plot) return;

      const rect = plot.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = Math.max(rect.width, 1);

      const n = this.promoSeries.length;
      if (n <= 1) return;

      const raw = (x / w) * (n - 1);
      let idx = Math.round(raw);
      idx = Math.max(0, Math.min(n - 1, idx));

      this.promoHoverIndex = idx;
      this.promoHoverX = (idx / (n - 1)) * 100;
    },

    onPromoLeave() {
      this.promoHoverIndex = -1;
    },

    async generateReport() {
      try {
        const mod = await import("jspdf");
        const jsPDF = (mod as any).jsPDF;
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Admin Dashboard Report", 14, 16);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Generated: ${this.todayText}`, 14, 24);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("KPIs", 14, 36);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const kpis = this.summaryData.map((k: any) => `${k.title}: ${k.value} (${k.isPositive ? "+" : ""}${k.percentage}%)`);
        let y = 44;
        for (const line of kpis) {
          doc.text(line, 14, y);
          y += 6;
        }

        y += 4;
        doc.setFont("helvetica", "bold");
        doc.text("Revenue", 14, y);
        y += 8;

        doc.setFont("helvetica", "normal");
        const rows = this.revenueData.map((d) => `${d.label}: ${this.formatMoney(d.value)}`);
        for (const line of rows) {
          if (y > 280) {
            doc.addPage();
            y = 16;
          }
          doc.text(line, 14, y);
          y += 6;
        }

        y += 6;
        doc.setFont("helvetica", "bold");
        doc.text("Recent Orders", 14, y);
        y += 8;

        doc.setFont("helvetica", "normal");
        for (const o of this.recentOrders.slice(0, 6)) {
          if (y > 280) {
            doc.addPage();
            y = 16;
          }
          doc.text(`#${o.id} • ${o.customer} • ${this.formatMoney(o.total)} • ${o.status}`, 14, y);
          y += 6;
        }

        doc.save(`dashboard-report-${new Date().toISOString().slice(0, 10)}.pdf`);
        this.toastMsg("Report downloaded ✅");
      } catch (err) {
        this.toastMsg("Install jspdf first: npm i jspdf");
      }
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>