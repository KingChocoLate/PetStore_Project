<template>
  <div class="min-h-screen bg-[#F3F4F6] font-sans text-gray-900 pb-20">

    <transition name="modal-fade">
      <div v-if="showBakongModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" @click="closeBakongModal"></div>

        <div class="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden transform transition-all scale-100">

          <div class="bg-[#E60000] p-6 text-white text-center relative overflow-hidden">
             <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

             <button @click="closeBakongModal" class="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition z-20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>

             <h3 class="text-xl font-bold tracking-wide relative z-10">KHQR PAYMENT</h3>
             <p class="text-white/80 text-sm relative z-10">Scan with any Mobile Banking App</p>
          </div>

          <div class="p-8 flex flex-col items-center">

             <div class="flex items-center justify-center gap-6 mb-8 opacity-90">
                <img src="/src/assets/aba_logo.png" class="h-8 object-contain" alt="ABA">

                <div class="w-px h-6 bg-gray-200"></div>

                <img src="/src/assets/acleda_logo.png" class="h-8 object-contain" alt="Acleda">

                <div class="w-px h-6 bg-gray-200"></div>

                <img src="/src/assets/bakong_logo.png" class="h-8 object-contain" alt="Bakong">
             </div>

             <div class="bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100 flex flex-col items-center mb-8 w-full shadow-sm">
                <span class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total to Pay</span>
                <span class="text-4xl font-extrabold text-[#009200]">${{ totalCost.toFixed(2) }}</span>
             </div>

             <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div class="relative bg-white p-3 rounded-xl border-2 border-gray-100 shadow-inner">
                    <img :src="dynamicQR" alt="Dynamic KHQR" class="w-64 h-64 object-contain mix-blend-multiply rounded-lg" />

                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                        <img src="https://bakong.nbc.gov.kh/images/logo.svg" class="w-8 h-8" alt="KHQR">
                    </div>
                </div>
             </div>

             <div class="mt-8 flex items-center gap-2 text-red-500 font-mono font-bold bg-red-50 px-4 py-1.5 rounded-full text-sm border border-red-100">
                 <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <span>Expires in {{ formatTime(timeLeft) }}</span>
             </div>

             <div class="mt-4 flex items-center gap-2 text-gray-400 text-xs font-medium animate-pulse">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                Waiting for payment confirmation...
             </div>

          </div>
        </div>
      </div>
    </transition>

    <div v-if="orderSuccess" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
      <div class="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl transform scale-100 transition-transform">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg class="w-12 h-12 text-[#009200]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="text-3xl font-extrabold mb-2 text-gray-900">Order Confirmed!</h2>
        <p class="text-gray-500 mb-8 text-lg">Thank you for shopping with PetStore+.</p>
        <button @click="goToHistory" class="w-full bg-[#009200] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#007a00] hover:shadow-lg hover:-translate-y-0.5 transition-all">
          Track My Order
        </button>
      </div>
    </div>

    <div class="max-w-[1200px] mx-auto px-4 md:px-8 pt-12" :class="{ 'blur-sm grayscale-[50%]': orderSuccess || showBakongModal }">
      <h1 class="text-4xl font-extrabold mb-10 text-gray-900">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7 space-y-8">

          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-[#009200]"></div>
            <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
              <div class="w-12 h-12 bg-green-50 text-[#009200] rounded-full flex items-center justify-center border border-green-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              Shipping Details
            </h2>
            <form class="space-y-6">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">First Name</label><input v-model="form.firstName" type="text" class="input-modern" placeholder="Sok" /></div>
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Last Name</label><input v-model="form.lastName" type="text" class="input-modern" placeholder="San" /></div>
              </div>
              <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Street Address</label><input v-model="form.address" type="text" class="input-modern" placeholder="St. 2004, Sen Sok" /></div>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">City</label><input v-model="form.city" type="text" class="input-modern" placeholder="Phnom Penh" /></div>
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Country</label><input v-model="form.country" type="text" class="input-modern" placeholder="Cambodia" /></div>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Postal Code</label><input v-model="form.postalCode" type="text" class="input-modern" placeholder="12000" /></div>
                <div class="space-y-2"><label class="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Phone Number</label><input v-model="form.phone" type="text" class="input-modern" placeholder="012 345 678" /></div>
              </div>
            </form>
          </div>

          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-gray-200"></div>
            <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
              <div class="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center border border-gray-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
              Payment Method
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div @click="setPaymentMethod('Bakong')" class="relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center gap-3 hover:shadow-md" :class="form.paymentMethod === 'Bakong' ? 'border-[#E60000] bg-red-50/30' : 'border-gray-100 hover:border-red-100 bg-white'">
                <div v-if="form.paymentMethod === 'Bakong'" class="absolute top-3 right-3 text-[#E60000]"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg></div>
                <div class="w-12 h-12 bg-red-100 text-[#E60000] rounded-full flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></div>
                <div><span class="block font-bold text-gray-900">KHQR</span><span class="text-xs text-gray-500">Scan to Pay</span></div>
              </div>

              <div @click="setPaymentMethod('COD')" class="relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center gap-3 hover:shadow-md" :class="form.paymentMethod === 'COD' ? 'border-[#009200] bg-green-50/30' : 'border-gray-100 hover:border-green-200 bg-white'">
                <div v-if="form.paymentMethod === 'COD'" class="absolute top-3 right-3 text-[#009200]"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg></div>
                <div class="w-12 h-12 bg-green-100 text-[#009200] rounded-full flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
                <div><span class="block font-bold text-gray-900">Cash</span><span class="text-xs text-gray-500">Pay on Delivery</span></div>
              </div>

              <div @click="setPaymentMethod('Card')" class="relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center gap-3 hover:shadow-md" :class="form.paymentMethod === 'Card' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 hover:border-blue-200 bg-white'">
                 <div v-if="form.paymentMethod === 'Card'" class="absolute top-3 right-3 text-blue-500"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg></div>
                 <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></div>
                 <div><span class="block font-bold text-gray-900">Card</span><span class="text-xs text-gray-500">Visa / Master</span></div>
              </div>
            </div>

            <transition name="fade">
              <div v-show="form.paymentMethod === 'Card'" class="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-inner">
                 <div id="card-element" class="p-1"></div>
                 <div class="flex items-center gap-2 mt-4 text-xs text-gray-400 font-medium">
                   <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   Encrypted & Secure Payment by Stripe
                 </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="lg:col-span-5">
           <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-10">
            <h2 class="text-2xl font-extrabold mb-8 flex items-center justify-between">
               Order Summary
               <span class="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ cartStore.totalItems }} Items</span>
            </h2>

            <div class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
               <div v-for="item in cartStore.items" :key="item._id" class="flex items-start gap-4">
                 <div class="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 p-1 flex-shrink-0 relative">
                    <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply" />
                    <!-- Discount indicator -->
                    <div v-if="item.hasDiscount" class="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span class="text-[8px] text-white font-bold">%</span>
                    </div>
                 </div>
                 <div class="flex-1">
                    <h4 class="font-bold text-sm text-gray-900 line-clamp-1">{{ item.name }}</h4>
                    <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                    <span v-if="item.hasDiscount" class="text-[10px] font-bold text-red-500">DISCOUNTED</span>
                 </div>
                 <!-- Price with strikethrough for discounts -->
                 <div class="text-right">
                   <div v-if="item.hasDiscount && item.originalPrice" class="flex flex-col items-end">
                     <span class="text-xs text-gray-400 line-through">${{ (item.originalPrice * item.quantity).toFixed(2) }}</span>
                     <span class="font-bold text-sm text-red-500">${{ (item.price * item.quantity).toFixed(2) }}</span>
                   </div>
                   <span v-else class="font-bold text-sm">${{ (item.price * item.quantity).toFixed(2) }}</span>
                 </div>
               </div>
            </div>

            <div class="border-t border-dashed border-gray-200 pt-6 space-y-3">
               <div class="flex justify-between text-gray-500"><span>Subtotal</span><span>${{ cartStore.subtotal.toFixed(2) }}</span></div>
               <div class="flex justify-between text-gray-500"><span>Shipping</span><span>${{ shippingCost.toFixed(2) }}</span></div>
               <div class="flex justify-between text-gray-500"><span>Tax (8%)</span><span>${{ (cartStore.subtotal * 0.08).toFixed(2) }}</span></div>
               <div class="flex justify-between font-extrabold text-2xl text-gray-900 pt-4 border-t border-gray-100 mt-4">
                 <span>Total</span><span class="text-[#009200]">${{ totalCost.toFixed(2) }}</span>
               </div>
            </div>

            <button
              @click="handleCheckout"
              :disabled="isProcessing"
              class="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-black transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>{{ form.paymentMethod === 'Bakong' ? 'Generate QR & Pay' : 'Place Order' }}</span>
              <svg v-if="!isProcessing" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

            <p class="text-center text-xs text-gray-400 mt-4">30-Day Money Back Guarantee</p>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "vue-toastification";

export default defineComponent({
  name: 'CheckoutView',
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const toast = useToast();

    const isProcessing = ref(false);
    const orderSuccess = ref(false);

    // BAKONG STATES
    const showBakongModal = ref(false);
    const dynamicQR = ref('');
    const currentOrderId = ref('');
    const timeLeft = ref(900); // 15 minutes in seconds
    let pollingInterval: any = null;
    let timerInterval: any = null;

    // STRIPE SETUP
    const stripePromise = loadStripe('pk_test_51SqrHNRy9Ghp6pibtv9MeH7KlqLVHpNwTL4qVXY9wmjDFgAi2n9q9WZWYUQYUtRKOpKjzoy5di5UnTRqIfma0acR001Bkl2B0n');
    let stripe: any = null;
    let elements: any = null;
    let cardElement: any = null;

    const shippingCost = ref(5.00);
    const totalCost = computed(() => cartStore.subtotal + shippingCost.value + (cartStore.subtotal * 0.08));

    const form = reactive({
      firstName: '', lastName: '', address: '', city: '',
      country: 'Cambodia', postalCode: '', phone: '', paymentMethod: 'Bakong'
    });

    onMounted(async () => {
      stripe = await stripePromise;
      elements = stripe.elements();
      cardElement = elements.create('card', {
        style: { base: { fontSize: '16px', color: '#1f2937' }, invalid: { color: '#ef4444' } },
        hidePostalCode: true
      });
      cardElement.mount('#card-element');
    });

    onUnmounted(() => {
        clearIntervals();
    });

    const clearIntervals = () => {
        if (pollingInterval) clearInterval(pollingInterval);
        if (timerInterval) clearInterval(timerInterval);
    };

    const setPaymentMethod = (method: string) => { form.paymentMethod = method; };

    // Format seconds into MM:SS
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const startTimer = () => {
        timeLeft.value = 900; // Reset to 15 mins
        timerInterval = setInterval(() => {
            if (timeLeft.value > 0) timeLeft.value--;
            else {
                closeBakongModal();
                toast.error("QR Code Expired. Please try again.");
            }
        }, 1000);
    };

    const startPolling = (orderId: string) => {
        startTimer(); // Start visual countdown
        pollingInterval = setInterval(async () => {
            try {
                const res = await api.get(`/orders/${orderId}/payment`);
                if (res.data.paid) {
                    clearIntervals();
                    showBakongModal.value = false;
                    cartStore.clearCart();
                    orderSuccess.value = true;
                    toast.success("Payment Received Successfully!");
                }
            } catch (e) { console.error("Polling Error:", e); }
        }, 3000);
    };

    const closeBakongModal = () => {
        clearIntervals();
        showBakongModal.value = false;
        isProcessing.value = false;
    };

    const handleCheckout = async () => {
      if (cartStore.items.length === 0) return toast.error("Your cart is empty!");

      // 🟢 ADDED 'postalCode' to validation list
      const requiredFields = ['firstName', 'lastName', 'address', 'city', 'phone', 'postalCode'];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (requiredFields.some((f) => !form[f as keyof typeof form])) {
        return toast.warning("Please fill in all shipping details, including Postal Code.");
      }

      isProcessing.value = true;

      try {
        let paymentInfo = { isPaid: false, paidAt: null };

        // 1. STRIPE FLOW
        if (form.paymentMethod === 'Card') {
            const amountInCents = Math.round(totalCost.value * 100);
            const { data: { clientSecret } } = await api.post('/payment/create-payment-intent', { amount: amountInCents });
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement, billing_details: { name: `${form.firstName} ${form.lastName}`, address: { line1: form.address, city: form.city, country: 'US' } } }
            });
            if (result.error) throw new Error(result.error.message);
            if (result.paymentIntent.status === 'succeeded') paymentInfo = { isPaid: true, paidAt: new Date() as any };
        }

        // 2. CREATE ORDER
        const orderPayload = {
          orderItems: cartStore.items.map(item => ({
            product: item._id, name: item.name, quantity: item.quantity, price: item.price, image: item.image
          })),
          shippingAddress: { ...form },
          paymentMethod: form.paymentMethod,
          itemsPrice: cartStore.subtotal,
          shippingPrice: shippingCost.value,
          totalPrice: totalCost.value,
          isPaid: paymentInfo.isPaid,
          paidAt: paymentInfo.paidAt
        };

        const { data } = await api.post('/orders', orderPayload);

        // 3. BAKONG FLOW
        if (form.paymentMethod === 'Bakong' && data.isBakong) {
            dynamicQR.value = data.qrImage;
            currentOrderId.value = data._id;
            showBakongModal.value = true;
            isProcessing.value = false;
            startPolling(data._id);
            return;
        }

        // 4. OTHER METHODS
        cartStore.clearCart();
        orderSuccess.value = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "Checkout Failed");
      } finally {
        if (!showBakongModal.value) isProcessing.value = false;
      }
    };

    const goToHistory = () => router.push('/order-history');

    return {
      cartStore, form, isProcessing, orderSuccess,
      shippingCost, totalCost, handleCheckout, setPaymentMethod, goToHistory,
      showBakongModal, dynamicQR, closeBakongModal, timeLeft, formatTime
    };
  }
});
</script>

<style scoped>
.input-modern {
  width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; padding: 14px 16px; border-radius: 12px; outline: none; font-weight: 500; transition: all 0.2s;
}
.input-modern:focus { background: white; border-color: #009200; box-shadow: 0 0 0 4px rgba(0, 146, 0, 0.1); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e5e5; border-radius: 20px; }

/* Modal Animation */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
