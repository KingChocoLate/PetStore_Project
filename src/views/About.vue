<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">

    <section class="relative bg-[#F8F9FA] overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>

      <div class="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div class="flex-1 text-center lg:text-left">
            <span class="inline-block py-1 px-3 rounded-full bg-green-100 text-[#009200] text-xs font-bold tracking-widest uppercase mb-6">
              Est. 2025
            </span>
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              More Than a Store, <br>
              We Are <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#009200] to-emerald-600">Family.</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Welcome to PetStore+, where every tail wag and purr matters.
              We provide premium quality for your furry, feathery, and scaly friends.
            </p>
            <router-link
              to="/shop"
              class="inline-flex items-center gap-2 px-8 py-4 bg-[#009200] text-white rounded-full font-bold hover:bg-[#007a00] transition shadow-lg shadow-green-200 hover:-translate-y-1"
            >
              Shop Now
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </router-link>
          </div>

          <div class="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div class="relative z-10 bg-white p-2 rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
               <img :src="heroImage" alt="Happy Pet Owner" class="w-full h-auto rounded-[2.5rem] bg-gray-50" />
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-[1280px] mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div class="order-2 lg:order-1">
             <div class="relative">
                <img :src="storyImage" alt="Store Interior" class="rounded-3xl shadow-xl w-full object-cover h-[500px]" />
                <div class="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                   <div class="flex gap-8">
                      <div class="text-center">
                         <div class="text-2xl font-bold text-[#009200]">5k+</div>
                         <div class="text-xs text-gray-500 font-bold uppercase">Happy Pets</div>
                      </div>
                      <div class="w-px bg-gray-200"></div>
                      <div class="text-center">
                         <div class="text-2xl font-bold text-[#009200]">100+</div>
                         <div class="text-xs text-gray-500 font-bold uppercase">Brands</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div class="order-1 lg:order-2">
            <h2 class="text-3xl font-bold mb-6">Our Story</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              It started with a simple goal: to bring happiness, comfort, and care to every pet.
              We believe that pets aren't just animals; they are members of the family.
            </p>
            <p class="text-gray-600 mb-8 leading-relaxed">
              That's why we curate only the healthiest food, the safest toys, and the most modern accessories.
            </p>

            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-8 bg-[#009200] rounded-full"></span>
                Our Approach
              </h3>
              <ul class="space-y-4">
                <li v-for="(item, index) in approachList" :key="index" class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 text-[#009200] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span class="text-gray-700 text-sm font-medium">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-20 bg-[#F9FDF9]">
      <div class="max-w-[1280px] mx-auto px-6 md:px-12">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Why Pet Parents Choose Us</h2>
          <p class="text-gray-500">We don't just sell products; we deliver happiness and health directly to your doorstep.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(feature, index) in features" :key="index" class="bg-white p-8 rounded-2xl shadow-sm border border-green-50/50 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
            <div class="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#009200] mb-6 group-hover:bg-[#009200] group-hover:text-white transition-colors">
               <div v-html="feature.icon" class="w-7 h-7"></div>
            </div>
            <h3 class="font-bold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white overflow-hidden">
      <div class="max-w-[1280px] mx-auto px-6 md:px-12">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Loved by Pets <span class="text-[#009200]">&</span> Humans</h2>
          <p class="text-gray-500">See what our furry customers have to say about their new treats and toys!</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div
            v-for="review in reviews"
            :key="review.name"
            class="relative bg-[#009200] rounded-3xl p-8 pt-12 shadow-xl shadow-green-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group"
          >
            <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
               <svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22L6.5 17.5zm11 0l-7.52-3.22 7.52-3.22 1.5 6.44z"/></svg> </div>

            <div class="absolute -top-10 left-1/2 -translate-x-1/2">
               <div class="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img :src="review.petImage" :alt="review.petName" class="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
               </div>
            </div>

            <div class="flex justify-center text-[#FFD700] mb-6 mt-4 gap-1">
               <span v-for="star in 5" :key="star">
                 <svg class="w-5 h-5 fill-current drop-shadow-sm" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
               </span>
            </div>

            <p class="text-white font-medium text-center italic mb-8 leading-relaxed flex-grow">
              "{{ review.text }}"
            </p>

            <div class="text-center border-t border-white/20 pt-6 mt-auto">
              <h4 class="font-bold text-lg text-white mb-1">{{ review.name }}</h4>
              <p class="text-xs text-green-100 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                 Owner of {{ review.petName }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import heroImage from '../assets/images/about_page_img.png';
import storyImage from '../assets/photos/shop.png';

export default defineComponent({
  name: 'AboutPage',
  setup() {

    const approachList = [
      "Healthy and nutritious food for dogs, cats, and small animals",
      "Accessories such as collars, toys, harnesses, grooming tools, and beds",
      "Daily essentials made with pet-friendly materials",
      "Modern designs that fit your pet's lifestyle"
    ];

    const features = [
      {
        title: 'Free Shipping',
        desc: 'No hidden fees. Delivered straight to your door, fast and free.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      },
      {
        title: 'Healthy & Nutritious',
        desc: 'Only the best ingredients for your dogs, cats, and small animals.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'
      },
      {
        title: 'Easy Returns',
        desc: 'Changed your mind? No worries. Our return process is stress-free.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>'
      },
      {
        title: 'Eco-Friendly',
        desc: 'Sustainable products that are good for your pet and the planet.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      }
    ];

    // Using Unsplash images for REAL Pets!
    const reviews = [
      {
        name: "Kakaka Jong",
        petName: "Max (The Golden)",
        petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=300&auto=format&fit=crop",
        text: "I absolutely love shopping at PetStore+! The website is super easy to navigate, and I found everything I needed for my puppy in just a few clicks."
      },
      {
        name: "Sarah Smith",
        petName: "Luna (The Tabby)",
        petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&auto=format&fit=crop",
        text: "The quality of the food is amazing. My cat is usually very picky, but she loves the premium brands you carry. Highly recommended!"
      },
      {
        name: "James Doi",
        petName: "Rocky (Bulldog)",
        petImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300&auto=format&fit=crop",
        text: "Super fast shipping and the packaging was so cute. You can really tell they care about pets. Will definitely be buying again."
      },
      {
        name: "Emily Chen",
        petName: "Nibbles (Hamster)",
        petImage: "https://headsupfortails.com/cdn/shop/articles/Hamster_10.jpg?v=1645258342",
        text: "Great selection of toys. My hamster loves the new wheel I bought. Customer service was very helpful when I had a question."
      }
    ];

    return {
      heroImage,
      storyImage,
      approachList,
      features,
      reviews
    };
  }
});
</script>
