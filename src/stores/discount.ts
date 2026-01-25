import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE = "https://petstore-backend-api.onrender.com/api";

interface DiscountInfo {
    type: 'percent' | 'fixed';
    value: number;
    code: string;
}

interface DiscountState {
    discountMap: Record<string, DiscountInfo>;
    isLoaded: boolean;
    isLoading: boolean;
}

export const useDiscountStore = defineStore('discount', {
    state: (): DiscountState => ({
        discountMap: {},
        isLoaded: false,
        isLoading: false
    }),

    getters: {
        // Get discount for a specific product
        getProductDiscount: (state) => (productId: string): DiscountInfo | null => {
            return state.discountMap[productId] || null;
        },

        // Check if product has discount
        hasDiscount: (state) => (productId: string): boolean => {
            return !!state.discountMap[productId];
        },

        // Calculate discounted price
        getDiscountedPrice: (state) => (productId: string, originalPrice: number): number => {
            const discount = state.discountMap[productId];
            if (!discount) return originalPrice;

            if (discount.type === 'percent') {
                return originalPrice * (1 - discount.value / 100);
            } else {
                return Math.max(0, originalPrice - discount.value);
            }
        },

        // Get discount percentage for display (e.g., "-20%")
        getDiscountLabel: (state) => (productId: string): string => {
            const discount = state.discountMap[productId];
            if (!discount) return '';

            if (discount.type === 'percent') {
                return `-${discount.value}%`;
            } else {
                return `-$${discount.value}`;
            }
        }
    },

    actions: {
        async fetchProductDiscounts() {
            if (this.isLoading) return;

            this.isLoading = true;
            try {
                const { data } = await axios.get(`${API_BASE}/promotions/product-discounts`);
                this.discountMap = data;
                this.isLoaded = true;
            } catch (error) {
                console.error('Failed to fetch product discounts:', error);
                this.discountMap = {};
            } finally {
                this.isLoading = false;
            }
        },

        // Refresh discounts (can be called periodically or on promotion changes)
        async refreshDiscounts() {
            this.isLoaded = false;
            await this.fetchProductDiscounts();
        }
    }
});
