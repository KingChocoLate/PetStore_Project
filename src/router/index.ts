import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'  
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import ProductCard from '@/components/ProductCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',
      redirect: '/home'
    },
    // Authentication routes
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfile.vue')
    },
      path: '/',
      component: CustomerLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/shop',
          name: 'shop',
          component: Shop
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact
        },
      ]
    },

    

    // Admin routes
    {path: '/admin',
      redirect: '/admin/dashboard'
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/Admin/Dashboard.vue')
        }, 
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/Admin/Products.vue')
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/Admin/Orders.vue')
        }, 
        {
          path: 'customers',
          name: 'admin-customers',
          component: () => import('@/views/Admin/Customers.vue')
        },
        {
          path: 'promotions',
          name: 'admin-promotions',
          component: () => import('@/views/Admin/Promotions.vue')
        }
      ]
    }
  ],
})

export default router
