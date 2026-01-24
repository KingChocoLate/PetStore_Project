<template>
  <div class="w-full min-h-screen">

    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">Campaigns</h1>
        <p class="text-slate-500 mt-1 font-medium">Create discount codes and manage offers.</p>
      </div>
      <button @click="openModal" class="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition transform hover:-translate-y-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Campaign
      </button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="h-48 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse"></div>
    </div>

    <div v-else-if="promotions.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
      </div>
      <h3 class="text-lg font-black text-slate-900">No Active Campaigns</h3>
      <p class="text-slate-500 text-sm mt-1">Create a discount code to boost sales.</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
      <div
        v-for="promo in promotions"
        :key="promo._id"
        class="group relative bg-white rounded-[24px] border border-slate-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Promo Code</span>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-black text-slate-900 tracking-tight font-mono bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 border-dashed">{{ promo.code }}</span>
              <button @click="copyCode(promo.code)" class="text-slate-400 hover:text-emerald-600 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col items-end">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg"
              :class="promo.type === 'percent' ? 'bg-purple-500 shadow-purple-200' : 'bg-emerald-500 shadow-emerald-200'">
              {{ promo.type === 'percent' ? '%' : '$' }}
            </div>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Discount Value</span>
            <span class="font-bold text-slate-900">
              {{ promo.type === 'percent' ? promo.value + '% Off' : '$' + promo.value + ' Off' }}
            </span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Redemptions</span>
            <span class="font-bold text-slate-900">{{ promo.usageCount }} / {{ promo.usageLimit || '∞' }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Expires</span>
            <span class="font-bold text-slate-900">{{ formatDate(promo.endDate) }}</span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
          <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold border"
            :class="getStatusClass(promo)">
            {{ getStatusText(promo) }}
          </span>

          <button
            @click="deletePromo(promo._id)"
            class="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden flex flex-col">

          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 class="text-xl font-black text-slate-900">New Campaign</h3>
            <button @click="showModal = false" class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500">✕</button>
          </div>

          <div class="p-8 space-y-5 overflow-y-auto max-h-[70vh]">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Discount Code</label>
              <input v-model="form.code" type="text" placeholder="e.g. WELCOME20" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 uppercase" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Type</label>
                <select v-model="form.type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none">
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Value</label>
                <input v-model.number="form.value" type="number" placeholder="20" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Start Date</label>
                <input v-model="form.startDate" type="date" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">End Date</label>
                <input v-model="form.endDate" type="date" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Usage Limit (0 = Unlimited)</label>
              <input v-model.number="form.usageLimit" type="number" placeholder="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none" />
            </div>
          </div>

          <div class="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button @click="showModal = false" class="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            <button @click="savePromotion" class="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:bg-slate-800 transition">Create Code</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: "Promotions",
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    const promotions = ref<any[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);

    const form = reactive({
      code: '',
      type: 'percent',
      value: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      usageLimit: 0
    });

    const getAuthHeader = () => {
      let token = authStore.token;
      if (!token) {
         const stored = localStorage.getItem('userInfo');
         if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchPromotions = async () => {
      isLoading.value = true;
      try {
        const { data } = await axios.get(`${API_BASE}/promotions`, getAuthHeader());
        promotions.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const savePromotion = async () => {
      if(!form.code || !form.value || !form.endDate) {
        toast.error("Please fill all fields");
        return;
      }
      try {
        await axios.post(`${API_BASE}/promotions`, form, getAuthHeader());
        toast.success("Campaign Created!");
        showModal.value = false;
        fetchPromotions();
        // Reset form
        form.code = ''; form.value = 0; form.endDate = '';
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to create");
      }
    };

    const deletePromo = async (id: string) => {
      if(confirm('Delete this promotion?')) {
        try {
          await axios.delete(`${API_BASE}/promotions/${id}`, getAuthHeader());
          toast.success("Deleted");
          fetchPromotions();
        } catch (e) { toast.error("Delete failed"); }
      }
    };

    const formatDate = (iso: string) => {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getStatusText = (p: any) => {
      const now = new Date();
      if (new Date(p.endDate) < now) return 'Expired';
      if (new Date(p.startDate) > now) return 'Scheduled';
      return 'Active';
    };

    const getStatusClass = (p: any) => {
      const status = getStatusText(p);
      if (status === 'Active') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      if (status === 'Expired') return 'bg-slate-100 text-slate-500 border-slate-200';
      return 'bg-blue-50 text-blue-700 border-blue-100';
    };

    const copyCode = (code: string) => {
      navigator.clipboard.writeText(code);
      toast.info("Copied!");
    };

    const openModal = () => { showModal.value = true; };

    onMounted(fetchPromotions);

    return {
      promotions, isLoading, showModal, form,
      openModal, savePromotion, deletePromo,
      formatDate, getStatusText, getStatusClass, copyCode
    };
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
