<script lang="ts" setup>
import ProductCard from '../components/ProductCard.vue';
import { toy } from '@/assets';

</script>
<template>
    <div class="flex justify-center items-center">
        <ProductCard 
        productName="Product"
        :rating="3"
        description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
        :price="66.77"
        :image="toy"
    />
    </div>
</template>