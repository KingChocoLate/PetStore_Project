<template>
  <div class="bg-white rounded-lg">
    <table class="w-full border-separate border-spacing-y-3">
      <thead>
        <tr class="text-left font-poppins-medium text-[15px] text-black">
          <th class="px-4">No.</th>
          <th>Customer</th>
          <th>Order ID</th>
          <th>Order Date</th>
          <th>Total</th>
          <th>Status</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="index"
          class=" bg-white text-black font-poppins-regular text-[14px]"
        >
          <td class="px-4 py-3 border-l-2 border-y-2 rounded-l-md border-[#008C00]">{{ index + 1 }}</td>
          <td class="border-y-2 border-[#008C00]">{{ order.customer }}</td>
          <td class="border-y-2 border-[#008C00]">{{ order.id }}</td>
          <td class="border-y-2 border-[#008C00]">{{ order.date }}</td>
          <td class="border-y-2 border-[#008C00]">{{ order.total }}</td>
          <td class="text-green-600 font-medium border-y-2 border-[#008C00]">{{ order.status }}</td>
          <td class="text-center border-y-2 border-r-2 rounded-r-md border-[#008C00]">
            <button class="text-xl">›</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-6">
      <span class="px-3 py-1 bg-[#CBDAAF] rounded-md text-sm font-poppins-medium text-black">1</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-400 text-sm">1</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OrdersTable',
  data() {
    return {
      orders: [
        {
          customer: 'Sophat Odom',
          id: '#000001',
          date: '12/12/2025',
          total: '$50.99',
          status: 'Shipping'
        },
        {
          customer: 'Sophat Odom',
          id: '#000002',
          date: '13/12/2025',
          total: '$20.99',
          status: 'Shipping'
        }
      ]
    }
  }
}
</script>
