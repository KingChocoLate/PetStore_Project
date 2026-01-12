<script setup>
    import { ref } from 'vue';
    import WhiteButton from './WhiteButton.vue';
    import ButtonGreen from './ButtonGreen.vue';
    const props = defineProps({
        productName: String,
        rating: Number,
        description: String,
        price: Number
    });
    const quantity = ref(1)
    const increment = () => {
        quantity.value++
    }

    const decrement = () => {
        if (quantity.value > 1) quantity.value--
    }
</script>
<template>
    <div class="w-1/2 flex flex-col gap-6 pl-8">
        <h1 class="text-black text-3xl font-semibold">{{ productName }}</h1>
        <div class="flex items-center text-xl">
          <!-- Rating stars using v-for -->
          <span class="flex gap-0.5">
            <font-awesome-icon
              v-for="i in Math.floor(props.rating ?? 0)"
              :key="'filled' + i"
              icon="fa-solid fa-star"
              class="text-[#fdbc2c]"
            />
            <font-awesome-icon
              v-for="i in 5 - Math.floor(props.rating ?? 0)"
              :key="'empty' + i"
              icon="fa-regular fa-star"
              class="text-gray-300"
            />
          </span>
        </div>
        <p class="text-black text-xs wrap-break-word line-clamp-3 px-1">
          {{ description }}<a href="#des"><span class="text-[#008C00] cursor-pointer"> ...further information</span></a>
        </p>
        <h3 class="text-[#008C00] text-3xl font-bold">
            ${{ price }}
        </h3>
        <div class="flex gap-5">
            <div class="flex items-center gap-5">
                <div class="flex items-center gap-5">
                    <font-awesome-icon
                        icon="minus"
                        key="minus-icon" 
                        class="text-[#008C00] text-xl cursor-pointer"
                        @click="decrement"
                    />

                    <span class="text-2xl text-black min-w-6 text-center">{{ quantity }}</span>

                    <font-awesome-icon
                        icon="plus"
                        key="plus-icon"
                        class="text-[#008C00] text-xl cursor-pointer"
                        @click="increment"
                    />
                </div>
            </div>
            <WhiteButton buttonTittle="Add to cart"/>
        </div>
        <ButtonGreen tittle="Buy now" />
      </div>

</template>