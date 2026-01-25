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

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Active</p>
          <p class="text-2xl font-black text-slate-900">{{ activeCount }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Scheduled</p>
          <p class="text-2xl font-black text-slate-900">{{ scheduledCount }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-purple-50 text-purple-600 rounded-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Total Redemptions</p>
          <p class="text-2xl font-black text-slate-900">{{ totalRedemptions }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="p-3 bg-amber-50 text-amber-600 rounded-2xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">Est. Savings Given</p>
          <p class="text-2xl font-black text-slate-900">{{ formatMoney(estimatedSavings) }}</p>
        </div>
      </div>
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
            <span class="text-[10px] font-black uppercase tracking-wider mb-1"
              :class="promo.campaignType === 'product_discount' ? 'text-purple-500' : 'text-emerald-500'">
              {{ promo.campaignType === 'product_discount' ? 'Product Discount' : 'Promo Code' }}
            </span>
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

        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Discount Value</span>
            <span class="font-bold text-slate-900">
              {{ promo.type === 'percent' ? promo.value + '% Off' : '$' + promo.value + ' Off' }}
            </span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Redemptions</span>
            <span class="font-bold text-slate-900">{{ promo.usageCount || 0 }} / {{ promo.usageLimit || '∞' }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Valid Period</span>
            <span class="font-bold text-slate-900 text-xs">{{ formatDateShort(promo.startDate) }} - {{ formatDateShort(promo.endDate) }}</span>
          </div>
          <!-- Applicable Products -->
          <div v-if="promo.applicableProducts && promo.applicableProducts.length > 0" class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Applies To</span>
            <span class="font-bold text-purple-600 text-xs">{{ promo.applicableProducts.length }} products</span>
          </div>
          <div v-else class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Applies To</span>
            <span class="font-bold text-emerald-600 text-xs">All Products</span>
          </div>
        </div>

        <!-- Est. Savings -->
        <div class="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-medium">Est. Savings Given</span>
            <span class="font-black text-emerald-600">{{ formatMoney(calculatePromoSavings(promo)) }}</span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
          <span class="px-3 py-1.5 rounded-xl text-[11px] font-bold border"
            :class="getStatusClass(promo)">
            {{ getStatusText(promo) }}
          </span>

          <div class="flex gap-2">
            <button
              @click="editPromo(promo)"
              class="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition"
            >
              Edit
            </button>
            <button
              @click="deletePromo(promo._id)"
              class="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h3 class="text-xl font-black text-slate-900">{{ isEditing ? 'Edit Campaign' : 'New Campaign' }}</h3>
            <button @click="closeModal" class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500">✕</button>
          </div>

          <div class="p-8 space-y-5 overflow-y-auto">
            <!-- Campaign Type Toggle -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Campaign Type</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  @click="form.campaignType = 'promo_code'"
                  class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
                  :class="form.campaignType === 'promo_code' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'"
                >
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                    :class="form.campaignType === 'promo_code' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                  </div>
                  <span class="text-sm font-bold" :class="form.campaignType === 'promo_code' ? 'text-emerald-700' : 'text-slate-600'">Promo Code</span>
                  <span class="text-[10px] text-slate-400">User enters code at checkout</span>
                </button>
                <button 
                  type="button"
                  @click="form.campaignType = 'product_discount'"
                  class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
                  :class="form.campaignType === 'product_discount' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'"
                >
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                    :class="form.campaignType === 'product_discount' ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-400'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span class="text-sm font-bold" :class="form.campaignType === 'product_discount' ? 'text-purple-700' : 'text-slate-600'">Product Discount</span>
                  <span class="text-[10px] text-slate-400">Auto-applies to selected products</span>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">
                {{ form.campaignType === 'product_discount' ? 'Discount Name' : 'Discount Code' }}
              </label>
              <input v-model="form.code" type="text" :placeholder="form.campaignType === 'product_discount' ? 'e.g. SUMMER_SALE' : 'e.g. WELCOME20'" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 uppercase" :disabled="isEditing" />
              <p v-if="isEditing" class="text-xs text-slate-400 mt-1">Code cannot be changed after creation.</p>
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

            <!-- Applicable Products (Multi-select) -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Applicable Products</label>
              <div class="relative">
                <button 
                  @click="showProductDropdown = !showProductDropdown"
                  type="button"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none text-left flex justify-between items-center"
                >
                  <span v-if="form.applicableProducts.length === 0" class="text-slate-400">All products (no restriction)</span>
                  <span v-else>{{ form.applicableProducts.length }} products selected</span>
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <div v-if="showProductDropdown" class="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  <div v-if="products.length === 0" class="p-4 text-center text-slate-400 text-sm">
                    Loading products...
                  </div>
                  <label 
                    v-for="product in products" 
                    :key="product._id" 
                    class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <input 
                      type="checkbox" 
                      :value="product._id"
                      v-model="form.applicableProducts"
                      class="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    >
                    <span class="text-sm font-medium text-slate-700 truncate">{{ product.name }}</span>
                    <span class="text-xs text-slate-400 ml-auto">{{ formatMoney(product.price) }}</span>
                  </label>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-1">Leave empty to apply to all products.</p>
            </div>

            <!-- Minimum Purchase (Only for promo_code) -->
            <div v-if="form.campaignType === 'promo_code'">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Minimum Purchase Amount</label>
              <input v-model.number="form.minPurchase" type="number" placeholder="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none" />
              <p class="text-xs text-slate-400 mt-1">Set to 0 for no minimum requirement.</p>
            </div>
          </div>

          <div class="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button @click="closeModal" class="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            <button @click="savePromotion" class="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:bg-slate-800 transition">
              {{ isEditing ? 'Update Campaign' : 'Create Code' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
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
    const products = ref<any[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const showProductDropdown = ref(false);

    const form = reactive({
      code: '',
      type: 'percent',
      value: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      usageLimit: 0,
      applicableProducts: [] as string[],
      minPurchase: 0,
      campaignType: 'promo_code' as 'promo_code' | 'product_discount'
    });

    const isEditing = ref(false);
    const editingId = ref<string | null>(null);

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

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products`);
        products.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    // Stats computed
    const activeCount = computed(() => {
      const now = new Date();
      return promotions.value.filter(p => 
        new Date(p.startDate) <= now && new Date(p.endDate) >= now
      ).length;
    });

    const scheduledCount = computed(() => {
      const now = new Date();
      return promotions.value.filter(p => new Date(p.startDate) > now).length;
    });

    const totalRedemptions = computed(() => {
      return promotions.value.reduce((sum, p) => sum + (p.usageCount || 0), 0);
    });

    const estimatedSavings = computed(() => {
      return promotions.value.reduce((sum, p) => sum + calculatePromoSavings(p), 0);
    });

    const calculatePromoSavings = (promo: any) => {
      // Estimate based on usage count and average order value ($50)
      const avgOrderValue = 50;
      const usageCount = promo.usageCount || 0;
      if (promo.type === 'percent') {
        return (promo.value / 100) * avgOrderValue * usageCount;
      } else {
        return promo.value * usageCount;
      }
    };

    const savePromotion = async () => {
      if(!form.code || !form.value || !form.endDate) {
        toast.error("Please fill all required fields");
        return;
      }
      
      // For product_discount, must have at least one product selected
      if(form.campaignType === 'product_discount' && form.applicableProducts.length === 0) {
        toast.error("Please select at least one product for Product Discount");
        return;
      }
      
      try {
        const payload = {
          ...form,
          applicableProducts: form.applicableProducts.length > 0 ? form.applicableProducts : undefined,
          minPurchase: form.campaignType === 'promo_code' && form.minPurchase > 0 ? form.minPurchase : undefined
        };
        
        if (isEditing.value && editingId.value) {
          // UPDATE
          await axios.put(`${API_BASE}/promotions/${editingId.value}`, payload, getAuthHeader());
          toast.success("Campaign Updated!");
        } else {
          // CREATE
          await axios.post(`${API_BASE}/promotions`, payload, getAuthHeader());
          toast.success("Campaign Created!");
        }
        
        closeModal();
        fetchPromotions();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to save");
      }
    };

    const editPromo = (promo: any) => {
      isEditing.value = true;
      editingId.value = promo._id;
      form.code = promo.code;
      form.type = promo.type;
      form.value = promo.value;
      form.startDate = promo.startDate.slice(0, 10);
      form.endDate = promo.endDate.slice(0, 10);
      form.usageLimit = promo.usageLimit || 0;
      form.applicableProducts = promo.applicableProducts?.map((p: any) => p._id || p) || [];
      form.minPurchase = promo.minPurchase || 0;
      form.campaignType = promo.campaignType || 'promo_code';
      showModal.value = true;
      showProductDropdown.value = false;
    };

    const resetForm = () => {
      form.code = '';
      form.type = 'percent';
      form.value = 0;
      form.startDate = new Date().toISOString().slice(0, 10);
      form.endDate = '';
      form.usageLimit = 0;
      form.applicableProducts = [];
      form.minPurchase = 0;
      form.campaignType = 'promo_code';
      isEditing.value = false;
      editingId.value = null;
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm();
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

    const formatDateShort = (iso: string) => {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatMoney = (n: number) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);
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

    const openModal = () => { 
      resetForm();
      showModal.value = true;
      showProductDropdown.value = false;
    };

    onMounted(() => {
      fetchPromotions();
      fetchProducts();
    });

    return {
      promotions, products, isLoading, showModal, form, showProductDropdown, isEditing,
      openModal, closeModal, savePromotion, editPromo, deletePromo,
      formatDate, formatDateShort, formatMoney, getStatusText, getStatusClass, copyCode,
      activeCount, scheduledCount, totalRedemptions, estimatedSavings, calculatePromoSavings
    };
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
