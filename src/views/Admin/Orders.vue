<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10">
      <!-- PAGE WRAPPER (full width) -->
      <div class="w-full">
        <!-- HERO -->
        <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50"></div>

          <div class="relative p-6 sm:p-8">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div class="min-w-0">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span class="px-2 py-1 rounded-lg bg-white/70 border border-slate-200">Admin</span>
                  <span>•</span>
                  <span class="truncate">{{ todayText }}</span>
                </div>

                <h1 class="pt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Orders Center
                </h1>

                <p class="pt-1 text-sm text-slate-600">
                  Search, filter, sort, and export orders — clean and easy to explain to teacher at a glance.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
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
                  @click="exportCSV"
                >
                  Export CSV
                </button>
              </div>
            </div>

            <!-- KPI STRIP -->
            <div class="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <InfoTile label="Total Orders" :value="String(stats.total)" />
              <InfoTile label="Revenue" :value="formatMoney(stats.revenue)" />
              <InfoTile label="Paid" :value="String(stats.paid)" :valueClass="'text-emerald-700'" />
              <InfoTile label="Pending" :value="String(stats.pending)" :valueClass="'text-amber-700'" />
            </div>
          </div>
        </section>

        <!-- CONTENT -->
        <div class="pt-8 flex flex-col gap-8">
          <!-- FILTER BAR -->
          <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div class="p-6 sm:p-7">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <!-- Left: Status tabs -->
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="t in statusTabs"
                    :key="t.key"
                    type="button"
                    class="px-4 py-2 rounded-2xl border text-xs font-extrabold transition"
                    :class="activeStatus === t.key
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="activeStatus = t.key; page = 1"
                  >
                    {{ t.label }}
                    <span
                      class="ml-2 px-2 py-0.5 rounded-xl text-[10px] font-black"
                      :class="activeStatus === t.key ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-700'"
                    >
                      {{ t.count }}
                    </span>
                  </button>
                </div>

                <!-- Right: Search + Sort -->
                <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <div class="relative w-full sm:w-80">
                    <input
                      v-model.trim="q"
                      type="text"
                      placeholder="Search by Order ID / Customer / Status…"
                      class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <button
                      v-if="q"
                      type="button"
                      class="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-xl text-xs font-black text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 transition"
                      @click="q=''; page=1"
                      title="Clear"
                    >
                      ✕
                    </button>
                  </div>

                  <div class="relative" ref="sortRef">
                    <button
                      type="button"
                      class="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition flex items-center justify-between gap-2"
                      @click="showSort = !showSort"
                    >
                      <span class="flex items-center gap-2">
                        <span class="text-slate-500 font-black">Sort:</span>
                        <span>{{ sortLabel }}</span>
                      </span>
                      <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <transition name="fade">
                      <div
                        v-if="showSort"
                        class="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden"
                      >
                        <button
                          v-for="opt in sortOptions"
                          :key="opt.key"
                          type="button"
                          class="w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-between"
                          @click="setSort(opt.key)"
                        >
                          <span class="text-slate-800">{{ opt.label }}</span>
                          <span v-if="opt.key === sortBy" class="text-emerald-700 font-black">✓</span>
                        </button>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>

              <!-- Quick helpers -->
              <div class="pt-4 flex flex-wrap gap-2">
                <span class="text-[11px] font-black px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  Tip: click a row to view details
                </span>
                <span class="text-[11px] font-black px-3 py-2 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                  Fully functional: search + filter + sort + pagination + CSV export
                </span>
              </div>
            </div>
          </section>

          <!-- TABLE CARD -->
          <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div class="p-6 sm:p-7 border-b border-slate-200 bg-slate-50">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Orders List</h2>
                  <p class="pt-1 text-xs text-slate-500">
                    {{ filteredSorted.length }} result(s) • Page {{ page }} of {{ totalPages }}
                  </p>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold shadow-sm transition"
                    @click="addMockOrder"
                  >
                    + Add Mock
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6 sm:p-7">
              <!-- empty state -->
              <div v-if="paged.length === 0" class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p class="text-sm font-black text-slate-900">No orders found</p>
                <p class="pt-1 text-xs text-slate-500">Try another status tab or clear the search.</p>
              </div>

              <!-- table -->
              <div v-else class="overflow-x-auto rounded-3xl border border-slate-200">
                <table class="w-full min-w-[820px] text-left">
                  <thead class="bg-slate-50">
                    <tr class="text-[11px] uppercase tracking-wide text-slate-500 font-black border-b border-slate-200">
                      <th class="py-3 px-4">Order</th>
                      <th class="py-3 px-4">Customer</th>
                      <th class="py-3 px-4">Date</th>
                      <th class="py-3 px-4">Total</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="o in paged"
                      :key="o.id"
                      class="border-b last:border-b-0 hover:bg-slate-50 transition cursor-pointer"
                      @click="openDetails(o)"
                    >
                      <td class="py-4 px-4 text-sm font-black text-slate-900">#{{ o.id }}</td>
                      <td class="py-4 px-4">
                        <div class="flex items-center gap-3">
                          <div class="w-9 h-9 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-xs font-black text-slate-700">
                            {{ initials(o.customer) }}
                          </div>
                          <div class="min-w-0">
                            <p class="text-sm font-black text-slate-900 truncate">{{ o.customer }}</p>
                            <p class="pt-0.5 text-[11px] font-semibold text-slate-500 truncate">{{ o.email }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-4 text-sm font-semibold text-slate-700">{{ formatDate(o.date) }}</td>
                      <td class="py-4 px-4 text-sm font-black text-slate-900">{{ formatMoney(o.total) }}</td>
                      <td class="py-4 px-4">
                        <span class="text-[10px] font-black px-3 py-1.5 rounded-2xl border" :class="statusPill(o.status)">
                          {{ o.status }}
                        </span>
                      </td>
                      <td class="py-4 px-4 text-right">
                        <button
                          type="button"
                          class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                          @click.stop="openDetails(o)"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- pagination -->
              <div class="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p class="text-xs font-semibold text-slate-500">
                  Showing <span class="font-black text-slate-800">{{ pageStart }}</span>–<span class="font-black text-slate-800">{{ pageEnd }}</span>
                  of <span class="font-black text-slate-800">{{ filteredSorted.length }}</span>
                </p>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-extrabold text-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="page === 1"
                    @click="page = Math.max(1, page - 1)"
                  >
                    Prev
                  </button>

                  <div class="px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-black text-slate-800">
                    Page {{ page }} / {{ totalPages }}
                  </div>

                  <button
                    type="button"
                    class="px-3 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-extrabold text-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="page === totalPages"
                    @click="page = Math.min(totalPages, page + 1)"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- toast -->
              <p
                v-if="toast"
                class="pt-5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-2xl"
              >
                {{ toast }}
              </p>
            </div>
          </section>
        </div>
      </div>

      <!-- DETAILS MODAL -->
      <transition name="fade">
        <div
          v-if="showDetails"
          class="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          @click.self="closeDetails"
        >
          <div class="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-bold text-slate-500">Order Details</p>
                <p class="pt-1 text-lg font-black text-slate-900">#{{ selected?.id }}</p>
              </div>
              <button
                type="button"
                class="px-3 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-extrabold text-slate-800 transition"
                @click="closeDetails"
              >
                Close
              </button>
            </div>

            <div class="p-6 flex flex-col gap-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailTile label="Customer" :value="selected?.customer || '-'" />
                <DetailTile label="Email" :value="selected?.email || '-'" />
                <DetailTile label="Date" :value="selected ? formatDate(selected.date) : '-'" />
                <DetailTile label="Total" :value="selected ? formatMoney(selected.total) : '-'" />
              </div>

              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-black text-slate-900">Status</p>
                  <span class="text-[10px] font-black px-3 py-1.5 rounded-2xl border" :class="selected ? statusPill(selected.status) : ''">
                    {{ selected?.status || '-' }}
                  </span>
                </div>
                <p class="pt-2 text-xs font-semibold text-slate-600">
                  Teacher-friendly note: status controls the workflow (Paid → Shipped → Completed).
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  type="button"
                  class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                  @click="markNextStatus"
                  :disabled="!selected"
                >
                  Next Status
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                  @click="toastMsg('Saved ✅')"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type Status = "Paid" | "Pending" | "Shipped" | "Cancelled";

interface OrderRow {
  id: number;
  customer: string;
  email: string;
  date: string; // ISO
  total: number;
  status: Status;
}

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
      <p class="pt-1 text-lg font-black" :class="valueClass">{{ value }}</p>
    </div>
  `,
});

const DetailTile = defineComponent({
  name: "DetailTile",
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <p class="text-[11px] font-black text-slate-500 uppercase tracking-wide">{{ label }}</p>
      <p class="pt-1 text-sm font-black text-slate-900 break-words">{{ value }}</p>
    </div>
  `,
});

type SortKey = "date_desc" | "date_asc" | "total_desc" | "total_asc" | "id_desc" | "id_asc";

export default defineComponent({
  name: "Orders",
  components: { InfoTile, DetailTile },

  props: {
    globalSearch: { type: String, default: '' },
  },

  data() {
    return {
      toast: "" as string,

      q: "" as string,
      activeStatus: "all" as "all" | Status,
      page: 1 as number,
      pageSize: 8 as number,

      showSort: false as boolean,
      sortBy: "date_desc" as SortKey,

      showDetails: false as boolean,
      selected: null as OrderRow | null,

      orders: [] as OrderRow[],
    };
  },

  computed: {
    todayText(): string {
      const d = new Date();
      return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    },
    statusTabs(): Array<{ key: "all" | Status; label: string; count: number }> {
      const all = this.orders.length;
      const paid = this.orders.filter((o) => o.status === "Paid").length;
      const pending = this.orders.filter((o) => o.status === "Pending").length;
      const shipped = this.orders.filter((o) => o.status === "Shipped").length;
      const cancelled = this.orders.filter((o) => o.status === "Cancelled").length;

      return [
        { key: "all", label: "All", count: all },
        { key: "Paid", label: "Paid", count: paid },
        { key: "Pending", label: "Pending", count: pending },
        { key: "Shipped", label: "Shipped", count: shipped },
        { key: "Cancelled", label: "Cancelled", count: cancelled },
      ];
    },
    sortOptions(): Array<{ key: SortKey; label: string }> {
      return [
        { key: "date_desc", label: "Date: Newest first" },
        { key: "date_asc", label: "Date: Oldest first" },
        { key: "total_desc", label: "Total: High to low" },
        { key: "total_asc", label: "Total: Low to high" },
        { key: "id_desc", label: "Order ID: High to low" },
        { key: "id_asc", label: "Order ID: Low to high" },
      ];
    },
    sortLabel(): string {
      return this.sortOptions.find((s) => s.key === this.sortBy)?.label ?? "Date: Newest first";
    },

    filteredSorted(): OrderRow[] {
      const qq = this.q.toLowerCase().trim();

      let rows = [...this.orders];

      if (this.activeStatus !== "all") {
        rows = rows.filter((o) => o.status === this.activeStatus);
      }

      if (qq) {
        rows = rows.filter((o) => {
          const hay = `${o.id} ${o.customer} ${o.email} ${o.status}`.toLowerCase();
          return hay.includes(qq);
        });
      }

      const byDate = (a: OrderRow, b: OrderRow) => new Date(a.date).getTime() - new Date(b.date).getTime();
      const byTotal = (a: OrderRow, b: OrderRow) => a.total - b.total;
      const byId = (a: OrderRow, b: OrderRow) => a.id - b.id;

      switch (this.sortBy) {
        case "date_desc":
          rows.sort((a, b) => byDate(b, a));
          break;
        case "date_asc":
          rows.sort((a, b) => byDate(a, b));
          break;
        case "total_desc":
          rows.sort((a, b) => byTotal(b, a));
          break;
        case "total_asc":
          rows.sort((a, b) => byTotal(a, b));
          break;
        case "id_desc":
          rows.sort((a, b) => byId(b, a));
          break;
        case "id_asc":
          rows.sort((a, b) => byId(a, b));
          break;
      }

      return rows;
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.filteredSorted.length / this.pageSize));
    },

    paged(): OrderRow[] {
      const safePage = Math.min(this.page, this.totalPages);
      const start = (safePage - 1) * this.pageSize;
      return this.filteredSorted.slice(start, start + this.pageSize);
    },

    pageStart(): number {
      if (this.filteredSorted.length === 0) return 0;
      return (this.page - 1) * this.pageSize + 1;
    },
    pageEnd(): number {
      return Math.min(this.page * this.pageSize, this.filteredSorted.length);
    },

    stats(): { total: number; revenue: number; paid: number; pending: number } {
      const total = this.orders.length;
      const revenue = this.orders.reduce((s, o) => s + o.total, 0);
      const paid = this.orders.filter((o) => o.status === "Paid").length;
      const pending = this.orders.filter((o) => o.status === "Pending").length;
      return { total, revenue, paid, pending };
    },
  },

  mounted() {
    // mock data
    this.seedOrders();

    document.addEventListener("click", this.onOutsideClick, true);
    document.addEventListener("keydown", this.onKeydown, true);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.onOutsideClick, true);
    document.removeEventListener("keydown", this.onKeydown, true);
  },

  watch: {
    globalSearch(newVal: string) { this.q = newVal || ''; },
  },


  methods: {
    seedOrders() {
      const base = new Date();
      const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

      const customers = [
        ["Sok Dara", "sok.dara@mail.com"],
        ["Chan Sopheak", "chan.sopheak@mail.com"],
        ["Ly Samnang", "ly.samnang@mail.com"],
        ["Heng Ratha", "heng.ratha@mail.com"],
        ["Sreyneang Pov", "sreyneang.pov@mail.com"],
        ["Makara Chhin", "makara.chhin@mail.com"],
        ["Visal Noun", "visal.noun@mail.com"],
        ["Sokha Tep", "sokha.tep@mail.com"],
        ["Dalin Im", "dalin.im@mail.com"],
        ["Sophea Lim", "sophea.lim@mail.com"],
      ];

      const statuses: Status[] = ["Paid", "Pending", "Shipped", "Cancelled"];

      this.orders = Array.from({ length: 18 }).map((_, i) => {
        const c = customers[i % customers.length];
        const daysAgo = rnd(0, 24);
        const d = new Date(base);
        d.setDate(base.getDate() - daysAgo);

        return {
          id: 10400 + i + 1,
          customer: c[0],
          email: c[1],
          date: d.toISOString(),
          total: Math.round((Math.random() * 260 + 12) * 10) / 10,
          status: statuses[rnd(0, statuses.length - 1)],
        };
      });

      this.page = 1;
    },

    refreshMock() {
      // small “realistic” refresh: shuffle totals a bit, keep layout stable
      this.orders = this.orders.map((o) => {
        const bump = (Math.random() - 0.5) * 10;
        const next = Math.max(5, Math.round((o.total + bump) * 10) / 10);
        return { ...o, total: next };
      });
      this.toastMsg("Refreshed ✅");
    },

    addMockOrder() {
      const nextId = (this.orders[0]?.id ?? 10400) + 1;
      const statuses: Status[] = ["Paid", "Pending", "Shipped", "Cancelled"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const total = Math.round((Math.random() * 300 + 10) * 10) / 10;
      const now = new Date();

      this.orders.unshift({
        id: nextId,
        customer: "Mock Customer",
        email: "mock.customer@mail.com",
        date: now.toISOString(),
        total,
        status,
      });

      this.page = 1;
      this.toastMsg(`Added order #${nextId}`);
    },

    setSort(k: SortKey) {
      this.sortBy = k;
      this.showSort = false;
      this.page = 1;
      this.toastMsg("Sorted ✅");
    },

    openDetails(o: OrderRow) {
      this.selected = { ...o };
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
      this.selected = null;
    },

    markNextStatus() {
      if (!this.selected) return;

      const flow: Status[] = ["Pending", "Paid", "Shipped", "Cancelled"];
      const idx = flow.indexOf(this.selected.status);
      const next = flow[(idx + 1) % flow.length];
      this.selected.status = next;

      // commit back to list
      this.orders = this.orders.map((o) => (o.id === this.selected!.id ? { ...o, status: next } : o));
      this.toastMsg(`Status → ${next}`);
    },

    exportCSV() {
      // export *current filtered/sorted* list (teacher-friendly)
      const rows = this.filteredSorted;
      const header = ["id", "customer", "email", "date", "total", "status"];

      const escape = (v: any) => {
        const s = String(v ?? "");
        // CSV escaping
        if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
        return s;
      };

      const csv = [
        header.join(","),
        ...rows.map((o) => [o.id, o.customer, o.email, this.formatDate(o.date), o.total, o.status].map(escape).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();

      URL.revokeObjectURL(url);
      this.toastMsg("CSV downloaded ✅");
    },

    onOutsideClick(e: MouseEvent) {
      const sortWrap = this.$refs.sortRef as HTMLElement | undefined;
      const target = e.target as Node | null;
      if (this.showSort && sortWrap && target && !sortWrap.contains(target)) this.showSort = false;
    },

    onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        this.showSort = false;
        if (this.showDetails) this.closeDetails();
      }
    },

    statusPill(status: Status) {
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

    formatDate(iso: string): string {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
    },

    initials(name: string): string {
      const parts = name.trim().split(/\s+/).slice(0, 2);
      return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
    },

    toastMsg(msg: string) {
      this.toast = msg;
      window.clearTimeout((this as any)._t);
      (this as any)._t = window.setTimeout(() => (this.toast = ""), 1500);
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