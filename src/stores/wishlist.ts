import { defineStore } from 'pinia';

interface WishlistItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stockStatus: string; // 'In Stock' or 'Out of Stock'
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as WishlistItem[],
  }),

  getters: {
    totalItems: (state) => state.items.length,
    // Check if a specific ID is already in wishlist (for the heart icon color)
    isInWishlist: (state) => (id: string) => state.items.some(item => item._id === id),
  },

  actions: {
    toggleWishlist(product: any) {
      const index = this.items.findIndex(item => item._id === product._id);

      if (index === -1) {
        // Add to wishlist
        this.items.push({
          _id: product._id,
          name: product.name,
          category: product.category || 'Accessory',
          price: product.price,
          image: product.image,
          stockStatus: 'In Stock' // Defaulting to In Stock for now
        });
      } else {
        // Remove if already there
        this.items.splice(index, 1);
      }
    },

    removeFromWishlist(id: string) {
      this.items = this.items.filter(item => item._id !== id);
    }
  },

  persist: true
});
