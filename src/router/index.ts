import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// ❌ DELETE OR COMMENT OUT THIS LINE:
// import CustomerLayout from '@/layouts/CustomerLayout.vue'

// Views
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'
import Wishlist from '@/views/Wishlist.vue'
import Checkout from '@/views/Checkout.vue'
import OrderHistory from '@/views/OrderHistory.vue'
import UserProfile from '@/views/UserProfile.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. Root Redirect
    {
      path: '/',
      redirect: '/home'
    },

    // 2. Auth Pages
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/reset-password', name: 'reset-password', component: ResetPassword },

    // 3. Main Application Routes
    {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/',
      // ✅ CHANGE THIS LINE (Lazy Load to fix the crash):
      component: () => import('@/layouts/CustomerLayout.vue'),
      children: [
        { path: '/home', name: 'home', component: Home },
        { path: '/shop', name: 'shop', component: Shop },
        { path: '/about', name: 'about', component: About },
        { path: '/contact', name: 'contact', component: Contact },
        { path: '/productDetail/:id', name: 'product-detail', component: ProductDetail },

        // --- PROTECTED ROUTES ---
        {
          path: '/profile',
          name: 'profile',
          component: UserProfile,
          meta: { requiresAuth: true }
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: { requiresAuth: true }
        },
        {
          path: '/wishlist',
          name: 'wishlist',
          component: Wishlist,
          meta: { requiresAuth: true }
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: Checkout,
          meta: { requiresAuth: true }
        },
        {
          path: '/order-history',
          name: 'order-history',
          component: OrderHistory,
          meta: { requiresAuth: true }
        }
      ]
    },
  ],
})

// 4. Global Guard Logic
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const loggedIn = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  }
  else if ((to.name === 'login' || to.name === 'register' || to.name === 'forgot-password') && loggedIn) {
    next('/profile');
  }
  else {
    next();
  }
});

export default router
