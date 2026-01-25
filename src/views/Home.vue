<template>
  <div class="home-wrapper font-poppins overflow-x-hidden bg-[#F9FDF9]">
    <div class="lantern-container pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <!-- 🟢 UPDATED: Realistic Lantern Image -->
      <img v-for="i in 8" :key="i" :src="lanternImg" class="lantern" :style="getLanternStyle(i)" />
    </div>

    <section
      class="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-12 md:py-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-[#F0FDF4] via-[#DCFCE7] to-[#F0FDF4] -z-10"
      ></div>

      <div
        class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FFD700] opacity-10 blur-[120px] rounded-full"
      ></div>

      <div
        class="max-w-[1400px] w-full px-4 sm:px-6 flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0 relative z-10"
      >
        <div class="space-y-4 sm:space-y-6 md:space-y-8 relative">
          <div
            class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-green-100"
          >
            <span class="w-2 h-2 rounded-full bg-[#D00000] animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-[#006837]"
              >Lunar New Year Event</span
            >
          </div>

          <h1
            class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-[#1a1a1a] tracking-tight"
          >
            Give Your Pet An <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#D00000] to-[#F5AC27]"
              >Ang Pao</span
            >
          </h1>

          <p
            class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed"
          >
            Celebrate new beginnings with our "Lucky Green" collection. Premium treats and
            accessories for a prosperous year.
          </p>

          <div class="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              @click="router.push('/shop')"
              class="group relative px-6 py-3 sm:px-9 sm:py-4 bg-[#D00000] text-white rounded-full font-bold text-sm sm:text-base md:text-lg overflow-hidden shadow-lg shadow-red-600/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span class="relative z-10 flex items-center gap-3">
                Get Lucky Deal
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <button
              @click="router.push('/about')"
              class="px-6 py-3 sm:px-9 sm:py-4 bg-white border border-[#009200] text-[#009200] rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#009200] hover:text-white transition-all duration-300"
            >
              View Collection
            </button>
          </div>
        </div>

        <div
          class="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center"
        >
          <div class="relative z-10 w-full h-full flex items-center justify-center">
            <img
              src="/src/assets/lunar_new_year_dog.jpg"
              alt="Golden Retriever Lucky"
              class="max-h-[85%] w-auto shadow-2xl hover:scale-105 transition-transform duration-700 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border-4 sm:border-6 md:border-8 border-red-500"
            />
          </div>

          <div
            class="absolute bottom-24 -left-6 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,146,0,0.1)] border border-green-50 animate-bounce-slow hidden md:block"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#D00000]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>
              <div>
                <p class="font-bold text-[#006837] text-sm">Lucky Ang Pao</p>
                <p
                  class="text-xs bg-gradient-to-r from-[#009200] to-[#FFD700] bg-clip-text text-transparent"
                >
                  Free shipping over 50$
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ... (Categories section unchanged) ... -->

    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative">
        <!-- ... (Categories content skipped, no changes) ... -->
    </section>

    <section class="w-full px-4 md:px-8 pb-24 relative z-10">
      <div
        class="max-w-[1400px] mx-auto bg-[#004d29] rounded-[40px] overflow-hidden relative shadow-2xl"
      >
        <!-- ... (Background pattern unchanged) ... -->

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-20 items-center relative z-10">
          <div class="text-white">
             <!-- ... (Text content unchanged) ... -->
             <div
              class="inline-block bg-[#FFD700] text-[#004d29] px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6"
            >
              Fortune & Fun
            </div>
            <h2 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Prosperity <br />
              Bundles 🧧
            </h2>
            <p class="text-green-100 text-lg mb-10 max-w-md leading-relaxed">
              We've paired our best-selling green toys with lucky red treats. The perfect balance
              for your pet.
            </p>
            <button
              class="bg-white text-[#004d29] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#FFD700] transition-colors duration-300 shadow-lg"
            >
              Shop Bundles
            </button>
          </div>

          <div class="relative h-[300px] w-full flex items-center justify-center">
            <div
              class="absolute left-10 md:left-20 top-0 w-64 bg-white p-5 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 hover:z-20 transition-all duration-500 cursor-pointer border-l-4 border-[#009200]"
            >
              <div class="h-40 rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-4">
                <img :src="collarImg" class="w-full h-full object-contain" />
              </div>
              <div class="flex justify-between items-center">
                <p class="font-bold text-gray-900">Jade Collar</p>
                <span class="text-xs font-bold text-[#009200]">$24.00</span>
              </div>
            </div>

            <div
              class="absolute right-10 md:right-20 bottom-0 w-64 bg-white p-5 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 hover:z-20 transition-all duration-500 cursor-pointer border-l-4 border-[#D00000]"
            >
              <div class="h-40 rounded-xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-4">
                <img :src="chewsImg" class="w-full h-full object-contain" />
              </div>
              <div class="flex justify-between items-center">
                <p class="font-bold text-gray-900">Lucky Chews</p>
                <span class="text-xs font-bold text-[#D00000]">$12.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="lantern-container pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <!-- 🟢 UPDATED: Realistic Lantern Image -->
      <img v-for="i in 8" :key="i" :src="lanternImg" class="lantern" :style="getLanternStyle(i)" />
    </div>

    <!-- ... (Hero and Categories sections unchanged) ... -->
    <!-- I will use a multi-replace or start further down to keep file content clean, but the user requested 'lantern' change too -->

    <!-- SKIPPING HERO SECTION IN THIS REPLACEMENT BLOCK, TARGETING SECTION START BELOW -->

    <section class="max-w-[1400px] mx-auto px-6 pb-32 relative z-10">
      <div class="flex items-center gap-3 mb-12">
        <h2 class="text-4xl font-extrabold text-[#1a1a1a]">Trending Now</h2>
        <svg
          class="w-8 h-8 text-orange-500 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M13.5 3C16.5 5.5 18 8.5 18 11.5C18 14.5 15.5 17 12.5 17H11.5C8.5 17 6 14.5 6 11.5C6 10.5 6.2 9.5 6.6 8.6C4.6 10.1 3.5 12.4 3.5 15C3.5 19.1 6.9 22.5 11 22.5C15.1 22.5 18.5 19.1 18.5 15C18.5 12.7 17.5 10.6 15.8 9.2C15.8 9.2 13.5 3 13.5 3Z"
          />
          <path
            d="M12.5 6C14.5 7.5 15.5 9.5 15.5 11.5C15.5 13.5 13.5 15 11.5 15H10.5C8.5 15 7 13.5 7 11.5C7 10.5 7.2 9.5 7.6 8.6C5.6 10.1 4.5 12.4 4.5 15C4.5 19.1 7.9 22.5 12 22.5C16.1 22.5 19.5 19.1 19.5 15C19.5 12.7 18.5 10.6 16.8 9.2C16.8 9.2 14.5 3 12.5 6Z"
            fill="orange"
            opacity="0.6"
          />
        </svg>
      </div>

      <!-- 🟢 UPDATED: Dynamic Trending Products -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div v-for="n in 4" :key="n" class="h-[400px] bg-gray-100 rounded-[32px] animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in trendingProducts"
          :key="product._id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue' // 🟢 Added onMounted, ref
import { useRouter } from 'vue-router'
import api from '@/services/api' // 🟢 Import API
import ProductCard from '@/components/ProductCard.vue' // 🟢 Import ProductCard

// Images
import petImg1 from '@/assets/petImage/Rectangle 131.png'
import petImg2 from '@/assets/petImage/Rectangle 131 (1).png'
import petImg3 from '@/assets/petImage/Rectangle 131 (2).png'
import petImg4 from '@/assets/petImage/Rectangle 131 (3).png'
import petImg5 from '@/assets/petImage/Rectangle 131 (4).png'
import lanternImg from '@/assets/lantern.png'
import collarImg from '@/assets/jade_collar.png' // 🟢 Realistic Collar
import chewsImg from '@/assets/lucky_chews.png' // 🟢 Realistic Chews

export default defineComponent({
  name: 'Home',
  components: { ProductCard },
  setup() {
    const router = useRouter()
    const trendingProducts = ref<any[]>([]) // 🟢 Fixed TS Error: Typed as any[]
    const loading = ref(true)

    const petCategory = [
      { img: petImg1, name: 'Cat' },
      { img: petImg2, name: 'Dog' },
      { img: petImg3, name: 'Small pet' },
      { img: petImg4, name: 'Bird' },
      { img: petImg5, name: 'Fish' },
    ]

    const fetchTrending = async () => {
      try {
        const { data } = await api.get('/products/top');
        trendingProducts.value = data;
      } catch (error) {
        console.error("Failed to load trending products", error);
      } finally {
        loading.value = false;
      }
    }

    const goToCategory = (name: string) => {
      router.push({ name: 'shop', query: { category: name } })
    }

    // GOLD Lantern Animation Helper
    const getLanternStyle = (i: number) => {
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = 15 + Math.random() * 10
      return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }
    }

    onMounted(() => {
      fetchTrending()
    })

    return {
      petCategory,
      goToCategory,
      router,
      getLanternStyle,
      trendingProducts, // 🟢 Return data
      loading,
      lanternImg,
      collarImg,
      chewsImg
    }
  },
})
</script>

  <style scoped>
/* BACKGROUND ANIMATION: Floating Lanterns */
.lantern {
  position: absolute;
  bottom: -150px;
  width: 60px; /* Increased size */
  height: auto;
  opacity: 0.8; /* More visible */
  animation: floatUp linear infinite;
  background: transparent; /* Remove CSS color */
}

/* Remove CSS Lantern Lines */
.lantern::before { display: none; }

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(-110vh) rotate(10deg);
    opacity: 0;
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>
