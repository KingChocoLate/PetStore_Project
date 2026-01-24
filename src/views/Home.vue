<template>
  <div class="home-wrapper font-poppins overflow-x-hidden bg-[#F9FDF9]">
    <div class="lantern-container pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div v-for="i in 8" :key="i" class="lantern" :style="getLanternStyle(i)"></div>
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
                  Free Delivery on all order over 50$
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative">
      <div class="flex justify-between items-end mb-6 sm:mb-8 md:mb-12">
        <h2 class="text-xl md:text-3xl font-extrabold text-[#1a1a1a]">
          Shop by Category
        </h2>
        <button
          @click="router.push('/shop')"
          class="text-[#009200] font-bold hover:underline flex items-center gap-2 group"
        >
          View All
          <svg
            class="group-hover:translate-x-1 transition-transform"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div
          v-for="(cat, i) in petCategory"
          :key="i"
          class="group relative flex flex-col items-center gap-4 cursor-pointer"
          @click="goToCategory(cat.name)"
        >
          <div class="w-70 h-60 p-2 transition-all duration-300">
            <div class="w-full h-full overflow-hidden relative">
              <img
                :src="cat.img"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          <h3 class="text-lg font-bold text-gray-800 transition-colors">{{ cat.name }}</h3>
        </div>
      </div>
    </section>

    <section class="w-full px-4 md:px-8 pb-24 relative z-10">
      <div
        class="max-w-[1400px] mx-auto bg-[#004d29] rounded-[40px] overflow-hidden relative shadow-2xl"
      >
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image: radial-gradient(#ffd700 1.5px, transparent 1.5px);
            background-size: 30px 30px;
          "
        ></div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-20 items-center relative z-10">
          <div class="text-white">
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
              <div class="h-40 rounded-xl overflow-hidden mb-4 bg-gray-50">
                <img :src="petCategory[1]?.img" class="w-full h-full object-cover" />
              </div>
              <div class="flex justify-between items-center">
                <p class="font-bold text-gray-900">Jade Collar</p>
                <span class="text-xs font-bold text-[#009200]">$24.00</span>
              </div>
            </div>

            <div
              class="absolute right-10 md:right-20 bottom-0 w-64 bg-white p-5 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 hover:z-20 transition-all duration-500 cursor-pointer border-l-4 border-[#D00000]"
            >
              <div class="h-40 rounded-xl overflow-hidden mb-4 bg-gray-50">
                <img :src="petCategory[0]?.img" class="w-full h-full object-cover" />
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

    <section class="max-w-[1400px] mx-auto px-6 pb-32 relative z-10">
      <div class="flex justify-between items-end mb-12">
        <h2 class="text-4xl font-extrabold text-[#1a1a1a]">Trending Now 🔥</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div
          v-for="i in 4"
          :key="i"
          class="group bg-white rounded-[32px] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
        >
          <div
            class="relative h-[280px] bg-[#f8f8f8] rounded-[24px] mb-5 overflow-hidden flex items-center justify-center"
          >
            <button
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#009200] hover:scale-110 transition-all shadow-sm z-20"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
            </button>

            <span
              class="absolute top-4 left-4 bg-[#FFD700] text-[#004d29] text-[10px] font-bold px-3 py-1 rounded-full z-20"
              >LUCKY FIND</span
            >

            <img
              src="https://images.unsplash.com/photo-1585499193151-0f51d6d3b698?q=80&w=600"
              class="h-[75%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div class="px-2 pb-2">
            <h3
              class="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#009200] transition-colors"
            >
              Royal Canin Premium
            </h3>
            <p class="text-sm text-gray-400 mb-4">Dog Food • 4kg</p>

            <div class="flex items-center justify-between">
              <span class="text-2xl font-extrabold text-[#1a1a1a]">$45.99</span>
              <button
                class="w-12 h-12 bg-[#009200] text-white rounded-2xl flex items-center justify-center hover:bg-[#007a00] transition-colors shadow-lg shadow-green-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// Images
import petImg1 from '@/assets/petImage/Rectangle 131.png'
import petImg2 from '@/assets/petImage/Rectangle 131 (1).png'
import petImg3 from '@/assets/petImage/Rectangle 131 (2).png'
import petImg4 from '@/assets/petImage/Rectangle 131 (3).png'
import petImg5 from '@/assets/petImage/Rectangle 131 (4).png'

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()

    const petCategory = [
      { img: petImg1, name: 'Cat' },
      { img: petImg2, name: 'Dog' },
      { img: petImg3, name: 'Small pet' },
      { img: petImg4, name: 'Bird' },
      { img: petImg5, name: 'Fish' },
    ]

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

    return { petCategory, goToCategory, router, getLanternStyle }
  },
})
</script>

<style scoped>
/* BACKGROUND ANIMATION: Floating Lanterns */
.lantern {
  position: absolute;
  bottom: -100px;
  width: 30px;
  height: 45px;
  background: #ffd700; /* GOLD */
  border-radius: 8px;
  opacity: 0.15;
  animation: floatUp linear infinite;
}

/* Lantern Lines */
.lantern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  width: 60%;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.2;
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
