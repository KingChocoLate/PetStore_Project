import { defineStore } from 'pinia';

interface Order {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: string;
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {
    createOrder(cartItems: any[], totalAmount: number) {
      const newOrder: Order = {
        id: '#' + Math.floor(100000 + Math.random() * 900000), // Random 6-digit ID
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cartItems], // Copy items so they don't change if cart changes
        total: totalAmount,
        status: 'Processing'
      };

      // Add to the beginning of the list
      this.orders.unshift(newOrder);
    },
  },

  // Save to browser memory so it persists after refresh
  persist: true
});
