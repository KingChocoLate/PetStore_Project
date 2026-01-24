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
      class="relative w-full max-w-md sm:max-w-lg shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[24px] overflow-hidden bg-white"
    >
      <div
        class="relative flex flex-col justify-center items-center w-full px-6 sm:px-10 lg:px-12 py-10 bg-white"
      >
        <router-link
          to="/login"
          class="absolute top-6 left-6 text-gray-400 hover:text-black"
          aria-label="Back to Login"
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </router-link>

        <div class="w-full max-w-[420px]">
          <h2 class="text-2xl font-bold mb-3 text-center text-black">Reset Password</h2>
          <p class="text-center text-gray-500 text-sm mb-7 leading-relaxed">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form @submit.prevent="handleReset">
            <div class="mb-6">
              <label for="email" class="block font-bold mb-2 text-[0.95rem] text-black"
                >Email Address</label
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
                  placeholder="Enter your registered email"
                  class="flex-grow outline-none text-[0.95rem] text-gray-700 w-full bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-4 bg-[#009200] text-white rounded-[10px] text-lg font-bold cursor-pointer transition shadow-md hover:bg-[#007a00] hover:-translate-y-[1px] disabled:bg-gray-300 disabled:cursor-not-allowed mt-2"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Sending Link...' : 'Send Reset Link' }}
            </button>
          </form>

          <div class="text-center text-sm text-black font-semibold mt-8">
            Remember your password?
            <router-link to="/login" class="text-[#009200] font-bold ml-1 hover:underline"
              >Back to Login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '@/services/api'

// Using the exact same assets as Login.vue to ensure they load
import sloganImage from '../assets/photos/texts.png'
import birdhouseImage from '../assets/photos/birdhouse.png'
import pawsImage from '../assets/photos/paws.png'
import petsImage from '../assets/photos/pets.png'

export default defineComponent({
  name: 'ForgotPassword',
  setup() {
    const email = ref('')
    const isLoading = ref(false)
    const notification = ref({ visible: false, message: '', type: 'success' })

    const showNotification = (message: string, type: 'success' | 'error') => {
      notification.value = { visible: true, message, type }
      setTimeout(() => {
        notification.value.visible = false
      }, 4000)
    }

    const handleReset = async () => {
      if (!email.value) {
        showNotification('Please enter your email address.', 'error')
        return
      }

      isLoading.value = true
      try {
        // NOTE: Ensure your backend has this route: POST /api/auth/forgot-password
        await api.post('/auth/forgot-password', { email: email.value })

        showNotification('If an account exists, a reset link has been sent!', 'success')
        email.value = ''
      } catch (error: any) {
        // If 404, it means the backend route doesn't exist yet.
        const msg =
          error.response?.status === 404
            ? 'Server Error: Route not found (404)'
            : error.response?.data?.message || 'Failed to send reset link.'

        showNotification(msg, 'error')
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      isLoading,
      notification,
      handleReset,
      sloganImage,
      birdhouseImage,
      pawsImage,
      petsImage,
    }
  },
})
</script>
