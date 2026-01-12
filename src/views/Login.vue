<template>
  <div class="login-container">
    <div class="card-wrapper">
      <div class="theme-banner">
        <div class="slogan-content">
          <img :src="sloganImage" alt="Where Pets Are Family" class="slogan-img" />

          <div class="visual-elements">
            <img :src="birdhouseImage" alt="Birdhouse with bird" class="birdhouse-img" />
            <img :src="pawsImage" alt="White paw prints" class="paws-img" />
            <img :src="petsImage" alt="Group of pets" class="pets-img" />
          </div>
        </div>
      </div>

      <div class="login-form-area">
        <router-link to="/" class="close-icon" aria-label="Close Login">
          &times;
        </router-link>

        <div class="form-content">
          <h2>Login</h2>

          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <label for="email">Email</label>
              <div class="input-wrapper email-wrapper">
                <span class="icon email-icon">✉</span>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <span class="icon view-icon" @click="togglePasswordVisibility">
                  👁
                </span>
                <input
                  id="password"
                  v-model="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                />
              </div>
            </div>

            <div class="forgot-password-row">
              <router-link to="/forgot-password" class="forgot-link">Forgot Password?</router-link>
            </div>

            <button type="submit" class="login-button">
              Login
            </button>
          </form>

          <div class="separator">
            <hr />
            <span>Or Continue With</span>
            <hr />
          </div>

          <div class="social-login">
            <button type="button" class="social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </button>

            <button type="button" class="social-button facebook">
              <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 40 40" width="40" height="40">
                <linearGradient id="a" x1="-277.375" x2="-277.375" y1="406.6018" y2="407.5726" gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#0062e0"/>
                  <stop offset="1" stop-color="#19afff"/>
                </linearGradient>
                <path fill="url(#a)" d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"/>
                <path fill="#fff" d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"/>
              </svg>
            </button>

            <button type="button" class="social-button apple">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
            </button>
          </div>

          <div class="signup-link">
            Don't have an account?
            <router-link to="/register" class="link">Sign Up here</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import petstoreLogo from '../assets/photos/Logo_PetStore.png';
import sloganImage from '../assets/photos/texts.png';
import birdhouseImage from '../assets/photos/birdhouse.png';
import pawsImage from '../assets/photos/paws.png';
import petsImage from '../assets/photos/pets.png';

export default defineComponent({
  name: 'TheLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const handleLogin = () => {
      // Login Logic Here
      console.log('Logging in with:', email.value);
      // router.push('/dashboard');
    };

    return {
      email,
      password,
      passwordVisible,
      togglePasswordVisibility,
      handleLogin,
      petstoreLogo,
      sloganImage,
      birdhouseImage,
      pawsImage,
      petsImage,
    };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.card-wrapper {
  display: flex;
  width: 90%;
  max-width: 1100px;
  min-height: 600px;
  height: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  background-color: #fff;
}


.theme-banner {
  flex: 0 0 45%;
  background-color: #AEE2E8;
  padding: 50px 40px 0 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.login-form-area {
  flex: 0 0 55%;
  background-color: #fff;
  padding: 40px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}


.slogan-content {
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.slogan-img {
  width: 30%;
  max-width: 220px;
  height: auto;
  margin-bottom: 20px;
  z-index: 10;
  position: relative;
}

.visual-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.birdhouse-img {
  position: absolute;
  top: 30px;
  right: -5px;
  width: 190px;
  height: auto;
  z-index: 10;
}

.paws-img {
  position: absolute;
  top: 50%;
  right: 40px;
  width: 90px;
  height: auto;
  z-index: 10;
  transform: translateY(-50%);
}

.pets-img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  max-height: 55%;
  z-index: 5;
  object-fit: cover;
  object-position: bottom center;
}


.close-icon {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 2rem;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  line-height: 1;
  font-weight: 300;
  transition: color 0.2s;
}

.close-icon:hover {
  color: #666;
}


.form-content {
  width: 100%;
  max-width: 420px;
}

.login-form-area h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 10px;
  text-align: center;
  color: #000;
}


.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #000;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #999;
  border-radius: 8px;
  height: 50px;
  padding: 0 15px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.email-wrapper, .input-wrapper:focus-within {
  border-color: #009200;
}

.input-wrapper input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 0.95rem;
  height: 100%;
  color: #333;
  font-family: inherit;
  font-weight: 500;
}

.input-wrapper .icon {
  font-size: 1.2rem;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
}

.view-icon {
  cursor: pointer;
}

.forgot-password-row {
  text-align: right;
  margin-top: -12px;
  margin-bottom: 25px;
}

.forgot-link {
  color: #009200;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 16px;
  background-color: #009200; /* Green */
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-bottom: 20px;
}

.login-button:hover {
  background-color: #007a00;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 146, 0, 0.3);
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0 25px 0;
  font-size: 0.8rem;
  color: #999;
  font-weight: 600;
}

.separator hr {
  flex-grow: 1;
  border: none;
  border-top: 1px solid #ccc;
}

.separator span {
  padding: 0 15px;
  white-space: nowrap;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.social-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 0;
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.signup-link {
  text-align: center;
  font-size: 0.85rem;
  color: #000;
  font-weight: 600;
}

.signup-link .link {
  color: #009200;
  font-weight: 700;
  text-decoration: none;
  margin-left: 4px;
}

.signup-link .link:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .card-wrapper {
    width: 95%;
    max-width: 1000px;
  }
  .login-form-area {
    padding: 40px 50px;
  }
  .logo-header {
    left: 40px;
    top: 25px;
  }
}

@media (max-width: 992px) {
  .card-wrapper {
    flex-direction: column;
    width: 90%;
    height: auto;
    max-height: 90vh;
    overflow-y: auto;
  }
  .theme-banner {
    flex: 0 0 300px;
    padding-top: 30px;
  }
  .birdhouse-img {
    width: 140px;
  }
  .login-form-area {
    flex: 1;
    padding: 40px 50px;
  }
}

@media (max-width: 768px) {
  .login-form-area {
    padding: 30px 35px;
  }
  .logo-header {
    left: 30px;
    top: 20px;
  }
  .petstore-logo {
    max-width: 120px;
  }
}
</style>
