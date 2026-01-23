<template>
  <div class="relative w-[280px] h-[368px] bg-white border-2 border-green-500 rounded-2xl p-4 flex flex-col justify-between shadow-sm font-sans transition-all hover:shadow-md">
    
    <div v-if="loading" class="flex flex-col items-center justify-center h-full space-y-4 animate-pulse">
      <div class="w-32 h-32 bg-gray-200 rounded-full"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center h-full text-red-500 text-center text-sm font-medium">
      {{ error }}
    </div>

    <div v-else class="contents">
      <button class="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </svg>
      </button>

      <div class="h-40 flex items-center justify-center mt-2">
        <img 
          :src="product?.image" 
          :alt="product?.title" 
          class="h-full object-contain drop-shadow-sm"
        />
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex text-orange-400">
          <svg 
            v-for="i in 5" 
            :key="i"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            class="w-5 h-5 transition-colors duration-300"
            :class="i <= (product?.rating || 0) ? 'text-orange-400' : 'text-gray-200'"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </div>

        <h2 class="text-xl font-extrabold text-black leading-tight truncate">
          {{ product?.title }}
        </h2>
        
        <p class="text-gray-400 text-sm font-medium">Description</p>

        <p class="text-green-600 text-2xl font-bold mt-1">
          ${{ formatPrice(product?.price) }}
        </p>
      </div>

      <div class="border border-gray-200 rounded-lg p-2.5 mt-auto text-sm w-full">
        <div class="flex justify-between items-center mb-2">
          <span class="text-black font-medium">sales:</span>
          <div class="flex items-center gap-1">
            <svg class="text-green-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <span class="font-medium text-black">{{ product?.sales }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex justify-between items-center w-full">
            <span class="text-black text-xs sm:text-sm whitespace-nowrap">Remaining Products:</span>
            <span class="text-xs font-medium text-gray-600">
              {{ product?.remaining }}
            </span>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out" 
              :style="{ width: stockPercentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 1. Define Types (Student/Professional Best Practice)
// This ensures we know exactly what data shape we are dealing with.
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;     // 1 to 5
  sales: number;
  remaining: number;
  totalStock: number; // needed for progress bar calculation
}

export default defineComponent({
  name: 'AdminProductCard',
  
  // 2. Props: Allows the parent to request a specific product ID
  props: {
    productId: {
      type: Number,
      required: true,
      default: 1
    }
  },

  // 3. Data: Reactive state for the component
  data() {
    return {
      product: null as Product | null,
      loading: true,
      error: null as string | null,
    };
  },

  // 4. Computed Properties: For derived logic (cleaner templates)
  computed: {
    stockPercentage(): number {
      if (!this.product) return 0;
      // Prevent division by zero and cap at 100%
      if (this.product.totalStock === 0) return 0;
      return (this.product.remaining / this.product.totalStock) * 100;
    }
  },

  // 5. Lifecycle Hook: Fetch data when component mounts
  mounted() {
    this.fetchProductData();
  },

  // 6. Methods: Actions the component can take
  methods: {
    async fetchProductData() {
      this.loading = true;
      this.error = null;

      try {
        // --- SIMULATING BACKEND CALL ---
        // In a real project, this would be: 
        // const res = await axios.get(`/api/products/${this.productId}`);
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Fake network delay
        
        // Mock Response
        const mockData: Product = {
          id: this.productId,
          title: "Cat Food",
          // Using a reliable placeholder image
          image: "https://www.royalcanin.com/kr/cats/products/retail-products/sensible-33-dry/-/media/c7091176518742878516087796071424.jpg?rev=f43c323f495544499d369e880228e946", 
          price: 29.99,
          rating: 4,
          sales: 120,
          remaining: 12,
          totalStock: 50
        };
        
        this.product = mockData;
        // -------------------------------
        
      } catch (err) {
        console.error(err);
        this.error = "Failed to load product data.";
      } finally {
        this.loading = false;
      }
    },

    formatPrice(price: number | undefined): string {
      if (price === undefined) return '0.00';
      return price.toFixed(2);
    }
  }
});
</script>