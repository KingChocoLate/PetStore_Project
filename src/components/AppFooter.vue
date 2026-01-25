<template>
  <footer class="bg-[#1a1a1a] text-white pt-12 pb-8 border-t border-gray-800 mt-auto">
    <div class="max-w-[1280px] mx-auto px-6 md:px-12">

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 border-b border-gray-800 pb-10 mb-8">

        <div class="lg:col-span-1 space-y-4">
          <h2 class="text-2xl font-extrabold tracking-tight">PETSTORE<span class="text-[#009200]">+</span></h2>
          <p class="text-gray-400 text-sm leading-relaxed">
            Premium quality food, toys, and accessories for your furry family members.
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#009200] transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#009200] transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2 grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-white font-bold text-base mb-4">My Account</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><router-link to="/profile" class="hover:text-[#009200] transition-colors">My Profile</router-link></li>
              <li><router-link to="/order-history" class="hover:text-[#009200] transition-colors">Order History</router-link></li>
              <li><router-link to="/cart" class="hover:text-[#009200] transition-colors">Shopping Cart</router-link></li>
              <li><router-link to="/wishlist" class="hover:text-[#009200] transition-colors">Wishlist</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-bold text-base mb-4">Support</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><router-link to="/contact" class="hover:text-[#009200] transition-colors">Contact Us</router-link></li>
              <li><router-link to="/faqs" class="hover:text-[#009200] transition-colors">FAQs</router-link></li>
              <li><router-link to="/privacy-policy" class="hover:text-[#009200] transition-colors">Privacy Policy</router-link></li>
              <li><router-link to="/terms-conditions" class="hover:text-[#009200] transition-colors">Terms & Conditions</router-link></li>
            </ul>
          </div>
        </div>

        <div class="lg:col-span-1">
          <h3 class="text-white font-bold text-base mb-4">Stay Updated</h3>
          <p class="text-gray-400 text-xs mb-3">Subscribe to get special offers & deals.</p>
          <div class="flex flex-col gap-2">
            <input type="email" placeholder="Enter your email" class="bg-gray-800 text-white px-4 py-2.5 rounded-lg outline-none text-sm focus:ring-1 focus:ring-[#009200] border border-gray-700" />
            <button class="bg-[#009200] text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[#007a00] transition">Subscribe</button>
          </div>
        </div>

      </div>

      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-xs mb-4 md:mb-0">© 2025 PetStore+. All rights reserved.</p>

        <div class="flex gap-2">
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" class="h-full" alt="Visa"></div>
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-full" alt="Mastercard"></div>
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-full" alt="PayPal"></div>
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="/src/assets/bakong_logo.png" class="h-full" alt="Bakong"></div>
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="/src/assets/aba_logo.png" class="h-full" alt="ABA"></div>
           <div class="bg-white p-1 rounded w-10 h-8 flex items-center justify-center"><img src="/src/assets/acleda_logo.png" class="h-full" alt="Acleda"></div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
});
</script>
