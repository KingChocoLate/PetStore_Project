<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100/50"
  >
    <div
      class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-[60px] sm:h-[70px] md:h-[80px] flex items-center justify-between"
    >
      <RouterLink
        to="/"
        class="flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
      >
        <img src="@/assets/project_logo.svg" alt="PetStore" class="h-8 sm:h-9 md:h-10 w-auto" />
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden lg:flex items-center gap-6 xl:gap-10">
        <li v-for="link in links" :key="link.path" class="relative group">
          <RouterLink
            :to="link.path"
            active-class="text-[#009200] font-bold"
            class="text-gray-600 font-medium text-sm xl:text-[15px] transition-colors duration-300 hover:text-[#009200] py-2"
          >
            {{ link.name }}
          </RouterLink>
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009200] transition-all duration-300 ease-out group-hover:w-full rounded-full"
          ></span>
        </li>
      </ul>

      <div class="flex items-center gap-2 sm:gap-3 md:gap-5">
        <!-- Desktop Search -->
        <div class="relative hidden sm:flex items-center">
          <div
            class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            :class="isSearchOpen ? 'w-48 md:w-64 opacity-100 mr-3' : 'w-0 opacity-0'"
          >
            <input
              ref="searchInput"
              type="text"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Search..."
              class="w-full h-9 md:h-10 pl-4 pr-4 bg-gray-100/80 border border-transparent rounded-full text-sm outline-none focus:bg-white focus:border-[#009200] focus:ring-4 focus:ring-green-100/50 transition-all placeholder:text-gray-400 text-gray-700"
            />
          </div>

          <button
            @click="toggleSearch"
            class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-green-50 hover:text-[#009200] transition-all duration-300 active:scale-90"
            title="Search"
          >
            <svg
              v-if="!isSearchOpen"
              class="w-5.5 h-5.5 md:w-6 md:h-6 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <svg
              v-else
              class="w-5.5 h-5.5 md:w-6 md:h-6 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Mobile Search Button -->
        <button
          @click="toggleMobileSearch"
          class="sm:hidden w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-green-50 hover:text-[#009200] transition-all duration-300 active:scale-90 active:rotate-90"
          title="Search"
        >
          <svg
            class="w-5 h-5 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <div class="h-4 sm:h-5 md:h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <div v-if="authStore.isAuthenticated" class="flex items-center gap-2 sm:gap-3 md:gap-4">
          <RouterLink
            to="/wishlist"
            class="relative group p-1.5 sm:p-2 text-gray-700 hover:text-[#009200] transition-colors"
            title="My Wishlist"
          >
            <svg
              class="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </RouterLink>

          <RouterLink
            to="/cart"
            class="relative group p-1.5 sm:p-2 text-gray-700 hover:text-[#009200] transition-colors"
            title="Shopping Cart"
          >
            <div class="relative">
              <svg
                class="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <transition name="bounce">
                <span
                  v-if="cartStore.totalItems > 0"
                  class="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 bg-[#E63946] text-white text-[9px] sm:text-[10px] font-bold h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center ring-1 sm:ring-2 ring-white shadow-sm"
                >
                  {{ cartStore.totalItems }}
                </span>
              </transition>
            </div>
          </RouterLink>

          <RouterLink
            to="/profile"
            class="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-200 text-gray-700 hover:border-[#009200] hover:text-[#009200] hover:bg-green-50 transition-all duration-300"
            title="My Profile"
          >
            <svg
              class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </RouterLink>

          <!-- Mobile Menu Button (authenticated) -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-[#009200] transition-colors"
            title="Menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              v-else
              class="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div v-else class="flex items-center gap-2 sm:gap-3">
          <RouterLink
            to="/login"
            class="hidden sm:block text-xs sm:text-sm font-bold text-gray-600 hover:text-[#009200] transition-colors"
          >
            Log In
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-[#009200] text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-green-200 hover:bg-[#007a00] hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </RouterLink>

          <!-- Mobile Menu Button (not authenticated) -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-[#009200] transition-colors"
            title="Menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              v-else
              class="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg"
      >
        <div class="max-w-[1440px] mx-auto px-4 py-4 space-y-1">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            @click="closeMobileMenu"
            active-class="text-[#009200] bg-green-50 font-bold"
            class="block px-4 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-[#009200] transition-colors"
          >
            {{ link.name }}
          </RouterLink>

          <!-- Mobile Profile Link (when authenticated) -->
          <RouterLink
            v-if="authStore.isAuthenticated"
            to="/profile"
            @click="closeMobileMenu"
            class="sm:hidden block px-4 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-[#009200] transition-colors"
          >
            My Profile
          </RouterLink>

          <!-- Mobile Login (when not authenticated) -->
          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            @click="closeMobileMenu"
            class="sm:hidden block px-4 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-[#009200] transition-colors"
          >
            Log In
          </RouterLink>
        </div>
      </div>
    </transition>
  </nav>

  <div class="h-[60px] sm:h-[70px] md:h-[80px]"></div>

  <!-- Mobile Search Overlay -->
  <transition name="search-overlay">
    <div
      v-if="isMobileSearchOpen"
      class="sm:hidden fixed inset-0 z-50 bg-white"
      @click.self="closeMobileSearch"
    >
      <div class="h-full flex flex-col">
        <!-- Search Header -->
        <div class="flex items-center gap-4 px-4 py-4 border-b">
          <button
            @click="closeMobileSearch"
            class="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-90 transition-all"
            title="Close"
          >
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="flex-1 relative">
            <input
              ref="mobileSearchInput"
              type="text"
              v-model="searchQuery"
              @keyup.enter="handleMobileSearch"
              placeholder="Search for products..."
              class="w-full h-12 pl-12 pr-4 bg-gray-100 border border-transparent rounded-2xl text-base outline-none focus:bg-white focus:border-[#009200] focus:ring-4 focus:ring-green-100/50 transition-all placeholder:text-gray-400 text-gray-700"
            />
            <svg
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 active:scale-90 transition-all"
            title="Clear"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Search Content Area -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="!searchQuery" class="text-center text-gray-400 mt-12">
            <svg
              class="w-16 h-16 mx-auto mb-4 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p class="text-lg font-medium">Search for products</p>
            <p class="text-sm mt-2">Start typing to find what you're looking for</p>
          </div>
          
          <div v-else class="space-y-2">
            <p class="text-sm text-gray-500 mb-4">Searching for "{{ searchQuery }}"</p>
            <!-- Search results would go here -->
          </div>
        </div>

        <!-- Search Action Button -->
        <div class="p-4 border-t">
          <button
            @click="handleMobileSearch"
            :disabled="!searchQuery"
            class="w-full py-3.5 bg-[#009200] text-white text-base font-bold rounded-2xl shadow-lg hover:bg-[#007a00] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#009200]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth' // 1. Import Auth Store
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Navigation',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore() // 2. Initialize Auth Store
    const router = useRouter()
    const route = useRoute()

    const searchQuery = ref('')
    const isSearchOpen = ref(false)
    const isMobileMenuOpen = ref(false)
    const isMobileSearchOpen = ref(false)
    const searchInput = ref<HTMLInputElement | null>(null)
    const mobileSearchInput = ref<HTMLInputElement | null>(null)

    const links = [
      { name: 'Home', path: '/home' },
      { name: 'Shop', path: '/shop' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ]

    // Debounce Helper
    const debounce = (fn: (...args: any[]) => void, delay: number) => {
      let timeoutId: ReturnType<typeof setTimeout>
      return (...args: any[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
      }
    }

    // Real-Time Search Logic
    const performRealTimeSearch = debounce((query: string) => {
      // ONLY update if we are already on the Shop page
      if (route.name === 'shop') {
        router.replace({ name: 'shop', query: { ...route.query, q: query } })
      }
    }, 300)

    watch(searchQuery, (newVal) => {
      performRealTimeSearch(newVal)
    })

    const toggleSearch = () => {
      isSearchOpen.value = !isSearchOpen.value
      if (isSearchOpen.value) {
        setTimeout(() => {
          searchInput.value?.focus()
        }, 100)
      }
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const handleSearch = () => {
      // Triggered by ENTER key (works everywhere)
      if (searchQuery.value.trim()) {
        router.push({ name: 'shop', query: { q: searchQuery.value } })
        isSearchOpen.value = false
      }
    }

    const toggleMobileSearch = () => {
      isMobileSearchOpen.value = true
      setTimeout(() => {
        mobileSearchInput.value?.focus()
      }, 100)
    }

    const closeMobileSearch = () => {
      isMobileSearchOpen.value = false
    }

    const handleMobileSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'shop', query: { q: searchQuery.value } })
        closeMobileSearch()
        searchQuery.value = ''
      }
    }

    return {
      cartStore,
      authStore, // 3. Return authStore so template can check isAuthenticated
      searchQuery,
      isSearchOpen,
      isMobileMenuOpen,
      isMobileSearchOpen,
      searchInput,
      mobileSearchInput,
      handleSearch,
      toggleSearch,
      toggleMobileMenu,
      closeMobileMenu,
      toggleMobileSearch,
      closeMobileSearch,
      handleMobileSearch,
      links,
    }
  },
})
</script>

<style scoped>
/* Bounce Animation for Cart Badge */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
/* ... YOUR ORIGINAL STYLES REMAIN UNCHANGED ... */
.whole_nav {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
  background-color: white; /* Added for safety so it's not transparent */
}

.nav_links {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.nav_items {
  list-style: none;
  display: flex;
  gap: 35px;
  padding: 0;
  margin: 0;
}

.nav_items a {
  text-decoration: none;
  color: #000000;
}

.nav_items a:hover {
  color: #008c00;
}

.nav_items a.router-link-active {
  color: #008c00;
}

.action_icons {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* Added 'group' to handle hover on SVG properly */
.action_icons svg {
  fill: #000000;
  transition: fill 0.3s ease;
}

.action_icons a:hover svg {
  fill: #008c00;
}

.searchWrapper {
  height: 36px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.Search {
  position: absolute;
  z-index: 10;
  background: url(@/assets/search.svg) no-repeat 10px center;
  background-color: white;
  right: -1px;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  transform-origin: right center;
  width: 230px;
  height: 42px;
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  padding-left: 40px;
  opacity: 0;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
  color: #000000;
}

.searchWrapper:hover .Search {
  transform: translateY(-50%) scaleX(1);
  opacity: 1;
}

.searchWrapper svg {
  position: relative;
  z-index: 0;
}
</style>
