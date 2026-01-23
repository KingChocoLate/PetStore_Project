<template>
  <div class="register-container">
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

      <div class="register-form-area">
        <router-link to="/" class="close-icon" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </router-link>

        <div class="form-content">
          <div class="header-group">
            <h2>Create Account</h2>
          </div>

          <form @submit.prevent="handleRegistration">
            <div class="input-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
              </div>
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input id="password" v-model="password" :type="passwordVisible ? 'text' : 'password'" required placeholder="Create a password" />
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
                <input id="confirmPassword" v-model="confirmPassword" :type="confirmPasswordVisible ? 'text' : 'password'" required placeholder="Repeat password" />
                <span class="view-icon" @click="toggleConfirmPasswordVisibility">
                  <svg v-if="!confirmPasswordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </span>
              </div>
              <p v-if="passwordsMismatch" class="error-message">Passwords do not match!</p>
            </div>

            <button type="submit" class="register-button" :disabled="isLoading">
              {{ isLoading ? 'Registering...' : 'Sign Up' }}
            </button>
          </form>

          <div class="separator">
            <hr /><span>Or Continue With</span><hr />
          </div>

          <div class="social-login">
            <button type="button" class="social-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            </button>
            <button type="button" class="social-button">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
            </button>
            <button type="button" class="social-button">
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.22-1.35 1.62.25 2.87 1.35 3.61 2.39-2.92 1.62-2.39 5.76.62 6.94-.65 1.76-1.57 3.32-3.53 4.25zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            </button>
          </div>

          <div class="login-link">
            Already have an account?
            <router-link to="/login" class="link">Login here</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Import Assets
import { useAuthStore } from '@/stores/auth';

import sloganImage from '../assets/photos/texts.png';
import birdhouseImage from '../assets/photos/birdhouse.png';
import pawsImage from '../assets/photos/paws.png';
import petsImage from '../assets/photos/pets.png';

export default defineComponent({
  name: 'TheRegister',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const passwordVisible = ref(false);
    const confirmPasswordVisible = ref(false);
    const isLoading = ref(false);
    const notification = ref({ visible: false, message: '', type: 'success' });
    
    const passwordsMismatch = computed(() => (password.value && confirmPassword.value) && (password.value !== confirmPassword.value));

    const togglePasswordVisibility = () => { passwordVisible.value = !passwordVisible.value; };
    const toggleConfirmPasswordVisibility = () => { confirmPasswordVisible.value = !confirmPasswordVisible.value; };

    const showNotification = (message: string, type: 'success' | 'error') => {
      notification.value = { visible: true, message, type };
      setTimeout(() => { notification.value.visible = false; }, 3000);
    };

    const handleRegistration = async () => {
      if (passwordsMismatch.value) { showNotification('Passwords do not match!', 'error'); return; }
      if (!email.value || !password.value) { showNotification('Please fill in all fields.', 'error'); return; }
      isLoading.value = true;
      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          email: email.value,
          password: password.value
        });

        if (response.status === 201) {
          showNotification('Registration Successful! Redirecting...', 'success');
          setTimeout(() => {
            router.push('/login');
          }, 1500);
        }
      } catch (error: any) {
        if (error.response) {
          showNotification(error.response.data.message || 'Registration failed', 'error');
        } else {
          showNotification('Network Error: Is the server running?', 'error');
        }
        console.error(error);
        await authStore.register(email.value, password.value);
        showNotification('Registration Successful!', 'success');
        setTimeout(() => { router.push('/profile'); }, 1500);
      } catch (error: any) {
        showNotification(error.response?.data?.message || 'Registration failed.', 'error');
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      confirmPassword,
      passwordVisible,
      confirmPasswordVisible,
      passwordsMismatch,
      isLoading,
      notification,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      handleRegistration,
      sloganImage,
      birdhouseImage,
      pawsImage,
      petsImage,
    };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.register-container {
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

/* Left Side: EXACT ORIGINAL */
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

/* Right Side: Modern Form */
.register-form-area {
  flex: 0 0 55%; background-color: #fff; padding: 40px 70px;
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; position: relative;
}

.close-icon {
  position: absolute; top: 30px; right: 30px; color: #9CA3AF; transition: color 0.2s;
}
.close-icon:hover { color: #111; }

.form-content { width: 100%; max-width: 420px; }
.header-group { text-align: center; margin-bottom: 25px; }
.register-form-area h2 { font-size: 2rem; font-weight: 700; color: #000; }

.input-group { margin-bottom: 18px; }
.input-group label { display: block; font-weight: 700; margin-bottom: 8px; font-size: 0.95rem; color: #000; }

/* Input Styling */
.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-weight: 700; margin-bottom: 8px; }
.input-wrapper {
  display: flex; align-items: center; border: 1px solid #D1D5DB; border-radius: 10px;
  height: 50px; padding: 0 15px; transition: all 0.2s ease; background-color: #fff;
}
.input-wrapper:focus-within { border-color: #009200; box-shadow: 0 0 0 3px rgba(0, 146, 0, 0.1); }

.input-icon { color: #6B7280; display: flex; align-items: center; margin-right: 12px; }
.input-wrapper input { flex-grow: 1; border: none; outline: none; font-size: 0.95rem; color: #333; width: 100%; }

.view-icon { cursor: pointer; display: flex; align-items: center; color: #9CA3AF; }
.view-icon:hover { color: #4B5563; }

.error-message { color: #d8000c; font-size: 0.85rem; margin-top: 5px; font-weight: 500; }

/* Buttons */
.register-button {
  width: 100%; padding: 16px; background-color: #009200; color: #fff;
  border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s ease; margin-top: 10px; margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 146, 0, 0.2);
}
.register-button:hover { background-color: #007a00; transform: translateY(-1px); }
.register-button:disabled { background-color: #ccc; cursor: not-allowed; }

.separator { display: flex; align-items: center; text-align: center; margin: 15px 0 20px 0; font-size: 0.8rem; color: #999; font-weight: 600; }
.separator hr { flex-grow: 1; border: none; border-top: 1px solid #ccc; }
.separator span { padding: 0 15px; }

.social-login { display: flex; justify-content: center; gap: 20px; margin-bottom: 25px; }
.social-button {
  width: 50px; height: 50px; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #f0f0f0; background-color: white;
  transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.social-button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }

.login-link { text-align: center; font-size: 0.85rem; color: #000; font-weight: 600; }
.login-link .link { color: #009200; font-weight: 700; text-decoration: none; margin-left: 4px; }
.login-link .link:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 992px) {
  .card-wrapper { flex-direction: column; height: auto; max-height: 90vh; overflow-y: auto; }
  .theme-banner { flex: 0 0 300px; padding-top: 30px; }
  .birdhouse-img { width: 140px; }
  .register-form-area { flex: 1; padding: 40px 30px; }
}
</style>