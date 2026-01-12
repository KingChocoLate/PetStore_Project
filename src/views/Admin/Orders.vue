<template>
  <div class="w-full flex flex-col">
    <AdminNavigation title="Orders" name="John Doe"/>
    <div class="w-full p-6 space-y-6">
      <OrdersSummary />
      <OrdersTable />
    </div>
  </div>
</template>

<script lang="ts">
  import AdminNavigation from '@/components/Admin/AdminNavigation.vue';
  import OrdersSummary from '../../components/Admin/Orders/OrdersSummary.vue'
  import OrdersTable from '../../components/Admin/Orders/OrdersTable.vue'
  export default {
    name: 'Orders',
    components: {
      OrdersSummary,
      OrdersTable,
      AdminNavigation
    }
  }
</script>
