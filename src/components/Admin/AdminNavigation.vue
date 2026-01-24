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

      <button class="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>

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

    const initials = computed(() => {
      const parts = (props.name || "A").split(" ");
      return parts[0][0] + (parts.length > 1 ? parts[1][0] : "");
    });

    const toggleMenu = () => { menuOpen.value = !menuOpen.value; };

    const handleLogout = () => {
      authStore.logout();
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      router.push('/login');
    };

    // Close on click outside
    const closeMenu = (e: MouseEvent) => {
      // Logic would go here if using a real click-outside directive
      // For simplicity, we just toggle for now
    };

    return { query, menuOpen, initials, toggleMenu, handleLogout };
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
