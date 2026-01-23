import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    // Load from local storage if available, otherwise start empty
    items: JSON.parse(localStorage.getItem('cartItems') || '[]') as any[],
  }),

  getters: {
    // Count total items (e.g., 2 shirts + 1 hat = 3 items)
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    // Calculate total price
    subtotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
  },

  actions: {
    addToCart(product: any) {
      // Check if item is already in cart
      const existingItem = this.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          _id: product._id,
          name: product.name,
          price: Number(product.price),
          image: product.imageUrl || product.image, // Handle backend vs frontend naming
          category: product.category,
          quantity: 1,
        });
      }
      this.saveToLocalStorage();
    },

    removeFromCart(productId: string) {
      this.items = this.items.filter((item) => item._id !== productId);
      this.saveToLocalStorage();
    },

    updateQuantity(productId: string, change: number) {
      const item = this.items.find((item) => item._id === productId);
      if (item) {
        item.quantity += change;
        // If quantity drops to 0, remove the item
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
      this.saveToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    // Manual saving function (Works without plugins)
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  },
});
