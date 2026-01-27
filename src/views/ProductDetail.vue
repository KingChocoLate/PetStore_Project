<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pb-20">

    <div v-if="loading" class="h-screen flex flex-col items-center justify-center">
      <div class="w-16 h-16 border-4 border-gray-200 border-t-[#009200] rounded-full animate-spin mb-4"></div>
      <p class="text-gray-400 font-medium animate-pulse">Loading amazing things...</p>
    </div>

    <div v-else-if="error || !product" class="h-screen flex flex-col items-center justify-center px-4 text-center">
      <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
         <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <p class="text-2xl text-gray-900 font-bold mb-2">Product Not Found</p>
      <p class="text-gray-500 mb-8">This item may have been removed or is out of stock.</p>
      <button @click="$router.push('/shop')" class="px-8 py-3 bg-[#009200] text-white rounded-xl font-bold hover:bg-[#007a00] transition shadow-lg">Back to Shop</button>
    </div>

    <div v-else class="max-w-[1280px] mx-auto px-6 md:px-12 pt-8">

      <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <router-link to="/shop" class="hover:text-[#009200] transition">Shop</router-link>
        <span>/</span>
        <span class="text-gray-900 font-medium truncate max-w-[200px]">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">

        <div class="lg:sticky lg:top-28 self-start space-y-4">
          <div class="relative w-full aspect-square bg-gray-50 rounded-3xl flex items-center justify-center p-8 border border-gray-100 overflow-hidden group">
             <img
               :src="mainImage"
               :alt="product.name"
               class="relative z-10 w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
             />
          </div>
        </div>

        <div class="flex flex-col pt-4">
          <div class="mb-8 border-b border-gray-100 pb-8">
             <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-green-50 text-[#009200] text-xs font-bold uppercase tracking-wider rounded-full border border-green-100">
                  {{ product.category }}
                </span>
                <div class="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                   <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   <span class="text-gray-900">{{ product.rating ? product.rating.toFixed(1) : '0.0' }}</span>
                   <span class="text-gray-400 font-normal">({{ product.numReviews || 0 }} reviews)</span>
                </div>
             </div>

             <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{{ product.name }}</h1>

             <div class="flex items-end gap-4">
                <span class="text-5xl font-bold text-[#009200] tracking-tight">${{ product.price }}</span>
             </div>
          </div>

          <div class="prose prose-lg text-gray-600 leading-relaxed mb-10">
             <p>{{ product.description }}</p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div class="flex items-center bg-white rounded-xl px-2 border border-gray-200 h-[56px] shadow-sm w-full sm:w-auto">
              <button @click="quantity > 1 ? quantity-- : null" class="w-12 h-full flex items-center justify-center text-xl font-bold text-gray-400 hover:text-black transition">-</button>
              <span class="w-8 text-center text-lg font-bold text-gray-900">{{ quantity }}</span>
              <button @click="quantity++" class="w-12 h-full flex items-center justify-center text-xl font-bold text-gray-400 hover:text-black transition">+</button>
            </div>

            <button
              @click="addToCart"
              class="w-full flex-1 h-[56px] rounded-xl bg-[#009200] text-white font-bold text-lg hover:bg-[#007a00] transition-all shadow-lg shadow-green-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-16">
        <h2 class="text-3xl font-bold mb-10 flex items-center gap-3">
          Customer Reviews
          <span class="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">{{ product.reviews ? product.reviews.length : 0 }}</span>
        </h2>

        <div v-if="product.reviews && product.reviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div v-for="review in product.reviews" :key="review._id" class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 text-[#009200] rounded-full flex items-center justify-center font-bold text-lg">
                  {{ review.name.charAt(0).toUpperCase() }}
                </div>
                <span class="font-bold text-gray-900">{{ review.name }}</span>
              </div>
              <div class="flex text-yellow-400 text-sm">
                <span v-for="i in 5" :key="i">
                   <svg class="w-5 h-5" :class="i <= review.rating ? 'fill-current' : 'text-gray-200 fill-current'" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </span>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">"{{ review.comment }}"</p>
          </div>
        </div>

        <div v-else class="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mb-12">
          <p class="text-gray-500 text-lg">No reviews yet. Be the first to share your thoughts!</p>
        </div>

        <div class="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto">
          <h3 class="text-2xl font-bold mb-2">Write a Review</h3>
          <p class="text-gray-400 mb-8">Share your experience with other pet parents.</p>

          <div v-if="!user" class="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center border border-white/10">
             <p class="mb-4">Please log in to write a review.</p>
             <router-link to="/login" class="inline-block px-6 py-2 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition">Log In</router-link>
          </div>

          <form v-else @submit.prevent="submitReview" class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-gray-300 mb-2">Rating</label>
              <div class="flex gap-4">
                <button
                   v-for="star in 5"
                   :key="star"
                   type="button"
                   @click="rating = star.toString()"
                   class="transition transform hover:scale-110"
                   :class="parseInt(rating) >= star ? 'text-yellow-400' : 'text-gray-600'"
                >
                   <svg class="w-8 h-8 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-300 mb-2">Your Review</label>
              <textarea v-model="comment" rows="4" class="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#009200] focus:ring-1 focus:ring-[#009200] transition" placeholder="Tell us what you liked..."></textarea>
            </div>

            <button type="submit" class="w-full md:w-auto px-8 py-3 bg-[#009200] text-white rounded-xl font-bold hover:bg-[#007a00] transition shadow-lg shadow-green-900/50">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <!-- Recommended Products Section -->
      <div class="border-t border-gray-100 pt-16 mt-16">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl font-bold flex items-center gap-3">
            <svg class="w-8 h-8 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            You May Also Like
          </h2>
          <router-link to="/shop" class="text-[#009200] font-bold text-sm hover:underline flex items-center gap-1">
            View All
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="recommendedLoading" class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="n in 4" :key="n" class="bg-gray-50 rounded-2xl p-4 h-64 animate-pulse">
            <div class="w-full h-32 bg-gray-200 rounded-xl mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="recommendedProducts.length === 0" class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center border border-gray-200">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
            <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">No Recommendations Available</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find similar products in the <span class="font-semibold text-[#009200]">{{ product.category }}</span> category at this time.</p>
          <router-link to="/shop" class="inline-flex items-center gap-2 px-6 py-3 bg-[#009200] text-white rounded-xl font-bold hover:bg-[#007a00] transition shadow-lg shadow-green-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Explore All Products
          </router-link>
        </div>

        <!-- Recommended Products Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="rec in recommendedProducts"
            :key="rec._id"
            :to="{ name: 'product-detail', params: { id: rec._id } }"
            class="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#009200]/20 transition-all duration-300"
          >
            <div class="relative aspect-square bg-gray-50 p-4 overflow-hidden">
              <img
                :src="getImageUrl(rec.imageUrl || rec.image)"
                :alt="rec.name"
                class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3">
                <span class="px-2 py-1 bg-green-50 text-[#009200] text-[10px] font-bold uppercase rounded-full border border-green-100">
                  {{ rec.category }}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#009200] transition-colors">{{ rec.name }}</h4>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-[#009200]">${{ rec.price }}</span>
                <div class="flex items-center gap-1 text-yellow-400 text-xs">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span class="text-gray-600">{{ rec.rating ? rec.rating.toFixed(1) : '0.0' }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { useToast } from "vue-toastification";

// 👇 Define your backend URL constant
const BACKEND_URL = "https://petstore-backend-api.onrender.com";

export default defineComponent({
  name: 'ProductDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const toast = useToast();

    const user = computed(() => authStore.user);
    const quantity = ref(1);
    const loading = ref(true);
    const error = ref('');
    const product = ref<any>(null);
    const mainImage = ref('');

    const rating = ref('5');
    const comment = ref('');

    // Recommended products
    const allProducts = ref<any[]>([]);
    const recommendedLoading = ref(true);
    const recommendedProducts = ref<any[]>([]);

    // 👇 Helper to fix image paths
    const getImageUrl = (path: string) => {
      if (!path) return 'https://via.placeholder.com/300';
      // If it starts with http, it's already a full URL (external image)
      if (path.startsWith('http') || path.startsWith('blob:')) return path;
      // Otherwise, prepend the backend URL
      return `${BACKEND_URL}${path}`;
    };

    const fetchProduct = async () => {
      loading.value = true;
      try {
        const response = await api.get(`/products/${route.params.id}`);
        product.value = response.data;
        if (product.value) {
            // 👇 Use the helper immediately so 'mainImage' is always a valid URL
            const rawPath = product.value.imageUrl || product.value.image || '';
            mainImage.value = getImageUrl(rawPath);
            // Fetch recommended products after getting current product
            fetchRecommendedProducts();
        }
      } catch (err) {
        console.error(err);
        error.value = 'Failed to load product.';
      } finally {
        loading.value = false;
      }
    };

    const fetchRecommendedProducts = async () => {
      recommendedLoading.value = true;
      try {
        const response = await api.get('/products');
        allProducts.value = response.data;

        // Filter products by same category, exclude current product, limit to 4
        if (product.value) {
          recommendedProducts.value = allProducts.value
            .filter((p: any) =>
              p.category === product.value.category &&
              p._id !== product.value._id
            )
            .slice(0, 4);
        }
      } catch (err) {
        console.error('Failed to fetch recommended products:', err);
        recommendedProducts.value = [];
      } finally {
        recommendedLoading.value = false;
      }
    };

    const submitReview = async () => {
      if (!rating.value || !comment.value) {
          toast.warning("Please provide a rating and a comment.");
          return;
      }
      try {
        await api.post(`/products/${route.params.id}/reviews`, {
          rating: rating.value,
          comment: comment.value
        });
        comment.value = '';
        rating.value = '5';
        await fetchProduct();
        toast.success("Review submitted!");
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to submit review');
      }
    };

    const addToCart = () => {
      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!product.value) return;
      for (let i = 0; i < quantity.value; i++) {
        cartStore.addToCart({
          _id: product.value._id,
          name: product.value.name,
          price: product.value.price,
          category: product.value.category,
          image: mainImage.value // 👇 Passes the full URL to the cart!
        });
      }
      toast.success("Added to Cart!");
    };

    onMounted(() => {
        fetchProduct();
    });

    // ⚡️ Fix for route changes not updating the component
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchProduct();
        window.scrollTo(0, 0); // Scroll to top
        }
      }
    );

    return {
      product, loading, error, mainImage, quantity, addToCart,
      user, rating, comment, submitReview,
      recommendedProducts, recommendedLoading, getImageUrl
    };
  }
});
</script>
