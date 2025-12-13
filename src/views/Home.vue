<template>
    <div class="h-full mx-[69px]">
        <ShowCase :images="imageList"/>
        <div class=" mt-[69px] mb-[60px]">
            <p class="text-black font-poppins-bold text-[39px]">Shop for your pet</p>
        </div>
            <RouterLink to="/shop" class="flex justify-between"><PetCategory v-for="(cate, index) in petCategory" :key="index" :petImg="cate.img" :petName="cate.name"/></RouterLink>
        <div class=" mt-[70px] mb-[15px]">
            <p class="text-black font-poppins-bold text-[39px]">Top sell brands</p>
        </div>
    </div>
    
</template>

<script lang="ts">
import ShowCase from '@/components/ShowCase.vue';
import PetCategory from '@/components/PetCategory.vue';
import img1 from '@/assets/Rectangle 34.png';
import img2 from '@/assets/Rectangle 31.png';
import img3 from '@/assets/Rectangle 32.png';
import img4 from '@/assets/Rectangle 33.png';
import petImg1 from '@/assets/petImage/Rectangle 131.png';
import petImg2 from '@/assets/petImage/Rectangle 131 (1).png';
import petImg3 from '@/assets/petImage/Rectangle 131 (2).png';
import petImg4 from '@/assets/petImage/Rectangle 131 (3).png';
import petImg5 from '@/assets/petImage/Rectangle 131 (4).png';
    export default {
        name: 'Home',
        components: {
            ShowCase,
            PetCategory
        },
        data() {
            return {
                imageList: [img1, img2, img3, img4],
                petCategory: [
                    {
                        img: petImg1, 
                        name: "Cat"
                    },
                    {
                        img: petImg2,
                        name: "Dog"
                    },
                    {
                        img: petImg3,
                        name: "Small pet"
                    },
                    {
                        img: petImg4,
                        name: "Bird"
                    },
                    {
                        img: petImg5,
                        name: "Fish"
                    }

                ]
            };
        }
    }
</script>