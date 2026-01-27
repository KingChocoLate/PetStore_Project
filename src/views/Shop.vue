<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <div class="max-w-[1600px] mx-auto px-4 md:px-8 py-8">

      <div class="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md py-4 mb-6 border-b border-gray-200 flex items-center justify-between gap-4">
        <div class="flex items-center justify-between md:justify-start gap-4 overflow-x-auto pb-2 scrollbar-hide flex-1">
          <button
            v-for="tab in topTabs"
            :key="tab"
            @click="activeTab = tab"
            class="px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300"
            :class="activeTab === tab
              ? 'bg-[#009200] text-white shadow-lg shadow-green-200 transform scale-105'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-[#009200] hover:text-[#009200]'"
          >
            {{ tab }}
          </button>
        </div>

        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="hidden md:flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-full text-sm font-bold hover:bg-red-100 transition-colors whitespace-nowrap"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          Clear Filters
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 relative">

        <button
          @click="showMobileFilters = !showMobileFilters"
          class="lg:hidden flex items-center justify-center gap-2 w-full bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 shadow-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          {{ showMobileFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>

        <aside
          :class="showMobileFilters ? 'block' : 'hidden lg:block'"
          class="w-full lg:w-64 flex-shrink-0 space-y-8 lg:sticky lg:top-24 lg:self-start bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none shadow-sm lg:shadow-none border lg:border-none border-gray-100 mb-6 lg:mb-0"
        >
          <div>
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              Categories
            </h3>
            <ul class="space-y-1">
              <li v-for="cat in categoryItems" :key="cat">
                <button
                  @click="selectedCategory = cat"
                  class="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex justify-between items-center group"
                  :class="selectedCategory === cat ? 'bg-green-50 text-[#009200]' : 'text-gray-600 hover:bg-white hover:shadow-sm'"
                >
                  {{ cat }}
                  <span v-if="selectedCategory === cat" class="w-2 h-2 rounded-full bg-[#009200]"></span>
                </button>
              </li>
            </ul>
          </div>

          <div class="h-px bg-gray-200 w-full"></div>

          <div>
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
              Sort By
            </h3>
            <ul class="space-y-1">
              <li v-for="sort in sortItems" :key="sort">
                <button
                  @click="selectedSort = sort"
                  class="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex justify-between items-center"
                  :class="selectedSort === sort ? 'bg-green-50 text-[#009200] font-bold' : 'text-gray-600 hover:bg-white hover:shadow-sm'"
                >
                  {{ sort }}
                  <span v-if="selectedSort === sort" class="w-2 h-2 rounded-full bg-[#009200]"></span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main class="flex-1 min-h-[500px]">

          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="n in 8" :key="n" class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-80 animate-pulse">
               <div class="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
               <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
               <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          <div v-else-if="error" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-red-100">
             <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
               <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <p class="text-gray-900 font-bold text-lg mb-2">Oops! Something went wrong.</p>
             <p class="text-gray-500">{{ error }}</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product._id"
              :product="product"
            />
          </div>

          <div v-if="!loading && !error && filteredProducts.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p class="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
            <button @click="resetFilters" class="px-6 py-2 bg-[#009200] text-white rounded-lg font-bold hover:bg-[#007a00] transition shadow-lg shadow-green-200">
              Clear All Filters
            </button>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, h, watch } from 'vue' // Added watch
import api from '../services/api'
import ProductCard from '../components/ProductCard.vue'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'ShopPage',
  components: { ProductCard },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const topTabs = ['All', 'Cat', 'Dog', 'Small Pet', 'Bird', 'Fish'];
    const categoryItems = ['All', 'Food', 'Toys', 'Furniture', 'Accessories', 'Treats'];
    const sortItems = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'];

    const showMobileFilters = ref(false);
    const products = ref<any[]>([]);
    const loading = ref(true);
    const error = ref('');
    // Sync Category from URL (Species -> activeTab, Item Type -> selectedCategory)
    const initCategory = (route.query.category as string) || '';
    
    // Helper to find matching tab (case-insensitive)
    const findTab = (name: string) => topTabs.find(t => t.toLowerCase() === name.toLowerCase());
    const findCat = (name: string) => categoryItems.find(c => c.toLowerCase() === name.toLowerCase());

    const activeTab = ref(findTab(initCategory) || 'All');
    const selectedCategory = ref(findCat(initCategory) || 'All');
    const selectedSort = ref('Default');

    watch(() => route.query.category, (newVal: any) => {
      const val = newVal as string;
      if (!val) {
        activeTab.value = 'All';
        selectedCategory.value = 'All';
        return;
      }

      const matchedTab = findTab(val);
      if (matchedTab) {
        activeTab.value = matchedTab;
        selectedCategory.value = 'All'; // Reset item filter if switching species
      } else {
        const matchedCat = findCat(val);
        if (matchedCat) {
          selectedCategory.value = matchedCat;
          // Optional: Keep activeTab or reset? Usually reset to search broadly.
          // activeTab.value = 'All'; 
        }
      }
    });



    const fetchProducts = async () => {
      loading.value = true;
      try {
        const response = await api.get('/products');
        products.value = response.data.map((item: any) => ({
          ...item,
          image: item.imageUrl
        }));
      } catch (err) {
        console.error(err);
        error.value = 'Unable to connect to the server.';
      } finally {
        loading.value = false;
      }
    };

    const filteredProducts = computed(() => {
      const searchQuery = (route.query.q as string || '').toLowerCase();
      let result = products.value.filter(product => {
        const searchMatch = product.name.toLowerCase().includes(searchQuery) ||
                            (product.description && product.description.toLowerCase().includes(searchQuery));
        const catMatch = selectedCategory.value === 'All' ||
                         product.category === selectedCategory.value;
        const tabMatch = activeTab.value === 'All' ||
                         product.name.includes(activeTab.value) ||
                         product.description.includes(activeTab.value) ||
                         (activeTab.value === 'Small Pet' && (product.category === 'Hamster' || product.description.includes('small')));
        
        // 🆕 Check for specific product names (e.g. from "Shop Bundles")
        const productsParam = route.query.products as string;
        let productMatch = true;
        
        if (productsParam) {
           const targetNames = productsParam.split(',').map(n => n.trim().toLowerCase());
           // If product name is in the target list
           productMatch = targetNames.some(target => product.name.toLowerCase().includes(target));
        }

        return searchMatch && catMatch && tabMatch && productMatch;
      });

      // Apply sorting
      if (selectedSort.value === 'Price: Low to High') {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (selectedSort.value === 'Price: High to Low') {
        result = [...result].sort((a, b) => b.price - a.price);
      } else if (selectedSort.value === 'Name: A-Z') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      }

      return result;
    });

    const hasActiveFilters = computed(() => {
      const hasQuery = Object.keys(route.query).length > 0;
      return activeTab.value !== 'All' || 
             selectedCategory.value !== 'All' || 
             selectedSort.value !== 'Default' || 
             hasQuery;
    });

    const resetFilters = () => {
      activeTab.value = 'All';
      selectedCategory.value = 'All';
      selectedSort.value = 'Default';
      // Clear URL Query (Search, Products, Category etc.)
      router.replace({ query: {} });
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products, loading, error, topTabs, categoryItems, sortItems,
      activeTab, selectedCategory, selectedSort, filteredProducts, resetFilters, showMobileFilters,
      hasActiveFilters
    };
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>

<style>
/* 1. Push the Container Down (Below Navbar) */
.Vue-Toastification__container.top-right {
    top: 90px !important; /* Adjust based on your header height */
}

/* 2. Increase Toast Size & Padding */
.petstore-modern-toast {
    background: linear-gradient(135deg, #009200 0%, #007a00 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 20px !important;
    padding: 20px 24px !important; /* Much bigger padding */
    box-shadow: 0 20px 40px -6px rgba(0, 146, 0, 0.5) !important;
    overflow: visible !important;
    align-items: center !important;
    min-width: 380px !important; /* Wider card */
}

/* 3. Bigger Close Button */
.petstore-modern-toast .Vue-Toastification__close-button {
    color: rgba(255, 255, 255, 0.7) !important;
    padding-left: 15px !important;
    font-size: 24px !important;
}
.petstore-modern-toast .Vue-Toastification__close-button:hover {
    color: white !important;
}
</style>
