<template>
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div class="max-w-[1440px] mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">

            <RouterLink to="/" class="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                <img src="@/assets/project_logo.svg" alt="PetStore" class="h-10 w-auto">
            </RouterLink>

            <ul class="hidden md:flex items-center gap-10">
                <li v-for="link in links" :key="link.path" class="relative group">
                    <RouterLink
                        :to="link.path"
                        active-class="text-[#009200] font-bold"
                        class="text-gray-600 font-medium text-[15px] transition-colors duration-300 hover:text-[#009200] py-2"
                    >
                        {{ link.name }}
                    </RouterLink>
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009200] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
                </li>
            </ul>

            <div class="flex items-center gap-5">

                <div class="relative flex items-center">
                    <div
                        class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        :class="isSearchOpen ? 'w-48 sm:w-64 opacity-100 mr-3' : 'w-0 opacity-0'"
                    >
                        <input
                            ref="searchInput"
                            type="text"
                            v-model="searchQuery"
                            @keyup.enter="handleSearch"
                            placeholder="Search essentials..."
                            class="w-full h-10 pl-4 pr-4 bg-gray-100/80 border border-transparent rounded-full text-sm outline-none focus:bg-white focus:border-[#009200] focus:ring-4 focus:ring-green-100/50 transition-all placeholder:text-gray-400 text-gray-700"
                        >
                    </div>

                    <button
                        @click="toggleSearch"
                        class="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-green-50 hover:text-[#009200] transition-all duration-300 active:scale-90"
                        title="Search"
                    >
                        <svg v-if="!isSearchOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div class="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">

                    <RouterLink to="/wishlist" class="relative group p-2 text-gray-700 hover:text-[#009200] transition-colors" title="My Wishlist">
                        <svg class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </RouterLink>

                    <RouterLink to="/cart" class="relative group p-2 text-gray-700 hover:text-[#009200] transition-colors" title="Shopping Cart">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            <transition name="bounce">
                                <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-[#E63946] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                                    {{ cartStore.totalItems }}
                                </span>
                            </transition>
                        </div>
                    </RouterLink>

                    <RouterLink to="/profile" class="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-[#009200] hover:text-[#009200] hover:bg-green-50 transition-all duration-300" title="My Profile">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </RouterLink>
                </div>

                <div v-else class="flex items-center gap-3">
                    <RouterLink to="/login" class="hidden sm:block text-sm font-bold text-gray-600 hover:text-[#009200] transition-colors">
                        Log In
                    </RouterLink>
                    <RouterLink to="/register" class="px-5 py-2.5 bg-[#009200] text-white text-sm font-bold rounded-full shadow-lg shadow-green-200 hover:bg-[#007a00] hover:scale-105 transition-all duration-300">
                        Sign Up
                    </RouterLink>
                </div>

            </div>
        </div>
    </nav>

    <div class="h-[80px]"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth'; // 1. Import Auth Store
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Navigation',
    setup() {
        const cartStore = useCartStore();
        const authStore = useAuthStore(); // 2. Initialize Auth Store
        const router = useRouter();

        const searchQuery = ref('');
        const isSearchOpen = ref(false);
        const searchInput = ref<HTMLInputElement | null>(null);

        const links = [
            { name: 'Home', path: '/home' },
            { name: 'Shop', path: '/shop' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
        ];

        const toggleSearch = () => {
            isSearchOpen.value = !isSearchOpen.value;
            if (isSearchOpen.value) {
                setTimeout(() => {
                    searchInput.value?.focus();
                }, 100);
            }
        };

        const handleSearch = () => {
            if (searchQuery.value.trim()) {
                router.push({ name: 'shop', query: { q: searchQuery.value } });
                isSearchOpen.value = false;
            }
        };

        return {
            cartStore,
            authStore, // 3. Return authStore so template can check isAuthenticated
            searchQuery,
            isSearchOpen,
            searchInput,
            handleSearch,
            toggleSearch,
            links
        };
    }
});
</script>

<style scoped>
/* Bounce Animation for Cart Badge */
.bounce-enter-active { animation: bounce-in 0.5s; }
.bounce-leave-active { animation: bounce-in 0.5s reverse; }
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
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
        font-family:'Poppins', sans-serif;
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
        color: #008C00;
    }

    .nav_items a.router-link-active {
        color: #008C00;
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
        fill: #008C00;
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
        border: 1px solid #D9D9D9;
        border-radius: 24px;
        padding-left: 40px;
        opacity: 0;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
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
