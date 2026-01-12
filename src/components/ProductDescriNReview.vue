<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('description')
</script>

<template>
  <div class="w-4/5 border border-[#B0B0B0] rounded-lg">
    <!-- INNER CONTENT WITH PADDING -->
    <div class="px-12 py-6 flex flex-col gap-3">
      <!-- TABS -->
      <div class="flex gap-20 text-xl text-black font-medium">
        <button
          class="cursor-pointer hover:text-[#008C00]"
          :class="{ 'text-[#008C00]': activeTab === 'description' }"
          @click="activeTab = 'description'"
        >
          Description
        </button>

        <button
          class="cursor-pointer hover:text-[#008C00]"
          :class="{ 'text-[#008C00]': activeTab === 'reviews' }"
          @click="activeTab = 'reviews'"
        >
          Reviews
        </button>
      </div>
    </div>

    <!-- HR WITH NO PX -->
    <hr class="border-[#B0B0B0]" />

    <!-- CONTENT -->
    <div class="px-12 py-6 text-black">
      <p>Your dog will never get enough of the KONG Scrunch Knots Fox! The snuggly fox doesn’t just look good on the surface, it’s also packing a punch underneath the soft fur. A robust coiled rope with flexible sides makes the fox especially durable and realistic. This means the toy will keep your dog happy for a long time. The KONG Scrunch Knots Fox does not have a lot of filling, so is best suited to light or medium strength chewers. The fox is perfect for a game of tug, and the integrated squeaker will get your dog even more excited. You can buy this toy in various sizes.<br><br><strong>The KONG Scrunch Knots Fox at a glance:</strong><br>• Cuddly dog toy which looks like a little fox<br>• For games of tug as well as playing alone<br>• Integrated coiled rope for lots of fun<br>• Stretchy sides for realistic movements<br>• Robustly made with only a small amount of filling<br>• Squeaker in the head to make games of tug even more exciting<br>• Available in different sizes, for light and medium strength chewers<br>• Colour: Orange / White<br>• Material: polyester fur (outer) / cotton rope (inner)<br>• Size:<br>&nbsp;&nbsp;&nbsp;&nbsp;• S/M: 26.5 x 8 x 5 cm (L x W x H)<br>&nbsp;&nbsp;&nbsp;&nbsp;• M/L: 40 x 11 x 8 cm (L x W x H)<br><br>Please note: No toy is completely indestructible. As with any other product, please supervise your pet with this toy. Check the product regularly for damage, and replace the toy if it is damaged or missing any pieces to avoid potential injury to your pet.</p>

      <p v-if="activeTab === 'reviews'"></p>
    </div>
  </div>
</template>


