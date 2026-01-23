<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10">
      <div class="w-full">
        <!-- Header -->
        <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div class="relative p-6 sm:p-7">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50"></div>
            <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div class="min-w-0">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span class="px-2 py-1 rounded-lg bg-white/70 border border-slate-200">Admin</span>
                  <span>•</span>
                  <span class="truncate">{{ todayText }}</span>
                </div>
                <h1 class="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Promotions
                </h1>
                <p class="mt-1 text-sm text-slate-600">
                  Create, monitor, and optimize campaigns — clean overview for your teacher.
                </p>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
                <button
                  type="button"
                  class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition"
                  @click="refresh"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                  @click="openCreate"
                >
                  + Create Promotion
                </button>
              </div>
            </div>

            <!-- KPI Strip -->
            <div class="relative mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoTile label="Active Campaigns" :value="String(kpi.active)" badge="+ this week" />
              <InfoTile label="Total Redemptions" :value="String(kpi.redemptions)" badge="Redemption rate" />
              <InfoTile label="Revenue Impact" :value="formatMoney(kpi.revenueImpact)" badge="Estimated lift" />
            </div>
          </div>
        </section>

        <!-- Content spacing -->
        <div class="pt-8 flex flex-col gap-8">
          <!-- Controls -->
          <section class="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <!-- Left: search + filters -->
              <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
                <!-- Search -->
                <div class="relative w-full sm:w-80">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    v-model="search"
                    type="text"
                    class="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800"
                    placeholder="Search promotions (name, type, applies to)..."
                  />
                </div>

                <!-- Status filter pills -->
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl text-xs font-black border transition"
                    :class="statusFilter === 'All' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="statusFilter = 'All'"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl text-xs font-black border transition"
                    :class="statusFilter === 'Active' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="statusFilter = 'Active'"
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl text-xs font-black border transition"
                    :class="statusFilter === 'Expired' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="statusFilter = 'Expired'"
                  >
                    Expired
                  </button>
                </div>
              </div>

              <!-- Right: sort + export -->
              <div class="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                <!-- Sort dropdown -->
                <div class="relative" ref="sortRef">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition flex items-center gap-2"
                    @click="toggleSort"
                  >
                    Sort
                    <span class="text-slate-500 font-black">•</span>
                    <span class="text-slate-700">{{ sortLabel }}</span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <transition name="fade">
                    <div
                      v-if="showSort"
                      class="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden"
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

                <button
                  type="button"
                  class="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-sm transition flex items-center gap-2"
                  @click="exportCsv"
                >
                  Export CSV
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Active filters row -->
            <div class="pt-4 flex flex-wrap items-center gap-2">
              <TagPill label="Status" :value="statusFilter" @clear="statusFilter = 'All'" />
              <TagPill label="Search" :value="searchTrimmed || '—'" :canClear="Boolean(searchTrimmed)" @clear="search = ''" />
              <div class="ml-auto">
                <p class="text-xs font-semibold text-slate-500">
                  Showing <span class="font-black text-slate-800">{{ paginated.length }}</span> of
                  <span class="font-black text-slate-800">{{ filteredAndSorted.length }}</span>
                </p>
              </div>
            </div>
          </section>

          <!-- Table / Cards -->
          <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <!-- Desktop header -->
            <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wide border-b border-slate-200 bg-slate-50">
              <div class="col-span-3">Name</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Value</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-1">Usage</div>
              <div class="col-span-2">Date</div>
              <div class="col-span-1 text-right">Action</div>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="p-6 space-y-3">
              <div v-for="n in 6" :key="n" class="h-16 bg-slate-100 rounded-2xl animate-pulse"></div>
            </div>

            <!-- Empty -->
            <div v-else-if="paginated.length === 0" class="p-10 text-center">
              <div class="mx-auto w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-3 text-lg font-black text-slate-900">No promotions found</h3>
              <p class="mt-1 text-sm text-slate-600">Try changing filters or create a new promotion.</p>
              <button
                type="button"
                class="mt-4 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                @click="openCreate"
              >
                + Create Promotion
              </button>
            </div>

            <!-- Rows -->
            <div v-else class="divide-y divide-slate-200">
              <div
                v-for="promo in paginated"
                :key="promo.id"
                class="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center hover:bg-slate-50/60 transition"
              >
                <!-- Name + Applies (compact) -->
                <div class="md:col-span-3">
                  <p class="text-sm font-black text-slate-900 truncate">{{ promo.name }}</p>
                  <p class="mt-1 text-xs text-slate-500 truncate">Applies to: <span class="font-semibold text-slate-700">{{ promo.appliesTo }}</span></p>
                </div>

                <div class="md:col-span-2">
                  <span class="inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-2xl border"
                        :class="promo.type === 'Discount' ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                              : promo.type === 'Free Shipping' ? 'bg-sky-50 text-sky-800 border-sky-100'
                              : 'bg-slate-50 text-slate-800 border-slate-200'">
                    <span class="w-2 h-2 rounded-full"
                          :class="promo.type === 'Discount' ? 'bg-emerald-600'
                                : promo.type === 'Free Shipping' ? 'bg-sky-600'
                                : 'bg-slate-500'"></span>
                    {{ promo.type }}
                  </span>
                </div>

                <div class="md:col-span-1">
                  <p class="text-sm font-black text-emerald-700">{{ promo.value }}</p>
                </div>

                <div class="md:col-span-2">
                  <span
                    class="inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-2xl border"
                    :class="promo.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200'"
                  >
                    <span class="w-2 h-2 rounded-full" :class="promo.status === 'Active' ? 'bg-emerald-600' : 'bg-slate-400'"></span>
                    {{ promo.status }}
                  </span>

                  <!-- Usage progress -->
                  <div class="mt-2">
                    <div class="flex justify-between text-[11px] text-slate-500 font-semibold">
                      <span>Usage</span>
                      <span class="text-slate-700 font-black">{{ promo.used }}/{{ promo.limitText }}</span>
                    </div>
                    <div class="mt-1 h-2.5 rounded-full bg-white border border-slate-200 overflow-hidden">
                      <div
                        class="h-full rounded-full"
                        :class="promo.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'"
                        :style="{ width: promo.usagePercent + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="md:col-span-1">
                  <p class="text-sm font-semibold text-slate-700">{{ promo.usageLabel }}</p>
                  <p class="text-[11px] text-slate-500 font-semibold">{{ promo.usageHint }}</p>
                </div>

                <div class="md:col-span-2">
                  <p class="text-xs font-black text-slate-800">{{ promo.dateRange }}</p>
                  <p class="text-[11px] text-slate-500 font-semibold">Created: {{ promo.createdAt }}</p>
                </div>

                <div class="md:col-span-1 md:text-right flex md:justify-end gap-2">
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                    @click="openView(promo)"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition"
                    @click="openEdit(promo)"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p class="text-xs font-semibold text-slate-500">
                Page <span class="font-black text-slate-800">{{ page }}</span> of
                <span class="font-black text-slate-800">{{ totalPages }}</span>
              </p>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="page === 1"
                  @click="page = Math.max(1, page - 1)"
                >
                  Prev
                </button>
                <button
                  type="button"
                  class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="page === totalPages"
                  @click="page = Math.min(totalPages, page + 1)"
                >
                  Next
                </button>

                <div class="ml-2 flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500">Rows</span>
                  <select
                    v-model.number="pageSize"
                    class="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option :value="5">5</option>
                    <option :value="8">8</option>
                    <option :value="10">10</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Toast -->
      <div
        v-if="toast"
        class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold shadow-lg"
      >
        {{ toast }}
      </div>

      <!-- Modal: Create/Edit/View -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40" @click="closeModal"></div>

        <div class="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
            <div>
              <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">
                {{ modalModeLabel }}
              </p>
              <h3 class="mt-1 text-lg font-black text-slate-900">
                {{ modalTitle }}
              </h3>
            </div>
            <button
              type="button"
              class="w-10 h-10 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center"
              @click="closeModal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                v-model="form.name"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
                placeholder="e.g., New Year 10% Off"
              />
            </Field>

            <Field label="Type">
              <select
                v-model="form.type"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
              >
                <option value="Discount">Discount</option>
                <option value="Free Shipping">Free Shipping</option>
                <option value="Voucher">Voucher</option>
              </select>
            </Field>

            <Field label="Value">
              <input
                v-model="form.value"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
                placeholder="e.g., 10% off / $5 / Free"
              />
            </Field>

            <Field label="Applies To">
              <input
                v-model="form.appliesTo"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
                placeholder="e.g., All Products / Category: Dogs"
              />
            </Field>

            <Field label="Usage Limit">
              <select
                v-model="form.limit"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
              >
                <option value="Unlimited">Unlimited</option>
                <option value="100">100</option>
                <option value="250">250</option>
                <option value="500">500</option>
              </select>
            </Field>

            <Field label="Status">
              <select
                v-model="form.status"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </Field>

            <Field label="Start Date">
              <input
                v-model="form.start"
                type="date"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
              />
            </Field>

            <Field label="End Date">
              <input
                v-model="form.end"
                type="date"
                :disabled="modalMode === 'view'"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-slate-800 disabled:opacity-70"
              />
            </Field>
          </div>

          <div class="p-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-xs font-semibold text-slate-500">
              Tip: Keep names consistent & use clear date ranges for better reporting.
            </p>

            <div class="flex items-center gap-2 justify-end">
              <button
                type="button"
                class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                @click="closeModal"
              >
                Close
              </button>

              <button
                v-if="modalMode !== 'view'"
                type="button"
                class="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition"
                @click="savePromotion"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type PromoStatus = "Active" | "Expired";
type PromoType = "Discount" | "Free Shipping" | "Voucher";
type StatusFilter = "All" | PromoStatus;
type SortKey = "name_asc" | "date_desc" | "usage_desc" | "status_first";

interface Promotion {
  id: number;
  name: string;
  type: PromoType;
  value: string;
  status: PromoStatus;
  appliesTo: string;

  // tracking
  limit: "Unlimited" | "100" | "250" | "500";
  used: number;

  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  createdAt: string; // YYYY-MM-DD
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function toDateLabel(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB"); // dd/mm/yyyy feel
}

export default defineComponent({
  name: "Promotions",
  components: { },

  props: {
    globalSearch: { type: String, default: '' },
  },

  data() {
    return {
      loading: true,

      promotions: [] as Promotion[],

      // UI state
      toast: "" as string,
      search: "" as string,
      statusFilter: "All" as StatusFilter,

      showSort: false,
      sortBy: "date_desc" as SortKey,
      sortOptions: [
        { key: "date_desc", label: "Newest first", short: "Newest" },
        { key: "name_asc", label: "Name A → Z", short: "A→Z" },
        { key: "usage_desc", label: "Most used", short: "Usage" },
        { key: "status_first", label: "Active first", short: "Active" },
      ] as Array<{ key: SortKey; label: string; short: string }>,

      // pagination
      page: 1 as number,
      pageSize: 8 as number,

      // modal
      showModal: false as boolean,
      modalMode: "create" as "create" | "edit" | "view",
      activeId: null as number | null,
      form: {
        name: "",
        type: "Discount" as PromoType,
        value: "",
        status: "Active" as PromoStatus,
        appliesTo: "All Products",
        limit: "Unlimited" as Promotion["limit"],
        start: "",
        end: "",
      },
    };
  },

  computed: {
    todayText(): string {
      const d = new Date();
      return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    },

    searchTrimmed(): string {
      return this.search.trim();
    },

    sortLabel(): string {
      const f = this.sortOptions.find((o) => o.key === this.sortBy);
      return f ? f.short : "Newest";
    },

    kpi(): { active: number; redemptions: number; revenueImpact: number } {
      const active = this.promotions.filter((p) => p.status === "Active").length;
      const redemptions = this.promotions.reduce((s, p) => s + p.used, 0);
      // simple estimate: each redemption worth $15
      const revenueImpact = Math.round(redemptions * 15 * 10) / 10;
      return { active, redemptions, revenueImpact };
    },

    normalized(): Array<any> {
      // add derived UI fields
      return this.promotions.map((p) => {
        const limitNum = p.limit === "Unlimited" ? null : Number(p.limit);
        const usagePercent = limitNum ? clamp(Math.round((p.used / limitNum) * 100), 0, 100) : clamp(Math.round((p.used / 200) * 100), 0, 100);

        return {
          ...p,
          dateRange: `${toDateLabel(p.start)} - ${toDateLabel(p.end)}`,
          limitText: p.limit === "Unlimited" ? "∞" : p.limit,
          usagePercent,
          usageLabel: p.limit === "Unlimited" ? "Unlimited" : `${p.used}/${p.limit}`,
          usageHint: p.limit === "Unlimited" ? `${p.used} used` : "tracked",
        };
      });
    },

    filteredAndSorted(): Array<any> {
      const q = this.searchTrimmed.toLowerCase();

      let list = this.normalized.filter((p) => {
        const matchesStatus = this.statusFilter === "All" ? true : p.status === this.statusFilter;
        const matchesSearch = !q
          ? true
          : `${p.name} ${p.type} ${p.value} ${p.appliesTo}`.toLowerCase().includes(q);

        return matchesStatus && matchesSearch;
      });

      // sort
      if (this.sortBy === "name_asc") {
        list = list.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (this.sortBy === "date_desc") {
        list = list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      }
      if (this.sortBy === "usage_desc") {
        list = list.sort((a, b) => b.used - a.used);
      }
      if (this.sortBy === "status_first") {
        list = list.sort((a, b) => (a.status === b.status ? 0 : a.status === "Active" ? -1 : 1));
      }

      return list;
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.filteredAndSorted.length / this.pageSize));
    },

    paginated(): Array<any> {
      // keep page valid
      const p = clamp(this.page, 1, this.totalPages);
      if (p !== this.page) (this as any).page = p;

      const start = (p - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredAndSorted.slice(start, end);
    },

    modalModeLabel(): string {
      return this.modalMode === "create" ? "Create" : this.modalMode === "edit" ? "Edit" : "View";
    },

    modalTitle(): string {
      if (this.modalMode === "create") return "New Promotion";
      const p = this.promotions.find((x) => x.id === this.activeId);
      return p ? p.name : "Promotion";
    },
  },

  watch: {
    globalSearch(newVal: string) { this.search = newVal || ''; this.page = 1; },
    // reset page when filters change
    search() { this.page = 1; },
    statusFilter() { this.page = 1; },
    pageSize() { this.page = 1; },
  },

  mounted() {
    this.fetchPromotions();
    document.addEventListener("click", this.handleOutsideClick, true);
    document.addEventListener("keydown", this.handleKeydown, true);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, true);
    document.removeEventListener("keydown", this.handleKeydown, true);
  },

  methods: {
    formatMoney(n: number): string {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
    },

    toastMsg(msg: string) {
      this.toast = msg;
      window.clearTimeout((this as any)._t);
      (this as any)._t = window.setTimeout(() => (this.toast = ""), 1400);
    },

    toggleSort() {
      this.showSort = !this.showSort;
    },

    selectSort(key: SortKey) {
      this.sortBy = key;
      this.showSort = false;
      this.toastMsg(`Sort: ${this.sortLabel}`);
    },

    handleOutsideClick(e: MouseEvent) {
      const sort = this.$refs.sortRef as HTMLElement | undefined;
      const target = e.target as Node | null;
      if (this.showSort && sort && target && !sort.contains(target)) this.showSort = false;
    },

    handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.showSort = false;
        this.showModal = false;
      }
    },

    refresh() {
      this.fetchPromotions();
      this.toastMsg("Refreshed ✅");
    },

    async fetchPromotions() {
      this.loading = true;
      try {
        await new Promise((r) => setTimeout(r, 650));

        // Demo data: looks real + shows advantage (usage tracking + dates + types)
        const base: Promotion[] = [
          {
            id: 1,
            name: "New Year 10% Off",
            type: "Discount",
            value: "10% off",
            status: "Active",
            appliesTo: "All Products",
            limit: "500",
            used: 188,
            start: "2026-01-01",
            end: "2026-01-31",
            createdAt: "2025-12-28",
          },
          {
            id: 2,
            name: "Weekend Free Shipping",
            type: "Free Shipping",
            value: "Free",
            status: "Active",
            appliesTo: "Orders > $20",
            limit: "Unlimited",
            used: 96,
            start: "2026-01-10",
            end: "2026-02-10",
            createdAt: "2026-01-09",
          },
          {
            id: 3,
            name: "Dog Food Voucher",
            type: "Voucher",
            value: "$5",
            status: "Active",
            appliesTo: "Category: Dog Food",
            limit: "250",
            used: 143,
            start: "2026-01-05",
            end: "2026-03-05",
            createdAt: "2026-01-05",
          },
          {
            id: 4,
            name: "Black Friday 2025",
            type: "Discount",
            value: "25% off",
            status: "Expired",
            appliesTo: "Selected Items",
            limit: "500",
            used: 500,
            start: "2025-11-20",
            end: "2025-11-30",
            createdAt: "2025-11-10",
          },
          {
            id: 5,
            name: "Accessories Bundle Deal",
            type: "Discount",
            value: "15% off",
            status: "Expired",
            appliesTo: "Accessories",
            limit: "100",
            used: 88,
            start: "2025-12-01",
            end: "2025-12-20",
            createdAt: "2025-11-28",
          },
        ];

        this.promotions = base;
      } finally {
        this.loading = false;
      }
    },

    // Modal helpers
    openCreate() {
      this.modalMode = "create";
      this.activeId = null;
      const today = new Date();
      const iso = today.toISOString().slice(0, 10);
      this.form = {
        name: "",
        type: "Discount",
        value: "",
        status: "Active",
        appliesTo: "All Products",
        limit: "Unlimited",
        start: iso,
        end: iso,
      };
      this.showModal = true;
    },

    openView(p: Promotion) {
      this.modalMode = "view";
      this.activeId = p.id;
      this.form = {
        name: p.name,
        type: p.type,
        value: p.value,
        status: p.status,
        appliesTo: p.appliesTo,
        limit: p.limit,
        start: p.start,
        end: p.end,
      };
      this.showModal = true;
    },

    openEdit(p: Promotion) {
      this.modalMode = "edit";
      this.activeId = p.id;
      this.form = {
        name: p.name,
        type: p.type,
        value: p.value,
        status: p.status,
        appliesTo: p.appliesTo,
        limit: p.limit,
        start: p.start,
        end: p.end,
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    savePromotion() {
      // Basic validation (teacher-friendly)
      const name = this.form.name.trim();
      const value = this.form.value.trim();
      const appliesTo = this.form.appliesTo.trim();

      if (!name || !value || !appliesTo) {
        this.toastMsg("Please fill Name, Value, and Applies To.");
        return;
      }
      if (this.form.start && this.form.end && this.form.end < this.form.start) {
        this.toastMsg("End date must be after start date.");
        return;
      }

      if (this.modalMode === "create") {
        const nextId = Math.max(0, ...this.promotions.map((x) => x.id)) + 1;
        const createdAt = new Date().toISOString().slice(0, 10);

        const limit = this.form.limit;
        const used = 0;

        this.promotions.unshift({
          id: nextId,
          name,
          type: this.form.type,
          value,
          status: this.form.status,
          appliesTo,
          limit,
          used,
          start: this.form.start,
          end: this.form.end,
          createdAt,
        });

        this.toastMsg("Promotion created ✅");
      } else if (this.modalMode === "edit" && this.activeId != null) {
        const idx = this.promotions.findIndex((x) => x.id === this.activeId);
        if (idx !== -1) {
          const prev = this.promotions[idx];
          this.promotions[idx] = {
            ...prev,
            name,
            type: this.form.type,
            value,
            status: this.form.status,
            appliesTo,
            limit: this.form.limit,
            start: this.form.start,
            end: this.form.end,
          };
          this.toastMsg("Promotion updated ✅");
        }
      }

      this.showModal = false;
    },

    exportCsv() {
      const rows = this.filteredAndSorted;
      const header = ["Name", "Type", "Value", "Status", "Used", "Limit", "Start", "End", "Applies To", "Created At"];

      const escape = (s: any) => {
        const str = String(s ?? "");
        // wrap if contains comma or quote
        if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
        return str;
      };

      const csv = [
        header.join(","),
        ...rows.map((p: any) =>
          [
            p.name,
            p.type,
            p.value,
            p.status,
            p.used,
            p.limit === "Unlimited" ? "Unlimited" : p.limit,
            p.start,
            p.end,
            p.appliesTo,
            p.createdAt,
          ].map(escape).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `promotions-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();

      URL.revokeObjectURL(url);
      this.toastMsg("CSV exported ✅");
    },
  },
});

/** Small UI components (same file, clean) */
const InfoTile = defineComponent({
  name: "InfoTile",
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    badge: { type: String, default: "" },
  },
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{{ label }}</p>
        <p class="mt-1 text-xl font-black text-slate-900">{{ value }}</p>
      </div>
      <div v-if="badge" class="shrink-0">
        <span class="text-[10px] font-black px-2.5 py-1 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-100">
          {{ badge }}
        </span>
      </div>
    </div>
  `,
});

const TagPill = defineComponent({
  name: "TagPill",
  emits: ["clear"],
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    canClear: { type: Boolean, default: true },
  },
  template: `
    <span class="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-black text-slate-800">
      <span class="text-slate-500 font-extrabold">{{ label }}:</span>
      <span class="truncate max-w-[180px]">{{ value }}</span>
      <button v-if="canClear" type="button" class="text-slate-500 hover:text-slate-900" @click="$emit('clear')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </span>
  `,
});

const Field = defineComponent({
  name: "Field",
  template: `
    <label class="block">
      <span class="block text-[11px] font-black text-slate-500 uppercase tracking-wide"><slot name="label"/></span>
      <div class="pt-2"><slot /></div>
    </label>
  `,
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