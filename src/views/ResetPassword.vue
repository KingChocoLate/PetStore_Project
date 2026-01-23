<template>
  <div class="reset-container">

    <transition name="fade">
      <div v-if="notification.visible" :class="['toast-notification', notification.type]">
        <span class="toast-icon">
          <svg v-if="notification.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </span>
        <span class="toast-message">{{ notification.message }}</span>
      </div>
    </transition>

    <div class="card-wrapper">

      <div class="theme-banner">
        <div class="slogan-content">
          <img :src="sloganImage" alt="Where Pets Are Family" class="slogan-img" />

          <div class="visual-elements">
            <img :src="birdhouseImage" alt="Birdhouse" class="birdhouse-img" />
            <img :src="pawsImage" alt="Paws" class="paws-img" />
            <img :src="petsImage" alt="Pets" class="pets-img" />
          </div>
        </div>
      </div>

      <div class="form-area">
        <div class="form-content">
          <h2>New Password</h2>
          <p class="subtitle">Please create a strong password for your account.</p>

          <form @submit.prevent="handlePasswordReset">

            <div class="input-group">
              <label for="password">New Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input
                  id="password"
                  v-model="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  placeholder="Create new password"
                />
                <span class="view-icon" @click="togglePasswordVisibility">
                  <svg v-if="!passwordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </span>
              </div>
            </div>

            <div class="input-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  required
                  placeholder="Repeat new password"
                />
                <span class="view-icon" @click="toggleConfirmPasswordVisibility">
                  <svg v-if="!confirmPasswordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </span>
              </div>
            </div>

            <button type="submit" class="action-button" :disabled="isLoading">
              {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

import sloganImage from '../assets/photos/texts.png';
import birdhouseImage from '../assets/photos/birdhouse.png';
import pawsImage from '../assets/photos/paws.png';
import petsImage from '../assets/photos/pets.png';

export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const password = ref('');
    const confirmPassword = ref('');
    const token = ref('');

    const passwordVisible = ref(false);
    const confirmPasswordVisible = ref(false);
    const isLoading = ref(false);
    const notification = ref({ visible: false, message: '', type: 'success' });

    onMounted(() => {
      // 1. Grab token from URL (?token=xyz)
      token.value = route.query.token as string;
      if (!token.value) {
        showNotification("Invalid or missing reset token.", "error");
      }
    });

    const togglePasswordVisibility = () => { passwordVisible.value = !passwordVisible.value; };
    const toggleConfirmPasswordVisibility = () => { confirmPasswordVisible.value = !confirmPasswordVisible.value; };

    const showNotification = (message: string, type: 'success' | 'error') => {
      notification.value = { visible: true, message, type };
      setTimeout(() => { notification.value.visible = false; }, 4000);
    };

    const handlePasswordReset = async () => {
      if (password.value !== confirmPassword.value) {
        showNotification("Passwords do not match.", "error");
        return;
      }
      if (!token.value) {
        showNotification("Missing reset token.", "error");
        return;
      }

      isLoading.value = true;
      try {
        await api.post('/auth/reset-password', {
          token: token.value,
          newPassword: password.value
        });

        showNotification("Password updated! Redirecting...", "success");
        setTimeout(() => router.push('/login'), 2000);
      } catch (error: any) {
        showNotification(error.response?.data?.message || "Failed to reset password.", "error");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      password, confirmPassword, passwordVisible, confirmPasswordVisible,
      isLoading, notification, togglePasswordVisibility, toggleConfirmPasswordVisibility,
      handlePasswordReset, sloganImage, birdhouseImage, pawsImage, petsImage
    };
  },
});
</script>

<style scoped>
/* EXACT copy of Login CSS */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.reset-container {
  display: flex; height: 100vh; width: 100vw;
  font-family: 'Poppins', sans-serif; background-color: #ffffff;
  justify-content: center; align-items: center; position: relative;
}

/* Toast */
.toast-notification {
  position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
  background-color: white; padding: 12px 20px; border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15); display: flex; align-items: center;
  gap: 12px; z-index: 1000; font-weight: 600; border-left: 4px solid;
}
.toast-notification.success { border-left-color: #009200; color: #006400; }
.toast-notification.error { border-left-color: #ff0000; color: #d8000c; }
.toast-icon { display: flex; align-items: center; }

/* Card */
.card-wrapper {
  display: flex; width: 90%; max-width: 1100px; min-height: 600px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); border-radius: 30px;
  overflow: hidden; background-color: #fff;
}

/* Left Side */
.theme-banner {
  flex: 0 0 45%; background-color: #AEE2E8;
  padding: 50px 40px 0 40px; display: flex; flex-direction: column;
  position: relative; overflow: hidden;
}
.slogan-content { flex-grow: 1; position: relative; display: flex; flex-direction: column; }
.slogan-img { width: 30%; max-width: 220px; height: auto; margin-bottom: 20px; z-index: 10; position: relative; }
.visual-elements { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; }
.birdhouse-img { position: absolute; top: 30px; right: -5px; width: 190px; height: auto; z-index: 10; }
.paws-img { position: absolute; top: 50%; right: 40px; width: 90px; height: auto; z-index: 10; transform: translateY(-50%); }
.pets-img { position: absolute; bottom: 0; left: 0; right: 0; width: 100%; height: auto; max-height: 55%; z-index: 5; object-fit: cover; object-position: bottom center; }

/* Right Side */
.form-area {
  flex: 1; padding: 40px 70px; display: flex; flex-direction: column;
  justify-content: center; align-items: center; position: relative;
}
.form-content { width: 100%; max-width: 420px; }
.form-content h2 { font-size: 2rem; font-weight: 700; margin-bottom: 10px; text-align: center; color: #000; }
.subtitle { text-align: center; color: #6B7280; font-size: 0.9rem; margin-bottom: 30px; }

/* Inputs */
.input-group { margin-bottom: 25px; }
.input-group label { display: block; font-weight: 700; margin-bottom: 8px; font-size: 0.95rem; color: #000; }
.input-wrapper {
  display: flex; align-items: center; border: 1px solid #D1D5DB; border-radius: 10px;
  height: 50px; padding: 0 15px; transition: all 0.2s ease; background-color: #fff;
}
.input-wrapper:focus-within { border-color: #009200; box-shadow: 0 0 0 3px rgba(0, 146, 0, 0.1); }
.input-icon { color: #6B7280; display: flex; align-items: center; margin-right: 12px; }
.input-wrapper input { flex-grow: 1; border: none; outline: none; font-size: 0.95rem; color: #333; width: 100%; }
.view-icon { cursor: pointer; display: flex; align-items: center; color: #9CA3AF; }

/* Button */
.action-button {
  width: 100%; padding: 16px; background-color: #009200; color: #fff;
  border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s ease; margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0, 146, 0, 0.2);
}
.action-button:hover { background-color: #007a00; transform: translateY(-1px); }
.action-button:disabled { background-color: #ccc; cursor: not-allowed; }

@media (max-width: 992px) {
  .card-wrapper { flex-direction: column; height: auto; max-height: 90vh; overflow-y: auto; }
  .theme-banner { flex: 0 0 250px; padding-top: 30px; }
  .birdhouse-img { width: 140px; }
  .form-area { flex: 1; padding: 40px 30px; }
}
</style>
