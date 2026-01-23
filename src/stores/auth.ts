import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  // 🛡️ REAL WORLD STATE INITIALIZATION
  // We use a try-catch block here so the app NEVER crashes on startup
  // even if LocalStorage has corrupted data (like "undefined").
  state: () => {
    let userData = null;
    let tokenData = null;

    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      // strictly check against "undefined" string which causes crashes
      if (storedUser && storedUser !== 'undefined') {
        userData = JSON.parse(storedUser);
      }
      if (storedToken && storedToken !== 'undefined') {
        tokenData = storedToken;
      }
    } catch (error) {
      console.error("⚠️ Corrupted local storage detected. Resetting session.", error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }

    return {
      user: userData as User | null,
      token: tokenData as string | null,
      isAuthenticated: !!tokenData,
    };
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post('/auth/login', { email, password });

        // 1. Destructure user data
        const { _id, firstName, lastName, role, token } = response.data;

        // 2. Update State
        this.token = token;
        this.user = { _id, firstName, lastName, email, role, token };
        this.isAuthenticated = true;

        // 3. Persist to LocalStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(this.user));

        // 4. Redirect (Real world: Go back to where they came from, or Shop)
        router.push('/shop');

      } catch (error) {
        throw error; // Let the component display the error message
      }
    },

    async register(email: string, password: string) {
      try {
        // 1. Create Account
        await api.post('/auth/register', {
            email,
            password,
            firstName: 'Member',
            lastName: 'User'
        });

        // 2. REAL WORLD UX: Clean up the "Guest" session
        // If I register a new account, I shouldn't inherit the previous user's cart
        // unless you specifically built a "Merge Cart" feature.
        // For now, we clear it to avoid the "Why do I have checkout data?" confusion.
        localStorage.removeItem('cartItems');

        // 3. Force Login (Security Best Practice)
        // We don't auto-login after register. We make them verify credentials.
        router.push('/login');

      } catch (error) {
        throw error;
      }
    },

    logout() {
      // 1. Clear State
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // 2. Clear Storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');

      // 3. Clear Cart (Optional: Keep this if you want shared carts, remove if you want privacy)
      localStorage.removeItem('cartItems');

      // 4. Redirect
      router.push('/login');
    }
  }
});
