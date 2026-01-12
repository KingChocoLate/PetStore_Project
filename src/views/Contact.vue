<template>
  <div class="min-h-screen pb-10 px-10 font-poppins-regular">
    <div class=" px-6 pt-10">
      
      <header 
        class="relative rounded-[20px] h-[400px] pb-20 flex items-center px-120 overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: `url(${heroBg})` }"
      >
        <h1 class="text-[70px] font-poppins-extraBold text-white leading-tight z-10 drop-shadow-2xl">
          Get In Touch
        </h1>
      </header>
      <section 
        class="mt-10 py-30 relative rounded-[20px] h-[220px]  flex items-center px-90 overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: `url(${promoBg})` }"
      >
        <div class="z-10 max-w-[700px] ml-[150px]">
          <p class="text-[#009900] font-poppins-bold text-sm tracking-widest uppercase mb-1">
            Up to 30% Off
          </p>
          <h2 class="text-[36px] font-poppins-bold text-black leading-tight">
            100% Authentic Nutrition Food For Cat!
          </h2>
          <p class="text-gray-600 font-poppins-medium mt-1">
            Hurry up limited quantity! Use code: CATE20
          </p>
        </div>
      </section>

<!-- FQA Section -->
<section class="mt-24 mx-90 relative w-full">
    
    <h3 class="text-center font-poppins-bold text-[28px] mb-12 pb-10 pt-10 text-black">
      Frequently Asked Questions
    </h3>

    <div class="h-150 flex flex-row items-start justify-center gap-20 bg-white shadow-md mx-90">
      
      <div class="relative w-[300px] h-[500px] flex-shrink-0">
        <div class="absolute -left-4 top-0 w-64 h-64 bg-[#91FF76] rounded-full z-0"></div>
        
        <img 
          src="@/assets/contact/dog1.png" 
          alt="Rabbit Decor" 
          class="absolute left-0 bottom-0 w-72 object-contain pointer-events-none z-20" 
        />
      </div>

      <div class="grow max-w-[950px] space-y-6 z-10">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          @click="toggleFaq(index)"
          class="transition-all duration-300 shadow-sm cursor-pointer border-none overflow-hidden"
          :class="[
            activeIndex === index ? 'bg-[#FCECEC] rounded-[25px]' : 'bg-[#F8F8F8] rounded-[15px]'
          ]"
        >
          <div class="p-8 flex justify-between items-center">
            <h4 class="text-[22px] font-poppins-bold text-black leading-tight">
              {{ index + 1 }}. {{ faq.question }}
            </h4>
            
            <div 
              class="w-10 h-10 rounded-full border border-black flex items-center justify-center transition-transform duration-300 bg-white shadow-sm"
              :class="{'rotate-180': activeIndex === index}"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <transition name="fade">
            <div v-if="activeIndex === index" class="px-8 pb-8 text-[18px] text-gray-700 leading-relaxed font-poppins-medium">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

    </div>
  </section>

<!-- contact form section  -->
<section class="flex flex-col lg:flex-row w-full min-h-[700px] overflow-hidden">
    
    <div class="w-full lg:w-3/5 bg-[#C9D6AD] p-12 lg:p-20 flex flex-col justify-center">
      
      <h2 class="text-[56px] font-bold text-[#2D2D2D] mb-10 leading-tight">
        Send Us a Message
      </h2>

      <div class="flex items-center gap-4 mb-10">
        <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img 
            src="../assets/contact/b1.png" 
            alt="Shop Assistant" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="bg-[#E2E9D1] border border-white/50 px-5 py-3 rounded-sm shadow-sm max-w-sm">
          <p class="text-[#4A4A4A] text-[15px] leading-relaxed italic">
            Hi, I'm a shop assistant. Need help? <br />
            Please fill the form below and email us <br />
            through this <span class="font-bold">petstore@gmail.com</span>
          </p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5 max-w-xl pt-5">
        <div class="relative pb-3">
          <input 
            type="text" 
            placeholder="Name*" 
            required
            class="w-full bg-white px-6 py-4 rounded-lg shadow-sm outline-none placeholder:text-gray-400 text-gray-700"
          />
        </div>

        <div class="relative pb-3">
          <input 
            type="email" 
            placeholder="Email*" 
            required
            class="w-full bg-white px-6 py-4 rounded-lg shadow-sm outline-none placeholder:text-gray-400 text-gray-700"
          />
        </div>

        <div class="relative pb-3">
          <input 
            type="text" 
            placeholder="Coupon*(Optional)" 
            class="w-full bg-white px-6 py-4 rounded-lg shadow-sm outline-none placeholder:text-gray-400 text-gray-700"
          />
        </div>

        <div class="relative pb-3">
          <textarea 
            placeholder="Your message..." 
            rows="5"
            class="w-full bg-white px-6 py-4 rounded-lg shadow-sm outline-none placeholder:text-gray-400 text-gray-700 resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="w-full bg-[#007A00] hover:bg-[#006400] text-white font-bold py-4 rounded-lg transition-colors duration-300 text-lg shadow-md"
        >
          Send my message
        </button>
      </form>
    </div>

    <div class="w-full lg:w-2/5 h-[400px] lg:h-auto">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31267.89234851458!2d104.8885!3d11.5564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095138f20b4105%3A0x6a0e623f9828d844!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1703800000000!5m2!1sen!2skh" 
        class="w-full h-full border-none"
        
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </section>

<!-- Footer -->
<footer class="w-full bg-white font-poppins text-[#4A4A4A]">
    <hr class="border-t border-gray-200" />

    <div class="max-w-[1440px] mx-auto px-10 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        
        <div class="space-y-6">
          <div>
            <h2 class="text-[35px] font-bold text-black leading-tight">PETSTORE<span class="text-[#008C00]">+</span></h2>
            <p class="text-[13px] font-medium text-black">EST. 2025</p>
          </div>
          <p class="text-sm leading-relaxed max-w-[250px] pb-3">
            Your trusted pet store for all your pet needs. Quality products and excellent service.
          </p>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 pb-3">
              <div class="bg-[#00B207] p-2 rounded-full text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span class="text-gray-400">petstore@gmail.com</span>
            </li>
            <li class="flex items-center gap-3 pb-3">
              <div class="bg-[#00B207] p-2 rounded-full text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span class="text-gray-400">+(888) 78234555</span>
            </li>
            <li class="flex items-center gap-3 pb-3">
              <div class="bg-[#00B207] p-2 rounded-full text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span class="text-gray-400">555 Charmkar Doung Street <span class="text-[#00B207]">Cambodia</span></span>
            </li>
          </ul>
        </div>

        <div class="lg:pl-10">
          <h3 class="text-black font-bold text-lg mb-6 pb-2">Quick link</h3>
          <ul class="space-y-4 text-gray-500 font-medium">
            <li><a href="#" class="hover:text-[#008C00]">Home</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Shop</a></li>
            <li><a href="#" class="hover:text-[#008C00]">About</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-black font-bold text-lg mb-6 pb-2">Customer Service</h3>
          <ul class="space-y-4 text-gray-500 font-medium">
            <li><a href="#" class="hover:text-[#008C00]">Wishlist</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Shipping Info</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Returns</a></li>
            <li><a href="#" class="hover:text-[#008C00]">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-black font-bold text-lg mb-6 pb-2">About</h3>
          <ul class="space-y-4 text-gray-500 font-medium">
            <li><a href="#" class="hover:text-[#008C00]">Our Story</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Blog</a></li>
            <li><a href="#" class="hover:text-[#008C00]">Feedback</a></li>
          </ul>
        </div>

        <div class="bg-white p-7 shadow-sm border border-gray-100 rounded-xl h-fit">
          <h3 class="text-black font-bold text-lg mb-2">Shop on the Store</h3>
          <p class="text-xs text-gray-800 mb-6 font-medium leading-relaxed">Online shop is available. <br/> Get it now</p>
          <div class="space-y-3">
            <a href="#" class="block hover:scale-105 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-12" />
            </a>
            <a href="#" class="block hover:scale-105 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" class="h-12" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center py-10 border-t border-gray-100 relative">
        <h3 class="text-[32px] font-bold text-[#4A4A4A] mb-8">Subscribe us today to get 10% off !</h3>
        <div class="flex w-full max-w-[600px] gap-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            class="flex-1 border border-gray-300 rounded-lg px-6 py-4 outline-none focus:border-[#008C00]"
          />
          <button class="bg-[#008C00] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#006400] transition">
            Subscribe
          </button>
        </div>

        <div class="lg:absolute left-0 bottom-0 mt-10 lg:mt-0">
          <h4 class="text-[24px] font-bold text-black mb-4">Follow Us</h4>
          <div class="flex gap-4">
            <a href="#" class="hover:scale-110 transition-transform"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" class="w-10 h-10" alt="FB" /></a>
            <a href="#" class="hover:scale-110 transition-transform"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" class="w-10 h-10" alt="IG" /></a>
            <a href="#" class="hover:scale-110 transition-transform"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" class="w-10 h-10" alt="YT" /></a>
          </div>
        </div>

        <div class="hidden lg:block absolute -right-4 -bottom-4 w-[200px]">
          <img src="../assets/contact/footerfoodimg.png" class="w-full drop-shadow-2xl" alt="Pet Food" />
        </div>
      </div>
    </div>

    <div class="bg-[#FCECEC] py-4 px-10">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center">
        <p class="text-[15px] text-gray-600 font-medium">© 2025 <span class="text-[#008C00]">PetStore+</span>. All rights reserved.</p>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" class="h-10 grayscale hover:grayscale-0 transition cursor-pointer" />
          <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="Mastercard" class="h-10 grayscale hover:grayscale-0 transition cursor-pointer" />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png" alt="ApplePay" class="h-10 grayscale hover:grayscale-0 transition cursor-pointer" />
        </div>
      </div>
    </div>
  </footer>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
interface FAQItem {
  question: string;
  answer: string;
}
import heroBg from '@/assets/contact/hero_img.png';
import promoBg from '@/assets/contact/cat-food-promo.png';

export default defineComponent({
  name: 'ContactView',
  data() {
    return {
      // Asset bindings
      heroBg: heroBg as string,
      promoBg: promoBg as string,
      
      // UI State
      activeIndex: 0 as number,
      
      // Content data
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "We typically deliver within 1-3 business days across Cambodia. You'll receive a tracking link once your order ships."
        },
        {
          question: "Can I return a product if my pet doesn't like it?",
          answer: "Yes, we offer returns for unopened products within 7 days of purchase."
        },
        {
          question: "Is your pet food really 100% authentic and safe?",
          answer: "Absolutely. We source directly from authorized distributors to ensure the highest quality for your pets."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach us through our hotline, Telegram, or the contact form below."
        }
      ] as FAQItem[]
    };
  },

  methods: {
toggleFaq(index: number): void {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },
    handleSubmit() {
      alert('Message sent successfully!');
    }
  }
});
</script>

<style scoped>
/* Smooth fade for the FAQ answers */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>