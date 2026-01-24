<template>
  <aside class="w-full h-full bg-white flex flex-col">
    <div class="px-8 pt-10 pb-8">
      <img
        src="../../assets/project_logo.svg"
        alt="PetStore+"
        class="h-10 w-auto object-contain select-none mb-6"
      />
      <p class="text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-1">
        Management
      </p>
    </div>

    <nav class="flex-1 px-4 overflow-y-auto space-y-1">
      <RouterLink to="/admin/dashboard" custom v-slot="{ href, navigate, isActive }">
        <a :href="href" @click="navigate" class="nav-item" :class="{ 'active': isActive }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Dashboard
        </a>
      </RouterLink>

      <RouterLink to="/admin/products" custom v-slot="{ href, navigate, isActive }">
        <a :href="href" @click="navigate" class="nav-item" :class="{ 'active': isActive }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          Products
        </a>
      </RouterLink>

      <RouterLink to="/admin/orders" custom v-slot="{ href, navigate, isActive }">
        <a :href="href" @click="navigate" class="nav-item" :class="{ 'active': isActive }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Orders
        </a>
      </RouterLink>

      <RouterLink to="/admin/customers" custom v-slot="{ href, navigate, isActive }">
        <a :href="href" @click="navigate" class="nav-item" :class="{ 'active': isActive }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Customers
        </a>
      </RouterLink>

      <RouterLink to="/admin/promotions" custom v-slot="{ href, navigate, isActive }">
        <a :href="href" @click="navigate" class="nav-item" :class="{ 'active': isActive }">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
          Promotions
        </a>
      </RouterLink>
    </nav>

    <div class="p-6 border-t border-slate-100">
      <div class="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <p class="text-xs font-semibold text-slate-500">System Online</p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "SideBar" });
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.nav-item:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.nav-item.active {
  background-color: #0f172a;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}
</style>
