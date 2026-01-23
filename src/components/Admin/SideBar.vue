<template>
  <aside class="w-full h-full bg-white flex flex-col border-r border-slate-200">
    <!-- Logo -->
    <div class="px-6 pt-8 pb-5">
      <img
        src="../../assets/project_logo.svg"
        alt="PetStore Logo"
        class="w-[153px] h-[44px] object-contain select-none"
      />

      <!-- Small label to feel like a system (subtle) -->
      <p class="pt-4 text-[11px] font-semibold tracking-wide uppercase text-slate-400">
        Admin Menu
      </p>
    </div>

    <!-- Nav -->
    <nav class="px-4 pb-6 overflow-y-auto">
      <div class="flex flex-col gap-1.5">
        <!-- Dashboard -->
        <RouterLink to="/admin/dashboard" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 px-4 h-[46px] rounded-xl transition-all duration-200 font-poppins font-semibold text-sm outline-none"
            :class="isActive
              ? 'bg-[#CBDAAF] text-slate-900 shadow-sm ring-1 ring-[#BFD3A0]'
              : 'text-slate-800 hover:bg-slate-50'"
          >
            <div class="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
              <img
                src="../../assets/Admin_icons/SideBar/dashboard.svg"
                alt="Dashboard"
                class="w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span>Dashboard</span>
          </a>
        </RouterLink>

        <!-- Products -->
        <RouterLink to="/admin/products" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 px-4 h-[46px] rounded-xl transition-all duration-200 font-poppins font-semibold text-sm outline-none"
            :class="isActive
              ? 'bg-[#CBDAAF] text-slate-900 shadow-sm ring-1 ring-[#BFD3A0]'
              : 'text-slate-800 hover:bg-slate-50'"
          >
            <div class="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
              <img
                src="../../assets/Admin_icons/SideBar/products.svg"
                alt="Products"
                class="w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span>Products</span>
          </a>
        </RouterLink>

        <!-- Orders -->
        <RouterLink to="/admin/orders" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 px-4 h-[46px] rounded-xl transition-all duration-200 font-poppins font-semibold text-sm outline-none"
            :class="isActive
              ? 'bg-[#CBDAAF] text-slate-900 shadow-sm ring-1 ring-[#BFD3A0]'
              : 'text-slate-800 hover:bg-slate-50'"
          >
            <div class="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
              <img
                src="../../assets/Admin_icons/SideBar/orders.svg"
                alt="Orders"
                class="w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span>Orders</span>
          </a>
        </RouterLink>

        <!-- Customers -->
        <RouterLink to="/admin/customers" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 px-4 h-[46px] rounded-xl transition-all duration-200 font-poppins font-semibold text-sm outline-none"
            :class="isActive
              ? 'bg-[#CBDAAF] text-slate-900 shadow-sm ring-1 ring-[#BFD3A0]'
              : 'text-slate-800 hover:bg-slate-50'"
          >
            <div class="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
              <img
                src="../../assets/Admin_icons/SideBar/customers.svg"
                alt="Customers"
                class="w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span>Customers</span>
          </a>
        </RouterLink>

        <!-- Promotions -->
        <RouterLink to="/admin/promotions" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 px-4 h-[46px] rounded-xl transition-all duration-200 font-poppins font-semibold text-sm outline-none"
            :class="isActive
              ? 'bg-[#CBDAAF] text-slate-900 shadow-sm ring-1 ring-[#BFD3A0]'
              : 'text-slate-800 hover:bg-slate-50'"
          >
            <div class="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
              <img
                src="../../assets/Admin_icons/SideBar/promotions.svg"
                alt="Promotions"
                class="w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span>Promotions</span>
          </a>
        </RouterLink>
      </div>
    </nav>

    <!-- Optional footer hook (kept, but pushed to bottom neatly) -->
    <div id="sidebar-footer-content" class="mt-auto w-full px-6 pb-6 flex flex-col gap-2"></div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({ name: "SideBar" });
</script>
