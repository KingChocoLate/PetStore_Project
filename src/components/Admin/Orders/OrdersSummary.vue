<template>
  <div class="w-full border border-green-400 rounded-lg p-6 bg-white">

    <div class="flex justify-between items-start mb-[58px]">
      <div>
        <h2 class="font-poppins-medium text-[22px] text-black">
          Total order
        </h2>

        <p class="font-poppins-regular text-black text-[14px] mt-2">
          Last Updated:
          <span class="font-poppins-medium">2 min ago</span>
        </p>
      </div>

      <div class="flex flex-col items-end space-y-4">
        <div class="flex space-x-2">
          <button
            v-for="range in ranges"
            :key="range"
            class="px-4 py-1 rounded-full text-sm font-poppins-medium"
            :class="range === 'Monthly'
              ? 'bg-[#CBDAAF] text-green-800'
              : 'bg-gray-100 text-gray-600'"
          >
            {{ range }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-between mb-[50px]">
      <button class="px-4 py-2 bg-gray-100 rounded-md font-poppins-regular text-[15px] text-black">
          Refunds
      </button>

      <button class="px-4 py-2 bg-gray-100 rounded-md font-poppins-regular text-[15px] text-black">
        Failed Transactions
      </button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-7 gap-6 text-center">
      <div v-for="item in stats" :key="item.label">
        <p class="text-[16px] text-black font-poppins-medium">
          {{ item.label }}
        </p>
        <p class="font-poppins-regular text-black">
          0
        </p>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'OrdersSummary',
  data() {
    return {
      ranges: ['Daily', 'Monthly', 'Yearly'],
      stats: [
        { label: 'Today Order' },
        { label: 'Revenue' },
        { label: 'Pending' },
        { label: 'Cancelled' },
        { label: 'Completed' },
        { label: 'Shipped' },
        { label: 'Paid' }
      ]
    }
  }
}
</script>
