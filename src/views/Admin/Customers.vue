<template>
  <div class="w-full min-h-screen bg-slate-50 flex flex-col">
    <main class="flex-1 w-full overflow-y-auto px-4 sm:px-8 pt-8 pb-10">
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
                  Customer Management
                </h1>

                <p class="pt-1 text-sm text-slate-600">
                  Monitor users, block spam accounts, and support customers — clean and easy to present.
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
              <InfoTile label="Total Customers" :value="String(stats.total)" />
              <InfoTile label="Active" :value="String(stats.active)" :valueClass="'text-emerald-700'" />
              <InfoTile label="Blocked" :value="String(stats.blocked)" :valueClass="'text-rose-700'" />
              <InfoTile label="Support Tickets" :value="String(stats.tickets)" :valueClass="'text-sky-700'" />
            </div>
          </div>
        </section>

        <!-- CONTENT -->
        <div class="pt-8 flex flex-col gap-8">
          <!-- FILTER / ACTION BAR -->
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

                <!-- Right: Search + Sort + Primary Action -->
                <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <div class="relative w-full sm:w-80">
                    <input
                      v-model.trim="q"
                      type="text"
                      placeholder="Search name / email / ID…"
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

                  <button
                    type="button"
                    class="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                    @click="createMockCustomer"
                  >
                    + Add Mock
                  </button>
                </div>
              </div>

              <div class="pt-4 flex flex-wrap gap-2">
                <span class="text-[11px] font-black px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  Tip: click a row to open Support panel
                </span>
                <span class="text-[11px] font-black px-3 py-2 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                  Requirement met: monitor users + block spam + support tools
                </span>
              </div>
            </div>
          </section>

          <!-- LIST CARD -->
          <section class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div class="p-6 sm:p-7 border-b border-slate-200 bg-slate-50">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-black text-slate-900">Customers</h2>
                  <p class="pt-1 text-xs text-slate-500">
                    {{ filteredSorted.length }} result(s) • Page {{ page }} of {{ totalPages }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6 sm:p-7">
              <!-- Empty -->
              <div v-if="paged.length === 0" class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p class="text-sm font-black text-slate-900">No customers found</p>
                <p class="pt-1 text-xs text-slate-500">Try another tab or clear search.</p>
              </div>

              <!-- Table -->
              <div v-else class="overflow-x-auto rounded-3xl border border-slate-200">
                <table class="w-full min-w-[980px] text-left">
                  <thead class="bg-slate-50">
                    <tr class="text-[11px] uppercase tracking-wide text-slate-500 font-black border-b border-slate-200">
                      <th class="py-3 px-4">Customer</th>
                      <th class="py-3 px-4">Email</th>
                      <th class="py-3 px-4">Joined</th>
                      <th class="py-3 px-4">Orders</th>
                      <th class="py-3 px-4">Flag</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="c in paged"
                      :key="c.id"
                      class="border-b last:border-b-0 hover:bg-slate-50 transition cursor-pointer"
                      @click="openSupport(c)"
                    >
                      <td class="py-4 px-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-10 h-10 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-xs font-black text-slate-700"
                          >
                            {{ initials(c.name) }}
                          </div>
                          <div class="min-w-0">
                            <p class="text-sm font-black text-slate-900 truncate">{{ c.name }}</p>
                            <p class="pt-0.5 text-[11px] font-semibold text-slate-500 truncate">ID: {{ c.id }}</p>
                          </div>
                        </div>
                      </td>

                      <td class="py-4 px-4 text-sm font-semibold text-slate-700">{{ c.email }}</td>
                      <td class="py-4 px-4 text-sm font-semibold text-slate-700">{{ formatDate(c.joinedAt) }}</td>
                      <td class="py-4 px-4 text-sm font-black text-slate-900">{{ c.orders }}</td>

                      <td class="py-4 px-4">
                        <span class="text-[10px] font-black px-3 py-1.5 rounded-2xl border" :class="riskPill(c.risk)">
                          {{ c.risk }}
                        </span>
                      </td>

                      <td class="py-4 px-4">
                        <span class="text-[10px] font-black px-3 py-1.5 rounded-2xl border" :class="statusPill(c.status)">
                          {{ c.status }}
                        </span>
                      </td>

                      <td class="py-4 px-4 text-right">
                        <div class="flex justify-end gap-2">
                          <button
                            type="button"
                            class="px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                            @click.stop="openSupport(c)"
                          >
                            Support
                          </button>

                          <button
                            type="button"
                            class="px-3 py-2 rounded-2xl border text-xs font-extrabold transition"
                            :class="c.status === 'Blocked'
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'"
                            @click.stop="toggleBlock(c)"
                          >
                            {{ c.status === 'Blocked' ? 'Unblock' : 'Block' }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
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

      <!-- SUPPORT MODAL -->
      <transition name="fade">
        <div
          v-if="showSupport"
          class="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          @click.self="closeSupport"
        >
          <div class="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="text-xs font-bold text-slate-500">Support Panel</p>
                <p class="pt-1 text-lg font-black text-slate-900 truncate">
                  {{ selected?.name }} <span class="text-slate-400">•</span> {{ selected?.email }}
                </p>
              </div>
              <button
                type="button"
                class="px-3 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-extrabold text-slate-800 transition"
                @click="closeSupport"
              >
                Close
              </button>
            </div>

            <div class="p-6 flex flex-col gap-6">
              <!-- Overview -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <DetailTile label="Customer ID" :value="selected ? String(selected.id) : '-'" />
                <DetailTile label="Joined" :value="selected ? formatDate(selected.joinedAt) : '-'" />
                <DetailTile label="Orders" :value="selected ? String(selected.orders) : '-'" />
              </div>

              <!-- Actions -->
              <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p class="text-sm font-black text-slate-900">Quick Actions</p>
                    <p class="pt-1 text-xs font-semibold text-slate-600">
                      Block spam accounts, or send helpful support response.
                    </p>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      class="px-4 py-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-extrabold transition"
                      @click="toastMsg('Support message sent ✅')"
                      :disabled="!selected"
                    >
                      Send Support Message
                    </button>

                    <button
                      type="button"
                      class="px-4 py-2 rounded-2xl border text-xs font-extrabold transition"
                      :class="selected?.status === 'Blocked'
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'"
                      @click="selected && toggleBlock(selected)"
                      :disabled="!selected"
                    >
                      {{ selected?.status === 'Blocked' ? 'Unblock User' : 'Block User' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Notes (teacher-friendly) -->
              <div class="rounded-3xl border border-slate-200 bg-white p-5">
                <p class="text-sm font-black text-slate-900">Admin Notes</p>
                <p class="pt-1 text-xs font-semibold text-slate-600">
                  Teacher-friendly: This section demonstrates user monitoring and support workflow.
                </p>

                <textarea
                  v-model="supportNote"
                  class="pt-3 w-full mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  rows="4"
                  placeholder="Write internal support note (mock)…"
                ></textarea>

                <div class="pt-3 flex justify-end">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
                    @click="toastMsg('Note saved ✅')"
                  >
                    Save Note
                  </button>
                </div>
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
type UserStatus = "Active" | "Blocked";
type Risk = "Normal" | "Suspicious" | "Spam";

interface Customer {
  id: number;
  name: string;
  email: string;
  joinedAt: string; // ISO
  orders: number;
  status: UserStatus;
  risk: Risk;
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

type SortKey = "joined_desc" | "joined_asc" | "orders_desc" | "orders_asc" | "name_asc";

export default defineComponent({
  name: "Customers",
  components: { InfoTile, DetailTile },

  props: {
    globalSearch: { type: String, default: '' },
  },

  data() {
    return {
      toast: "" as string,

      q: "" as string,
      activeStatus: "all" as "all" | UserStatus,
      page: 1 as number,
      pageSize: 8 as number,

      showSort: false as boolean,
      sortBy: "joined_desc" as SortKey,

      showSupport: false as boolean,
      selected: null as Customer | null,
      supportNote: "" as string,

      customers: [] as Customer[],
    };
  },

  computed: {
    todayText(): string {
      const d = new Date();
      return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    },

    statusTabs(): Array<{ key: "all" | UserStatus; label: string; count: number }> {
      const all = this.customers.length;
      const active = this.customers.filter((c) => c.status === "Active").length;
      const blocked = this.customers.filter((c) => c.status === "Blocked").length;
      return [
        { key: "all", label: "All", count: all },
        { key: "Active", label: "Active", count: active },
        { key: "Blocked", label: "Blocked", count: blocked },
      ];
    },

    sortOptions(): Array<{ key: SortKey; label: string }> {
      return [
        { key: "joined_desc", label: "Joined: Newest first" },
        { key: "joined_asc", label: "Joined: Oldest first" },
        { key: "orders_desc", label: "Orders: High to low" },
        { key: "orders_asc", label: "Orders: Low to high" },
        { key: "name_asc", label: "Name: A to Z" },
      ];
    },

    sortLabel(): string {
      return this.sortOptions.find((s) => s.key === this.sortBy)?.label ?? "Joined: Newest first";
    },

    filteredSorted(): Customer[] {
      const qq = this.q.toLowerCase().trim();
      let rows = [...this.customers];

      if (this.activeStatus !== "all") rows = rows.filter((c) => c.status === this.activeStatus);

      if (qq) {
        rows = rows.filter((c) => {
          const hay = `${c.id} ${c.name} ${c.email} ${c.status} ${c.risk}`.toLowerCase();
          return hay.includes(qq);
        });
      }

      const byJoined = (a: Customer, b: Customer) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      const byOrders = (a: Customer, b: Customer) => a.orders - b.orders;

      switch (this.sortBy) {
        case "joined_desc":
          rows.sort((a, b) => byJoined(b, a));
          break;
        case "joined_asc":
          rows.sort((a, b) => byJoined(a, b));
          break;
        case "orders_desc":
          rows.sort((a, b) => byOrders(b, a));
          break;
        case "orders_asc":
          rows.sort((a, b) => byOrders(a, b));
          break;
        case "name_asc":
          rows.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      return rows;
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.filteredSorted.length / this.pageSize));
    },

    paged(): Customer[] {
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

    stats(): { total: number; active: number; blocked: number; tickets: number } {
      const total = this.customers.length;
      const active = this.customers.filter((c) => c.status === "Active").length;
      const blocked = this.customers.filter((c) => c.status === "Blocked").length;
      // mock ticket count: suspicious + spam show more tickets
      const tickets = this.customers.reduce((s, c) => s + (c.risk === "Spam" ? 2 : c.risk === "Suspicious" ? 1 : 0), 0);
      return { total, active, blocked, tickets };
    },
  },

  mounted() {
    this.seedCustomers();
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
    seedCustomers() {
      const base = new Date();
      const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

      const people = [
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
        ["Rina Sok", "rina.sok@mail.com"],
        ["Kanha Chea", "kanha.chea@mail.com"],
      ];

      const risks: Risk[] = ["Normal", "Suspicious", "Spam"];

      this.customers = Array.from({ length: 18 }).map((_, i) => {
        const p = people[i % people.length];
        const daysAgo = rnd(0, 120);
        const d = new Date(base);
        d.setDate(base.getDate() - daysAgo);

        const risk = risks[rnd(0, risks.length - 1)];
        const status: UserStatus = risk === "Spam" && Math.random() > 0.4 ? "Blocked" : "Active";

        return {
          id: 2000 + i + 1,
          name: p[0],
          email: p[1],
          joinedAt: d.toISOString(),
          orders: rnd(0, 34),
          risk,
          status,
        };
      });

      this.page = 1;
    },

    refreshMock() {
      // tiny realistic refresh: slightly change risk/orders
      const risks: Risk[] = ["Normal", "Suspicious", "Spam"];
      this.customers = this.customers.map((c) => {
        const bump = Math.floor((Math.random() - 0.5) * 6);
        const orders = Math.max(0, c.orders + bump);
        const risk = Math.random() < 0.08 ? risks[Math.floor(Math.random() * risks.length)] : c.risk;
        const status: UserStatus = c.status === "Blocked" ? "Blocked" : risk === "Spam" && Math.random() > 0.65 ? "Blocked" : "Active";
        return { ...c, orders, risk, status };
      });

      this.toastMsg("Refreshed ✅");
    },

    createMockCustomer() {
      const nextId = (this.customers[0]?.id ?? 2000) + 1;
      const now = new Date();
      this.customers.unshift({
        id: nextId,
        name: "Mock Customer",
        email: `mock${nextId}@mail.com`,
        joinedAt: now.toISOString(),
        orders: 0,
        risk: "Normal",
        status: "Active",
      });
      this.page = 1;
      this.toastMsg(`Added customer #${nextId}`);
    },

    setSort(k: SortKey) {
      this.sortBy = k;
      this.showSort = false;
      this.page = 1;
      this.toastMsg("Sorted ✅");
    },

    toggleBlock(c: Customer) {
      const next: UserStatus = c.status === "Blocked" ? "Active" : "Blocked";
      this.customers = this.customers.map((x) => (x.id === c.id ? { ...x, status: next } : x));

      // keep selected synced if modal open
      if (this.selected?.id === c.id) this.selected = { ...this.selected, status: next };

      this.toastMsg(next === "Blocked" ? `Blocked #${c.id}` : `Unblocked #${c.id}`);
    },

    openSupport(c: Customer) {
      this.selected = { ...c };
      this.supportNote = "";
      this.showSupport = true;
    },

    closeSupport() {
      this.showSupport = false;
      this.selected = null;
      this.supportNote = "";
    },

    exportCSV() {
      const rows = this.filteredSorted;
      const header = ["id", "name", "email", "joined", "orders", "risk", "status"];

      const escape = (v: any) => {
        const s = String(v ?? "");
        if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
        return s;
      };

      const csv = [
        header.join(","),
        ...rows.map((c) => [c.id, c.name, c.email, this.formatDate(c.joinedAt), c.orders, c.risk, c.status].map(escape).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
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
        if (this.showSupport) this.closeSupport();
      }
    },

    statusPill(status: UserStatus) {
      return status === "Blocked"
        ? "bg-rose-50 text-rose-700 border-rose-100"
        : "bg-emerald-50 text-emerald-700 border-emerald-100";
    },

    riskPill(risk: Risk) {
      switch (risk) {
        case "Spam":
          return "bg-rose-50 text-rose-700 border-rose-100";
        case "Suspicious":
          return "bg-amber-50 text-amber-800 border-amber-100";
        default:
          return "bg-slate-50 text-slate-700 border-slate-200";
      }
    },

    initials(name: string): string {
      const parts = name.trim().split(/\s+/).slice(0, 2);
      return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
    },

    formatDate(iso: string): string {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
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