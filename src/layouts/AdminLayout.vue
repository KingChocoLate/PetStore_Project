<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <div class="flex w-full h-screen overflow-hidden">
      <div class="w-[260px] shrink-0 border-r border-slate-200 bg-white z-20">
        <SideBar class="w-full h-full" />
      </div>

      <div class="flex-1 min-w-0 h-full flex flex-col relative">
        <AdminNavigation
          :title="pageTitle"
          :name="userName"
          @search-change="searchText = $event"
        />

        <div class="flex-1 min-w-0 overflow-y-auto p-6 scroll-smooth">
          <div class="max-w-7xl mx-auto w-full">
            <RouterView v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" :globalSearch="searchText" />
              </transition>
            </RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // 👈 Import Store
import SideBar from "@/components/Admin/SideBar.vue";
import AdminNavigation from "@/components/Admin/AdminNavigation.vue";

export default defineComponent({
  name: "AdminLayout",
  components: { SideBar, AdminNavigation },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore(); // 👈 Use Store
    const searchText = ref("");

    // 1. Get Real Name
    const userName = computed(() => {
      const u = authStore.user;
      if (!u) return "Admin";
      return `${u.firstName} ${u.lastName}`;
    });

    // 2. Dynamic Title
    const pageTitle = computed(() => {
      const path = route.path;
      if (path.includes("dashboard")) return "Dashboard";
      if (path.includes("products")) return "Inventory";
      if (path.includes("orders")) return "Orders";
      if (path.includes("customers")) return "Customers";
      if (path.includes("promotions")) return "Promotions";
      return "Admin";
    });

    return { searchText, userName, pageTitle };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
