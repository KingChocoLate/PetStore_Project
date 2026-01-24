<template>
  <div class="w-full min-h-screen">

    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">Inventory</h1>
        <p class="text-slate-500 mt-1 font-medium">Manage your products, stock levels, and pricing.</p>
      </div>
      <button @click="openModal('create')" class="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition transform hover:-translate-y-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Add Product
      </button>
    </div>

    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">

      <div class="relative w-full md:w-96">
        <svg class="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search products..."
          class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
        >
      </div>

      <select v-model="filters.category" class="w-full md:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer">
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Toys">Toys</option>
        <option value="Accessories">Accessories</option>
        <option value="Health">Health</option>
      </select>

      <select v-model="filters.stock" class="w-full md:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer">
        <option value="all">All Stock</option>
        <option value="low">Low Stock (&lt; 10)</option>
        <option value="out">Out of Stock</option>
      </select>

      <button
        v-if="activeFiltersCount > 0"
        @click="resetFilters"
        class="text-xs font-bold text-red-500 hover:text-red-700 px-4 py-2"
      >
        Reset Filters
      </button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div v-for="n in 8" :key="n" class="bg-white rounded-[32px] p-4 h-[400px] border border-slate-100 shadow-sm animate-pulse">
        <div class="bg-slate-100 h-48 w-full rounded-2xl mb-4"></div>
        <div class="h-6 bg-slate-100 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-slate-100 rounded w-1/2"></div>
      </div>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <h3 class="text-lg font-black text-slate-900">No Products Found</h3>
      <p class="text-slate-500 text-sm mt-1">Try adjusting your filters or search query.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
      <AdminProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
        @edit="openModal('edit', product)"
        @delete="confirmDelete(product)"
      />
    </div>

    <transition name="modal">
      <div v-if="modal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

        <div class="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 class="text-xl font-black text-slate-900">{{ modal.mode === 'create' ? 'Add New Product' : 'Edit Product' }}</h3>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Product Details</p>
            </div>
            <button @click="closeModal" class="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition text-slate-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="p-8 overflow-y-auto custom-scrollbar space-y-6">

            <div class="space-y-3">
              <label class="block text-sm font-bold text-slate-700">Product Image</label>
              <div
                class="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all hover:border-emerald-400 hover:bg-emerald-50/30 group cursor-pointer"
                @click="triggerFileInput"
              >
                <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" accept="image/*">

                <div v-if="previewImage" class="relative w-40 h-40 mb-4">
                  <img :src="previewImage" class="w-full h-full object-contain rounded-xl shadow-sm border border-slate-100 bg-white p-2">
                  <button @click.stop="removeImage" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                <div v-else class="flex flex-col items-center">
                  <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <p class="text-sm font-bold text-slate-900">Click to upload image</p>
                  <p class="text-xs text-slate-400 mt-1">SVG, PNG, JPG (max. 2MB)</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase">Product Name</label>
                <input v-model="form.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="e.g. Premium Dog Food">
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase">Category</label>
                <select v-model="form.category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition appearance-none">
                  <option>Food</option>
                  <option>Toys</option>
                  <option>Accessories</option>
                  <option>Health</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase">Price ($)</label>
                <input v-model.number="form.price" type="number" step="0.01" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="0.00">
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase">Stock Quantity</label>
                <input v-model.number="form.stockQuantity" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" placeholder="0">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-500 uppercase">Description</label>
              <textarea v-model="form.description" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition resize-none" placeholder="Describe the product..."></textarea>
            </div>

          </div>

          <div class="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button @click="closeModal" class="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition">Cancel</button>
            <button @click="saveProduct" :disabled="isSaving" class="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:bg-slate-800 transition disabled:opacity-70 flex items-center gap-2">
              <span v-if="isSaving" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              {{ isSaving ? 'Saving...' : 'Save Product' }}
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
import AdminProductCard from '@/components/Admin/AdminProductCard.vue';
import { useToast } from 'vue-toastification';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

export default defineComponent({
  name: "Products",
  components: { AdminProductCard },
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    const products = ref<any[]>([]);
    const isLoading = ref(true);
    const isSaving = ref(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const previewImage = ref<string | null>(null);
    const selectedFile = ref<File | null>(null);

    const filters = reactive({
      search: '',
      category: '',
      stock: 'all'
    });

    const modal = reactive({ open: false, mode: 'create', id: '' });

    // 👇 FIXED: Using 'stockQuantity' to match Backend/DB
    const form = reactive({
      name: '',
      price: 0,
      category: 'Food',
      stockQuantity: 0,
      description: '',
      brand: 'PetStore+'
    });

    const getAuthHeader = () => {
      let token = authStore.token;
      if (!token) {
         const stored = localStorage.getItem('userInfo');
         if (stored) token = JSON.parse(stored).token;
      }
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchProducts = async () => {
      isLoading.value = true;
      try {
        const { data } = await axios.get(`${API_BASE}/products`);
        products.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredProducts = computed(() => {
      return products.value.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category ? p.category === filters.category : true;

        // Handle variations of stock naming from DB
        const currentStock = p.stockQuantity !== undefined ? p.stockQuantity : (p.stock || 0);

        let matchesStock = true;
        if (filters.stock === 'low') matchesStock = currentStock < 10;
        if (filters.stock === 'out') matchesStock = currentStock === 0;

        return matchesSearch && matchesCategory && matchesStock;
      });
    });

    const activeFiltersCount = computed(() => {
      let count = 0;
      if (filters.search) count++;
      if (filters.category) count++;
      if (filters.stock !== 'all') count++;
      return count;
    });

    const resetFilters = () => {
      filters.search = '';
      filters.category = '';
      filters.stock = 'all';
    };

    const openModal = (mode: string, product: any = null) => {
      modal.mode = mode;
      modal.open = true;
      if (mode === 'edit' && product) {
        modal.id = product._id;
        form.name = product.name;
        form.price = product.price;
        form.category = product.category;

        // 👇 FIXED: Correctly map existing stock to form
        form.stockQuantity = product.stockQuantity !== undefined ? product.stockQuantity : (product.stock || 0);

        form.description = product.description;
        previewImage.value = product.imageUrl || product.image;
      } else {
        Object.assign(form, {
          name: '',
          price: 0,
          category: 'Food',
          stockQuantity: 0, // Reset to 0 for new products
          description: ''
        });
        previewImage.value = null;
        selectedFile.value = null;
      }
    };

    const closeModal = () => { modal.open = false; };

    const triggerFileInput = () => fileInput.value?.click();

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => { previewImage.value = e.target?.result as string; };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = () => {
      selectedFile.value = null;
      previewImage.value = null;
      if (fileInput.value) fileInput.value.value = '';
    };

    const saveProduct = async () => {
      isSaving.value = true;
      try {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', String(form.price));
        formData.append('category', form.category);

        // 👇 FIXED: Send 'stockQuantity' to match Backend Controller
        formData.append('stockQuantity', String(form.stockQuantity));

        formData.append('description', form.description);
        formData.append('brand', 'PetStore+');

        if (selectedFile.value) {
          formData.append('image', selectedFile.value);
        }

        const config = getAuthHeader();

        if (modal.mode === 'create') {
          await axios.post(`${API_BASE}/products`, formData, config);
          toast.success("Product Created!");
        } else {
          await axios.put(`${API_BASE}/products/${modal.id}`, formData, config);
          toast.success("Product Updated!");
        }

        closeModal();
        fetchProducts();

      } catch (error: any) {
        console.error(error);
        toast.error("Failed to save product. " + (error.response?.data?.message || ''));
      } finally {
        isSaving.value = false;
      }
    };

    const confirmDelete = async (product: any) => {
      if(confirm(`Are you sure you want to delete ${product.name}?`)) {
        try {
          await axios.delete(`${API_BASE}/products/${product._id}`, getAuthHeader());
          toast.success("Product Deleted");
          fetchProducts();
        } catch(e) { toast.error("Delete Failed"); }
      }
    }

    onMounted(fetchProducts);

    return {
      products, isLoading, isSaving, modal, form, filters, filteredProducts, activeFiltersCount,
      openModal, closeModal, saveProduct, confirmDelete, resetFilters,
      fileInput, triggerFileInput, handleFileSelect, previewImage, removeImage
    };
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
</style>
