import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
import ResetPassword from '../views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. Root Redirect
    {
      path: '/',
      redirect: '/home',
    },

    // 2. Auth Pages with AuthLayout
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        { path: 'register', name: 'register', component: Register },
        { path: 'login', name: 'login', component: Login },
        { path: 'forgot-password', name: 'forgot-password', component: ForgotPassword },
        { path: 'reset-password', name: 'reset-password', component: ResetPassword },
      ],
    },

    // 3. Main Application Routes (Customer)
    {
      path: '/',
      component: () => import('@/layouts/CustomerLayout.vue'),
      children: [
        { path: 'home', name: 'home', component: Home },
        { path: 'shop', name: 'shop', component: Shop },
        { path: 'about', name: 'about', component: About },
        { path: 'contact', name: 'contact', component: Contact },
        { path: 'product-detail/:id', name: 'product-detail', component: ProductDetail },
        { path: 'faqs', name: 'faqs', component: () => import('@/views/FAQs.vue') },
        { path: 'privacy-policy', name: 'privacy-policy', component: () => import('@/views/PrivacyPolicy.vue') },
        { path: 'terms-conditions', name: 'terms-conditions', component: () => import('@/views/TermsConditions.vue') },

        // --- PROTECTED ROUTES ---
        { path: 'profile', name: 'profile', component: UserProfile, meta: { requiresAuth: true } },
        { path: 'cart', name: 'cart', component: Cart, meta: { requiresAuth: true } },
        { path: 'wishlist', name: 'wishlist', component: Wishlist, meta: { requiresAuth: true } },
        { path: 'checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true } },
        { path: 'order-history', name: 'order-history', component: OrderHistory, meta: { requiresAuth: true } }
      ]
    },

    // 4. ADMIN ROUTES (Secured)
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/Admin/Dashboard.vue')
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/Admin/Products.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/Admin/Orders.vue')
        },
        {
          path: 'customers',
          name: 'admin-customers',
          component: () => import('@/views/Admin/Customers.vue'),
        },
        {
          path: 'promotions',
          name: 'admin-promotions',
          component: () => import('@/views/Admin/Promotions.vue'),
        },
      ],
    },

    // Catch-all for 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
  ],
})

// 5. Global Guard Logic
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const loggedIn = authStore.isAuthenticated;
  const user = authStore.user;

  // 1. Check for Admin Access
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!loggedIn) {
      next('/login');
    } else if (user && user.role !== 'admin') {
      // Logged in but NOT admin -> Go Home
      next('/');
    } else {
      // Is Admin -> Proceed
      next();
    }
  }
  // 2. Check for Standard Auth
  else if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  }
  // 3. Prevent Logged-in users from seeing Login/Register
  else if ((to.name === 'login' || to.name === 'register' || to.name === 'forgot-password') && loggedIn) {
    // 👇 UPDATED REDIRECT LOGIC 👇
    if (user && user.role === 'admin') {
      next('/admin/dashboard');
    } else {
      next('/profile'); // or '/shop'
    }
    // 👆 END UPDATE 👆
  }
  else {
    next();
  }
});

export default router
