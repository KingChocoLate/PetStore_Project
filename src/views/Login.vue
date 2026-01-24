<template>
  <div
    class="min-h-auto w-full flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8"
  >
    <transition name="fade">
      <div
        v-if="notification.visible"
        :class="[
          'fixed top-5 left-1/2 -translate-x-1/2 bg-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 font-semibold border-l-4',
          notification.type === 'success'
            ? 'border-green-600 text-green-700'
            : 'border-red-600 text-red-700',
        ]"
      >
        <span class="flex items-center">
          <svg
            v-if="notification.type === 'success'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </span>
        <span>{{ notification.message }}</span>
      </div>
    </transition>

    <div
      class="relative w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[24px] overflow-hidden bg-white"
    >
      <router-link
        to="/"
        class="absolute top-4 right-4 text-gray-400 hover:text-black"
        aria-label="Close"
      >
        <svg
          width="24"
          height="24"
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
      </router-link>
      <div class="flex flex-col justify-center items-center w-full px-6 sm:px-10 lg:px-14 py-10">
        <div class="w-full">
          <h2 class="text-2xl font-bold mb-6 text-center text-black">Login</h2>

          <form @submit.prevent="handleLogin">
            <div class="mb-5">
              <label for="email" class="block font-bold mb-2 text-[0.95rem] text-black"
                >Email</label
              >
              <div
                class="flex items-center border border-gray-300 rounded-[10px] h-[50px] px-4 transition focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-600 bg-white"
              >
                <span class="text-gray-500 flex items-center mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  class="flex-grow outline-none text-[0.95rem] text-gray-700 w-full bg-transparent"
                />
              </div>
            </div>

            <div class="mb-5">
              <label for="password" class="block font-bold mb-2 text-[0.95rem] text-black"
                >Password</label
              >
              <div
                class="flex items-center border border-gray-300 rounded-[10px] h-[50px] px-4 transition focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-600 bg-white"
              >
                <span class="text-gray-500 flex items-center mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="password"
                  v-model="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  placeholder="Enter password"
                  class="flex-grow outline-none text-[0.95rem] text-gray-700 w-full bg-transparent"
                />
                <span
                  class="cursor-pointer flex items-center text-gray-400 hover:text-gray-600"
                  @click="togglePasswordVisibility"
                >
                  <svg
                    v-if="!passwordVisible"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg
                    v-else
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    ></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </span>
              </div>
            </div>

            <div class="text-right -mt-3 mb-6">
              <router-link
                to="/forgot-password"
                class="text-[#009200] text-sm font-bold hover:underline"
                >Forgot Password?</router-link
              >
            </div>

            <button
              type="submit"
              class="w-full py-4 bg-[#009200] text-white rounded-[10px] text-lg font-bold cursor-pointer transition shadow-md hover:bg-[#007a00] hover:-translate-y-[1px] disabled:bg-gray-300 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="flex items-center text-center my-5 text-xs text-gray-500 font-semibold">
            <hr class="flex-grow border-t border-gray-300" />
            <span class="px-4">Or Continue With</span>
            <hr class="flex-grow border-t border-gray-300" />
          </div>

          <div class="flex justify-center gap-4 sm:gap-5 mb-8 flex-wrap">
            <button
              type="button"
              class="w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] rounded-full cursor-pointer flex items-center justify-center border border-gray-100 bg-white transition shadow-sm hover:-translate-y-[2px] hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center border border-gray-100 bg-white transition shadow-sm hover:-translate-y-[2px] hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center border border-gray-100 bg-white transition shadow-sm hover:-translate-y-[2px] hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.22-1.35 1.62.25 2.87 1.35 3.61 2.39-2.92 1.62-2.39 5.76 .62 6.94-.65 1.76-1.57 3.32-3.53 4.25zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25 .29 2.58-2.34 4.5-3.74 4.25z"
                />
              </svg>
            </button>
          </div>

          <div class="text-center text-sm text-black font-semibold">
            Don't have an account?
            <router-link to="/register" class="text-[#009200] font-bold ml-1 hover:underline"
              >Sign Up here</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Images (Restored Original)
import sloganImage from '../assets/photos/texts.png'
import birdhouseImage from '../assets/photos/birdhouse.png'
import pawsImage from '../assets/photos/paws.png'
import petsImage from '../assets/photos/pets.png'

export default defineComponent({
  name: 'TheLogin',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const passwordVisible = ref(false)
    const isLoading = ref(false)
    const notification = ref({ visible: false, message: '', type: 'success' })

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value
    }

    const showNotification = (message: string, type: 'success' | 'error') => {
      notification.value = { visible: true, message, type }
      setTimeout(() => {
        notification.value.visible = false
      }, 3000)
    }

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        showNotification('Please fill in both email and password.', 'error')
        return
      }
      isLoading.value = true
      try {
        // 1. Wait for login to complete
        await authStore.login(email.value, password.value);
        showNotification('Login Successful!', 'success');

        // 2. Get User Role safely (Check Store OR LocalStorage)
        // This ensures we get the latest data immediately
        let user = authStore.user;

        if (!user) {
           const stored = localStorage.getItem('userInfo');
           if (stored) user = JSON.parse(stored);
        }

        console.log("LOGIN CHECK:", user); // Check Console F12 if issues persist

        // 3. Redirect based on Role
        setTimeout(() => {
          if (user && user.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/shop');
          }
        }, 500);

      } catch (error: any) {
        showNotification(error.response?.data?.message || 'Login failed.', 'error')
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      passwordVisible,
      isLoading,
      notification,
      togglePasswordVisibility,
      handleLogin,
      sloganImage,
      birdhouseImage,
      pawsImage,
      petsImage,
    }
  },
})
</script>
