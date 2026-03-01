import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface Cart {
  total: number;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      total: 0,
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((el) => el.id === item.id);

          if (existingItem) {
            return {
              total: state.total + item.price,
              items: state.items.map((el) =>
                el.id === item.id ? { ...el, quantity: el.quantity + 1 } : el,
              ),
            };
          }

          return {
            total: state.total + item.price,
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const existingItem = state.items.find((el) => el.id === id);

          if (!existingItem) return state;

          return {
            total: Math.max(0, state.total - existingItem.price),
            items: state.items
              .map((el) =>
                el.id === id ? { ...el, quantity: el.quantity - 1 } : el,
              )
              .filter((el) => el.quantity > 0),
          };
        });
      },
      clearCart: () => {
        set((state) => {
          return {
            items: [],
            total: 0,
          };
        });
      },
    }),
    { name: "cart" },
  ),
);
