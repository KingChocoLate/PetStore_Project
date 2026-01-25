<template>
  <div class="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h1>

    <div class="space-y-6 max-w-3xl mx-auto">
      <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ faq.question }}</h3>
        <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FAQs',
  setup() {
    const faqs = ref([
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for all unused items in their original packaging. Please contact our support team to initiate a return.'
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes, we offer free shipping on all orders over $50. For orders under $50, a standard shipping fee applies.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive a tracking number via email. You can also view your order status in your Order History.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within the country. We hope to expand our shipping options in the future.'
      }
    ]);

    return { faqs };
  }
});
</script>
