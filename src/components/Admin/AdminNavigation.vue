<template>
  <header class="w-full h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6">
    <!-- LEFT -->
    <div class="min-w-0">
      <p class="text-[11px] font-semibold tracking-wide uppercase text-slate-400">
        Admin
      </p>
      <h1 class="font-poppins-semiBold text-[20px] text-slate-900 truncate">
        {{ title }}
      </h1>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-3">
      <!-- Search box -->
      <div class="hidden md:flex items-center gap-2 h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 w-[260px]">
        <img src="../../assets/search.svg" alt="Search" class="w-4 h-4 opacity-70" />
        <input
          v-model="query"
          type="text"
          placeholder="Search orders, products..."
          class="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <!-- Search icon (mobile) -->
      <button
        type="button"
        class="md:hidden h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center"
        aria-label="Search"
        title="Search"
      >
        <img src="../../assets/search.svg" alt="Search" class="w-5 h-5" />
      </button>

      <!-- Notifications -->
      <button
        type="button"
        class="relative h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center"
        aria-label="Notifications"
        title="Notifications"
      >
        <img src="../../assets/Admin_icons/NavBar/notifications.svg" alt="Notifications" class="w-5 h-5" />

        <!-- RED badge -->
        <span
          class="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-red-500 border border-white text-[11px] font-bold text-white flex items-center justify-center"
        >
          3
        </span>
      </button>

      <!-- Profile dropdown -->
      <div class="relative">
        <button
          type="button"
          @click="toggleMenu"
          class="h-10 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition flex items-center gap-3 px-3"
          aria-label="User menu"
        >
          <div class="h-8 w-8 rounded-xl bg-[#CBDAAF] flex items-center justify-center font-bold text-slate-900">
            {{ initials }}
          </div>

          <div class="hidden sm:block text-left leading-tight">
            <p class="font-poppins-medium text-[13px] text-slate-900 truncate max-w-[130px]">
              {{ name }}
            </p>
            <p class="font-poppins-regular text-[11px] text-slate-500">Admin</p>
          </div>
        </button>

        <!-- Menu -->
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-[220px] rounded-2xl bg-white border border-slate-200 shadow-lg overflow-hidden z-50"
        >
          <div class="px-4 py-3 border-b border-slate-200">
            <p class="text-sm font-semibold text-slate-900 truncate">{{ name }}</p>
            <p class="text-xs text-slate-500">Admin</p>
          </div>

          <button
            type="button"
            class="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Profile
          </button>

          <button
            type="button"
            class="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Settings
          </button>

          <div class="border-t border-slate-200">
            <button
              type="button"
              class="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "AdminNavigation",
  props: {
    title: { type: String, required: true },
    name: { type: String, required: true },
  },

  emits: ["search-change"],
  
  data() {
    return {
      query: "",
      menuOpen: false,
    };
  },

  watch: {
    query(newVal: string) {
      this.$emit("search-change", newVal);
    },
  },

  computed: {
    initials(): string {
      const parts = (this.name || "Admin").trim().split(/\s+/);
      const first = parts[0]?.[0] || "A";
      const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
      return (first + last).toUpperCase();
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  mounted() {
    // close dropdown on outside click
    document.addEventListener("click", (e: any) => {
      const root = this.$el as HTMLElement;
      if (!root.contains(e.target)) this.menuOpen = false;
    });
  },
};
</script>