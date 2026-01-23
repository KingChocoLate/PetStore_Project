<template>
  <div class="min-h-screen bg-white">
    <div class="flex w-full h-screen">
      <!-- Sidebar -->
      <div class="w-[250px] shrink-0 border-r border-slate-200">
        <SideBar class="w-full h-full" />
      </div>

      <!-- Right side -->
      <div class="flex-1 min-w-0 h-full flex flex-col">
        <!-- Top navbar -->
        <AdminNavigation
          :title="pageTitle"
          name="John Doe"
          @search-change="searchText = $event"
        />

        <!-- Page content -->
        <div class="flex-1 min-w-0 overflow-y-auto">
          <RouterView v-slot="{ Component }">
            <component :is="Component" :globalSearch="searchText" />
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/Admin/SideBar.vue";
import AdminNavigation from "@/components/Admin/AdminNavigation.vue";

export default {
  name: "AdminLayout",
  components: { SideBar, AdminNavigation },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    pageTitle(): string {
      // Use current route to show title automatically
      const path = this.$route.path;
      if (path.includes("dashboard")) return "Dashboard";
      if (path.includes("products")) return "Products";
      if (path.includes("orders")) return "Orders";
      if (path.includes("customers")) return "Customers";
      if (path.includes("promotions")) return "Promotions";
      return "Admin";
    },
  },
  watch: {
    // Reset search when route changes (so you don't carry old search to new page)
    "$route.path"() {
      this.searchText = "";
    },
  },
};
</script>