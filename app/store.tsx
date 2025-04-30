import { create } from "zustand";

export type CardItem = {
  id: string;
  image: string;
  title: string;
  category: string;
  desc?: string;
};

type ClosetCategory = {
  image: string;
  items: CardItem[];
};

type ClosetState = {
  savedItems: {
    [category: string]: ClosetCategory;
  };
  cartItems: CardItem[];

  // Closet
  addToCloset: (item: CardItem) => void;
  addCategory: (category: string, image?: string) => void;
  removeCategory: (category: string) => void;

  // Cart
  addToCart: (item: CardItem) => void;
  removeFromCart: (id: string) => void;
};

export const useClosetStore = create<ClosetState>((set) => ({
  savedItems: {
    "all saved": {
      image: "",
      items: [],
    },
  },
  cartItems: [],

  // Save to Closet
  addToCloset: (item) =>
    set((state) => {
      const categoryKey = item.category.toLowerCase();
      const updated = { ...state.savedItems };

      if (!updated[categoryKey]) {
        updated[categoryKey] = { image: "", items: [] };
      }

      if (!updated[categoryKey].items.some((i) => i.id === item.id)) {
        updated[categoryKey].items.push(item);
      }

      if (!updated["all saved"].items.some((i) => i.id === item.id)) {
        updated["all saved"].items.push(item);
      }

      return { savedItems: updated };
    }),

  // Add to Cart
  addToCart: (item) =>
    set((state) => {
      if (state.cartItems.some((i) => i.id === item.id)) return state;
      return {
        cartItems: [...state.cartItems, item],
      };
    }),

  // Remove from Cart
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  // Add Closet Category
  addCategory: (category, image = "") =>
    set((state) => {
      const key = category.toLowerCase();
      if (state.savedItems[key]) return state;
      return {
        savedItems: {
          ...state.savedItems,
          [key]: {
            image,
            items: [],
          },
        },
      };
    }),

  // Remove Closet Category
  removeCategory: (category) =>
    set((state) => {
      const updated = { ...state.savedItems };
      const key = category.toLowerCase();
      if (key === "all saved") return state;
      delete updated[key];
      return { savedItems: updated };
    }),
}));
