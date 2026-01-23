<template>
  <div class="h-[calc(100vh-80px)] bg-[#F3F4F6] font-sans text-gray-900 overflow-hidden flex flex-col">

    <div class="max-w-[1400px] w-full mx-auto px-4 md:px-8 pt-8 flex-1 flex flex-col min-h-0">

      <header class="mb-8 flex-shrink-0 flex items-end justify-between">
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Hello, <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#009200] to-emerald-600">{{ welcomeName }}</span>
          </h1>
          <p class="text-gray-500 mt-2 font-medium">{{ currentDate }}</p>
        </div>
      </header>

      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 w-full flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        <aside class="lg:w-[380px] bg-gray-50 flex-shrink-0 flex flex-col border-r border-gray-200 p-8 overflow-y-auto">

          <div class="bg-gradient-to-br from-[#009200] to-[#006400] rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-8">
                 <div class="font-bold tracking-widest text-xs opacity-70">PETSTORE+ MEMBER</div>
                 <svg class="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div class="text-3xl font-bold mb-1">{{ orderCount * 10 }} <span class="text-sm font-normal opacity-80">pts</span></div>
              <div class="text-xs opacity-70">Loyalty Balance</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
               <div class="text-2xl font-bold text-gray-900">{{ orderCount }}</div>
               <div class="text-xs text-gray-500 font-bold uppercase">Orders</div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
               <div class="text-2xl font-bold text-gray-900">0</div>
               <div class="text-xs text-gray-500 font-bold uppercase">Reviews</div>
            </div>
          </div>

          <nav class="space-y-2 mb-auto">
             <router-link to="/order-history" class="flex items-center gap-3 px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl font-bold hover:border-[#009200] hover:text-[#009200] transition-all group">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                My Orders
             </router-link>
             <router-link to="/wishlist" class="flex items-center gap-3 px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all group">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                My Wishlist
             </router-link>
          </nav>

          <button @click="logout" class="mt-8 flex items-center justify-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 py-3 rounded-xl transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Log Out
          </button>
        </aside>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">

          <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
            <h2 class="text-xl font-bold text-gray-900">Profile Settings</h2>
            <div v-if="loading" class="text-[#009200] text-sm font-bold animate-pulse">Syncing...</div>
          </div>

          <div class="space-y-8 max-w-3xl">
            <section class="space-y-6">
               <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Information</h3>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                     <label class="text-sm font-bold text-gray-700">First Name</label>
                     <input v-model="formData.firstName" type="text" class="input-modern" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-sm font-bold text-gray-700">Last Name</label>
                     <input v-model="formData.lastName" type="text" class="input-modern" />
                  </div>
               </div>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                     <label class="text-sm font-bold text-gray-700">Email (Locked)</label>
                     <input v-model="formData.email" type="email" disabled class="input-modern opacity-60 cursor-not-allowed bg-gray-100" />
                  </div>
                  <div class="space-y-2">
                     <label class="text-sm font-bold text-gray-700">Phone</label>
                     <input v-model="formData.phone" type="text" class="input-modern" />
                  </div>
               </div>
               <div class="space-y-2">
                  <label class="text-sm font-bold text-gray-700">Shipping Address</label>
                  <input v-model="formData.address" type="text" class="input-modern" />
               </div>
            </section>

            <section class="space-y-6 pt-6 border-t border-gray-100">
               <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Security</h3>
               <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                  <input v-model="passwordData.current" type="password" placeholder="Current Password" class="input-modern bg-white" />
                  <div class="grid grid-cols-2 gap-4">
                     <input v-model="passwordData.new" type="password" placeholder="New Password" class="input-modern bg-white" />
                     <input v-model="passwordData.confirm" type="password" placeholder="Confirm New Password" class="input-modern bg-white" />
                  </div>
               </div>
            </section>
          </div>

          <div class="mt-10 flex gap-4">
             <button @click="saveChanges" :disabled="loading" class="px-8 py-3 bg-[#009200] text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-[#007a00] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
               <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               {{ loading ? 'Saving...' : 'Save Changes' }}
             </button>
             <button @click="cancelChanges" class="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">Discard</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast()
    const loading = ref(false)
    const orderCount = ref(0)

    const formData = ref({ firstName: '', lastName: '', email: '', address: '', phone: '' })
    const passwordData = ref({ current: '', new: '', confirm: '' })

    const welcomeName = computed(() => formData.value.firstName || 'Friend')
    const currentDate = computed(() => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))

    const fetchUserProfile = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            formData.value = { ...data };
            authStore.user = { ...authStore.user, ...data };
            localStorage.setItem('user', JSON.stringify(authStore.user));
        } catch (error) { console.error("Failed to load profile", error); }
    }

    const fetchOrderCount = async () => {
      try { const res = await api.get('/orders/myorders'); orderCount.value = res.data.length; } catch (e) { console.error(e) }
    }

    const saveChanges = async () => {
      if (passwordData.value.new) {
        if (!passwordData.value.current) return toast.warning("Please enter current password.");
        if (passwordData.value.new !== passwordData.value.confirm) return toast.warning("New passwords do not match.");
      }

      loading.value = true
      try {
        const payload = { ...formData.value, ...(passwordData.value.new ? { currentPassword: passwordData.value.current, newPassword: passwordData.value.new } : {}) }
        const response = await api.put('/auth/profile', payload)
        authStore.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        formData.value = { ...formData.value, ...response.data };
        passwordData.value = { current: '', new: '', confirm: '' }
        toast.success("Profile updated successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Update failed.');
      } finally { loading.value = false }
    }

    const cancelChanges = () => { fetchUserProfile(); passwordData.value = { current: '', new: '', confirm: '' }; }
    const logout = () => { authStore.logout(); }

    onMounted(() => { fetchUserProfile(); fetchOrderCount(); })

    return { formData, passwordData, loading, welcomeName, currentDate, orderCount, saveChanges, cancelChanges, logout }
  }
})
</script>

<style scoped>
.input-modern {
  width: 100%;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  border-radius: 12px;
  outline: none;
  font-weight: 500;
  transition: all 0.2s;
}
.input-modern:focus {
  background: white;
  border-color: #009200;
  box-shadow: 0 0 0 4px rgba(0, 146, 0, 0.1);
}
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e5e5; border-radius: 20px; }
</style>
