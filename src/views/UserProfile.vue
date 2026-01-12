<template>
  <div class="mx-auto px-16 py-12 font-poppins">
    <header class="mb-12 pb-6">
      <h1 class="text-[48px] font-bold text-black leading-tight">
        Welcome, {{ welcomeName }}
      </h1>
      <p class="text-[#A1A1A1] text-[20px] mt-2">Mon, 17 Nov 2025</p>
    </header>

    <div class="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-lg p-12 mb-4 w-full border border-gray-50">
      <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_450px] gap-24">

        <!-- Profile Section -->
        <section class="px-12">
          <h2 class="text-[#008C00] text-[19px] font-semibold mb-8 pb-4">
            Edit Your Profile
          </h2>

          <div class="space-y-6">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-8">
              <div class="flex flex-col gap-2 pb-5">
                <label class="text-[15px] font-medium text-black">First Name</label>
                <input
                  type="text"
                  v-model="formData.firstName"
                  placeholder="Odom"
                  @focus="selectAll"
                  class="bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none 
                         focus:ring-0 focus:border-gray-200 transition"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[15px] font-medium text-black">Last Name</label>
                <input
                  type="text"
                  v-model="formData.lastName"
                  placeholder="Sophat"
                  @focus="selectAll"
                  class="bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none 
                         focus:ring-0 focus:border-gray-200 transition"
                />
              </div>
            </div>

            <!-- Email & Address -->
            <div class="grid grid-cols-2 gap-8">
              <div class="flex flex-col gap-2">
                <label class="text-[15px] font-medium text-black">Email</label>
                <input
                  type="email"
                  v-model="formData.email"
                  placeholder="youngtrader@gmail.com"
                  @focus="selectAll"
                  class="bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none 
                         focus:ring-0 focus:border-gray-200 transition"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[15px] font-medium text-black">Address</label>
                <input
                  type="text"
                  v-model="formData.address"
                  placeholder="Kampong Kdei, New Zealand"
                  @focus="selectAll"
                  class="bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none 
                         focus:ring-0 focus:border-gray-200 transition"
                />
              </div>
            </div>

            <!-- Password Section -->
            <div class="pt-4 space-y-4">
              <label class="text-[15px] font-medium text-black block">
                Password Changes
              </label>
              <div class="flex flex-col gap-y-3 pt-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  class="w-full bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none placeholder:text-[#808080]"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  class="w-full bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none placeholder:text-[#808080]"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  class="w-full bg-[#F3F3F3] p-4 rounded-sm text-[#808080] outline-none placeholder:text-[#808080]"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Aside Section -->
        <aside class="flex flex-col">
          <div class="mb-10">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 class="text-[32px] font-bold text-black">Account Activity</h3>
            </div>

            <div class="text-[20px] text-black space-y-1 mb-8">
              <p class="pt-3"><span class="font-medium">Total Orders:</span> 15</p>
              <p class="pb-7"><span class="font-medium">Loyalty Points:</span> 368</p>
            </div>

            <div class="flex gap-4">
              <button class="bg-[#009900] text-white px-6 py-3 rounded-md font-medium text-[17px] hover:brightness-90 transition flex-1">
                View Order History
              </button>
              <button class="bg-[#009900] text-white px-6 py-3 rounded-md font-medium text-[17px] hover:brightness-90 transition flex-1">
                View Wishlist (5)
              </button>
            </div>
          </div>

          <div class="mt-4">
            <div class="flex items-center gap-3 mb-6 py-8">
              <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 class="text-[32px] font-bold text-black">Account Management</h3>
            </div>

            <ul class="space-y-3 text-[18px] font-medium text-[#4A90E2]">
              <li><a href="#" class="hover:underline">Need Help? FAQ & Support</a></li>
              <li><a href="#" class="hover:underline">Manage Email Preference</a></li>
              <li><a href="#" class="hover:underline text-red-500">Delete Account</a></li>
            </ul>
          </div>

          <div class="flex justify-end items-center gap-8 mt-auto py-10">
            <button
              @click="cancelChanges"
              class="text-[16px] font-medium text-black hover:underline"
            >
              Cancel
            </button>
            <button
              @click="saveChanges"
              class="bg-[#009900] text-white px-10 py-3 rounded-md font-semibold text-[16px] hover:brightness-90 transition"
            >
              Save Changes
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfile',

  data() {
    return {
      formData: {
        firstName: 'Odom',
        lastName: 'Sophat',
        email: 'dom.gmail.com',
        address: 'Phnom Penh, Cambodia'
      },
      // Last saved state (used for Cancel)
      savedData: {
        firstName: 'Odom',
        lastName: 'Sophat',
        email: 'dom.gmail.com',
        address: 'Phnom Penh, Cambodia'
      }
    }
  },

  computed: {
    welcomeName(): string {
      return this.savedData.firstName
    }
  },

  methods: {
    selectAll(event: FocusEvent) {
      const input = event.target as HTMLInputElement
      input.select()
    },

    saveChanges() {
      this.savedData = { ...this.formData }
      console.log('Changes Saved:', this.savedData)
      alert('Profile Updated Successfully!')
    },

    cancelChanges() {
      this.formData = { ...this.savedData }
      console.log('Form Reset')
    }
  }
})
</script>
