import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<Cart>()(
  persist<Cart>(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const findItem = state.items.find((el) => el.id === item.id);
          if (findItem) {
            return {
              items: state.items.map((el) => {
                if (el.id === item.id)
                  return {
                    ...el,
                    quantity: el.quantity + 1,
                  };
                else return el;
              }),
            };
          } else {
            return {
              items: [...state.items, item],
            };
          }
        });
      },
      removeItem: (id) => {
        set((state) => {
          return {
            items: state.items
              .map((el) => {
                if (el.id == id) return { ...el, quantity: el.quantity - 1 };
                else return el;
              })
              .filter((el) => el.quantity > 0),
          };
        });
      },
    }),
    { name: "cart" },
  ),
);
