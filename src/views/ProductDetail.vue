<script lang="ts">
import ArrowButtonLeft from '@/components/ArrowButtonLeft.vue';
import ArrowButtonRight from '@/components/ArrowButtonRight.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductDescriNReview from '@/components/ProductDescriNReview.vue';
import ProductImageDetail from '@/components/ProductImageDetail.vue';
import ProductInfoDetail from '@/components/ProductInfoDetail.vue';

export default {
    name: 'ProductDetail',
    components: { ProductImageDetail, ProductInfoDetail, ArrowButtonLeft, ArrowButtonRight, ProductCard, ProductDescriNReview}
}
</script>
<template>
    <div class="flex flex-col gap-5 px-[70px]">
        <div class="flex items-start gap-20">
            <ProductImageDetail />
            <ProductInfoDetail productName="KONG Scrunch Knots Fox" rating=4 description="This crazy toy scrunches around an internal coiled rope and has stretchy sides for realistic movement. The toy is fluffy yet durable, and there is an integrated squeaker in the head of the fox." price="66.77"/>
        </div>
        <div class="flex flex-col gap-5 pt-18">
            <h1 class="text-black text-2xl font-semibold">Products you might find interesting</h1>
            <div class="flex items-center gap-6 pt-6">
                <ArrowButtonLeft/>
                <ProductCard 
                    productName="Product"
                    rating=3
                    description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
                    price="66.77"
                />
                <ProductCard 
                    productName="Product"
                    rating=3
                    description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
                    price="66.77"
                />
                <ProductCard 
                    productName="Product"
                    rating=3
                    description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
                    price="66.77"
                />
                <ProductCard 
                    productName="Product"
                    rating=3
                    description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
                    price="66.77"
                />
                <ProductCard 
                    productName="Product"
                    rating=3
                    description="This toy also has an attractive design and cute features, such as spikes on its back and embroidered detail. "
                    price="66.77"
                />
                <ArrowButtonRight />
            </div>
        </div>
        <div class="pt-20">
            <section id="des">
                <ProductDescriNReview/>
            </section>

        </div>
    </div>
</template>