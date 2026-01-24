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
        <div class="w-full">
          <h2 class="text-2xl font-bold mb-3 text-center text-black">New Password</h2>
          <p class="text-center text-gray-500 text-sm mb-7 leading-relaxed">
            Please create a strong password for your account.
          </p>

          <form @submit.prevent="handlePasswordReset">
            <div class="mb-6">
              <label for="password" class="block font-bold mb-2 text-[0.95rem] text-black"
                >New Password</label
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
                  placeholder="Create new password"
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

            <div class="mb-6">
              <label for="confirmPassword" class="block font-bold mb-2 text-[0.95rem] text-black"
                >Confirm Password</label
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
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  required
                  placeholder="Repeat new password"
                  class="flex-grow outline-none text-[0.95rem] text-gray-700 w-full bg-transparent"
                />
                <span
                  class="cursor-pointer flex items-center text-gray-400 hover:text-gray-600"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <svg
                    v-if="!confirmPasswordVisible"
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

            <button
              type="submit"
              class="w-full py-4 bg-[#009200] text-white rounded-[10px] text-lg font-bold cursor-pointer transition shadow-md hover:bg-[#007a00] hover:-translate-y-[1px] disabled:bg-gray-300 disabled:cursor-not-allowed mt-2"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

import sloganImage from '../assets/photos/texts.png'
import birdhouseImage from '../assets/photos/birdhouse.png'
import pawsImage from '../assets/photos/paws.png'
import petsImage from '../assets/photos/pets.png'

export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const password = ref('')
    const confirmPassword = ref('')
    const token = ref('')

    const passwordVisible = ref(false)
    const confirmPasswordVisible = ref(false)
    const isLoading = ref(false)
    const notification = ref({ visible: false, message: '', type: 'success' })

    onMounted(() => {
      // 1. Grab token from URL (?token=xyz)
      token.value = route.query.token as string
      if (!token.value) {
        showNotification('Invalid or missing reset token.', 'error')
      }
    })

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value
    }
    const toggleConfirmPasswordVisibility = () => {
      confirmPasswordVisible.value = !confirmPasswordVisible.value
    }

    const showNotification = (message: string, type: 'success' | 'error') => {
      notification.value = { visible: true, message, type }
      setTimeout(() => {
        notification.value.visible = false
      }, 4000)
    }

    const handlePasswordReset = async () => {
      if (password.value !== confirmPassword.value) {
        showNotification('Passwords do not match.', 'error')
        return
      }
      if (!token.value) {
        showNotification('Missing reset token.', 'error')
        return
      }

      isLoading.value = true
      try {
        await api.post('/auth/reset-password', {
          token: token.value,
          newPassword: password.value,
        })

        showNotification('Password updated! Redirecting...', 'success')
        setTimeout(() => router.push('/login'), 2000)
      } catch (error: any) {
        showNotification(error.response?.data?.message || 'Failed to reset password.', 'error')
      } finally {
        isLoading.value = false
      }
    }

    return {
      password,
      confirmPassword,
      passwordVisible,
      confirmPasswordVisible,
      isLoading,
      notification,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      handlePasswordReset,
      sloganImage,
      birdhouseImage,
      pawsImage,
      petsImage,
    }
  },
})
</script>
