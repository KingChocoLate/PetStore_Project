<template>
  <div class="min-h-screen bg-white px-8 md:px-16 pb-4">
    
    <div class="pb-8">
      <Menu 
        layout="row" 
        :items="topTabs" 
        activeItem="All" 
        
      />
    </div>

    <div class="flex flex-col lg:flex-row gap-12">
      
      <aside class="w-full lg:w-64  space-y-8">
        <div class="mb-[10px]">
          <Menu 
            title="Categories" 
            :items="categoryItems" 
            activeItem="All"
            
          />
        </div>

        <div class="h-px bg-[#8A8A8A] w-3/4 mx-auto"></div>

        <div>
          <Menu 
            title="Sort by" 
            :items="sortItems" 
            activeItem="Default"
            
          />
        </div>

        <div class="h-px bg-[#8A8A8A] w-3/4 mx-auto"></div>

        <div>
          <Menu 
            title="Filter by brand" 
            :items="brandItemsWithAll" 
            activeItem="All"
            
          />
        </div>
      </aside>

      <main class="flex-1">
        <div class="py-20 text-center text-gray-600">
            Product Card section
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from '../components/Menu.vue'

export default defineComponent({
  name: 'Shop',
  components: {
    Menu,
  },
  setup() {
    // --- Menu Options (Static Data) ---
    const topTabs = ['All', 'Cat', 'Dog', 'Small Pet', 'Bird', 'Fish']
    const categoryItems = ['All', 'Food', 'Toy', 'Accessories']
    const sortItems = ['Default', 'Popularity', 'Average rating', 'Price: Low to High', 'Price: High to Low', 'Newness']
    const brandItems = ['Brand', 'Brand', 'Brand', 'Brand', 'Brand']
    const brandItemsWithAll = ['All', ...brandItems]

    
    return {
      topTabs,
      categoryItems,
      sortItems,
      brandItemsWithAll,
    }
  }
})
</script>