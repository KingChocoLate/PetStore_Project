<template>
  <div class="min-h-screen bg-gray-50 font-poppins text-[#181818]">

    <header class="relative h-[350px] md:h-[450px] flex items-center justify-center bg-[#E0F8E9] overflow-hidden">
      <div class="absolute top-0 left-0 w-64 h-64 bg-[#B8E6C8] rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-[#009200] rounded-full blur-[100px] opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div class="relative z-10 text-center px-4 max-w-3xl">
        <span class="text-[#009200] font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">
          We'd love to hear from you
        </span>
        <h1 class="text-5xl md:text-7xl font-bold text-[#181818] mb-6 leading-tight animate-fade-in-up delay-100">
          Get In Touch
        </h1>
        <p class="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up delay-200">
          Have a question about a product, shipping, or just want to say hi? We're here to help you and your furry friends!
        </p>
      </div>
    </header>

    <div class="max-w-[1280px] mx-auto px-6 md:px-12 -mt-20 relative z-20 pb-20">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group">
          <div class="w-16 h-16 bg-[#E0F8E9] text-[#009200] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Call Us</h3>
          <p class="text-gray-500 mb-4 text-sm">Mon-Fri from 8am to 5pm</p>
          <a href="tel:+85512345678" class="text-[#009200] font-bold hover:underline">+855 12 345 678</a>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group">
          <div class="w-16 h-16 bg-[#E0F8E9] text-[#009200] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Email Us</h3>
          <p class="text-gray-500 mb-4 text-sm">We usually reply within 24 hours</p>
          <a href="mailto:support@petstore.com" class="text-[#009200] font-bold hover:underline">support@petstore.com</a>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group">
          <div class="w-16 h-16 bg-[#E0F8E9] text-[#009200] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Visit Us</h3>
          <p class="text-gray-500 mb-4 text-sm">Come say hello at our HQ</p>
          <span class="text-[#009200] font-bold block">Phnom Penh, Cambodia</span>
        </div>
      </div>

      <div class="bg-white rounded-[30px] shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row mb-24">

        <div class="w-full lg:w-1/2 p-10 md:p-14">
          <h2 class="text-3xl font-bold mb-2">Send us a Message</h2>
          <p class="text-gray-500 mb-8">Fill out the form below and our team will get back to you shortly.</p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700">First Name</label>
                <input type="text" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#009200] focus:bg-white transition" placeholder="John" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700">Last Name</label>
                <input type="text" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#009200] focus:bg-white transition" placeholder="Doe" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#009200] focus:bg-white transition" placeholder="john@example.com" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700">Message</label>
              <textarea rows="5" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#009200] focus:bg-white transition resize-none" placeholder="How can we help you today?"></textarea>
            </div>

            <button type="submit" class="w-full bg-[#009200] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#007a00] hover:shadow-green-200/50 transition-all transform hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </div>

        <div class="w-full lg:w-1/2 h-[400px] lg:h-auto bg-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62551.01837946979!2d104.8806296!3d11.5696196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
            class="w-full h-full border-none"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div class="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg max-w-[200px] hidden sm:block">
            <p class="text-xs font-bold text-gray-400 uppercase mb-1">Our Location</p>
            <p class="text-sm font-bold text-[#181818]">Phnom Penh, Cambodia</p>
          </div>
        </div>
      </div>

      <section class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p class="text-gray-500">Find answers to common questions about our products and services.</p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
            :class="activeIndex === index ? 'shadow-md border-[#009200]' : 'hover:border-gray-300'"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center p-6 text-left"
            >
              <span class="font-bold text-lg" :class="activeIndex === index ? 'text-[#009200]' : 'text-black'">
                {{ faq.question }}
              </span>
              <span
                class="transform transition-transform duration-300 text-2xl leading-none"
                :class="activeIndex === index ? 'rotate-45 text-[#009200]' : 'text-gray-400'"
              >
                +
              </span>
            </button>

            <div
              v-show="activeIndex === index"
              class="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

    </div>

    <footer class="bg-[#1a1a1a] text-white pt-20 pb-10">
      <div class="max-w-[1280px] mx-auto px-6 md:px-12">

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-16 mb-12">

          <div class="lg:col-span-1 space-y-6">
            <h2 class="text-3xl font-extrabold tracking-tight">PETSTORE<span class="text-[#009200]">+</span></h2>
            <p class="text-gray-400 text-sm leading-relaxed">
              We provide premium quality food, toys, and accessories for your furry family members. Happiness delivered to your doorstep.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#009200] transition-colors">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#009200] transition-colors">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div class="lg:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 class="text-white font-bold text-lg mb-6">My Account</h3>
              <ul class="space-y-4 text-gray-400 text-sm">
                <li><a href="#" class="hover:text-[#009200] transition-colors">My Profile</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">Order History</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">Shopping Cart</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">Wishlist</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-white font-bold text-lg mb-6">Support</h3>
              <ul class="space-y-4 text-gray-400 text-sm">
                <li><a href="#" class="hover:text-[#009200] transition-colors">Contact Us</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">FAQs</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">Privacy Policy</a></li>
                <li><a href="#" class="hover:text-[#009200] transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div class="lg:col-span-1">
            <h3 class="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <p class="text-gray-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and deals.</p>
            <div class="flex flex-col gap-3">
              <input type="email" placeholder="Enter your email" class="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-[#009200] border border-gray-700" />
              <button class="bg-[#009200] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#007a00] transition">Subscribe</button>
            </div>
          </div>

        </div>

        <div class="flex flex-col md:flex-row justify-between items-center pt-8">
          <p class="text-gray-500 text-sm mb-4 md:mb-0">© 2025 PetStore+. All rights reserved.</p>

          <div class="flex gap-3">
             <div class="bg-white p-1 rounded w-10 h-6 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" class="h-full" alt="Visa"></div>
             <div class="bg-white p-1 rounded w-10 h-6 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-full" alt="Mastercard"></div>
             <div class="bg-white p-1 rounded w-10 h-6 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-full" alt="PayPal"></div>
          </div>
        </div>

      </div>
    </footer>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ContactView',
  setup() {
    const activeIndex = ref<number | null>(0); // Open first FAQ by default

    const faqs = [
      {
        question: "How long does shipping take?",
        answer: "We typically deliver within 1-3 business days across Cambodia. You'll receive a tracking link via Telegram once your order ships."
      },
      {
        question: "Can I return a product?",
        answer: "Yes! We offer hassle-free returns for unopened products within 7 days of purchase. Just bring your receipt to any store."
      },
      {
        question: "Is your pet food authentic?",
        answer: "Absolutely. We are authorized partners with major brands like Royal Canin and Whiskas to ensure 100% authenticity."
      },
      {
        question: "How do I use a coupon code?",
        answer: "Enter your code in the checkout page or the contact form message box to inquire about specific deals."
      }
    ];

    const toggleFaq = (index: number) => {
      activeIndex.value = activeIndex.value === index ? null : index;
    };

    const handleSubmit = () => {
      alert('Message sent successfully!');
    };

    return {
      activeIndex,
      faqs,
      toggleFaq,
      handleSubmit
    };
  }
});
</script>

<style scoped>
/* Animation Utilities */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
</style>
