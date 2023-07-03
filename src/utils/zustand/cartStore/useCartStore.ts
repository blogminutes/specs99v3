import { CartProduct, Product, User } from "@prisma/client";
import { create } from "zustand";
import { ApiContextType } from "../authStore/useAuthStore";

interface CartItem extends CartProduct {
  product: Product;
}

type CartStore = {
  id: number | null;
  userId: number | null;
  items: CartItem[] | null;
  setCart: (input: {
    id: number | null;
    userId: number | null;
    items: CartItem[] | null;
  }) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  id: null,
  userId: null,
  user: null,
  items: null,
  setCart: ({ id, items, userId }) => {
    set({ id, items, userId });
  },
}));

export const getUserCart = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  userId: number;
}) => {
  const cart = await input.apiContext.user.getCart.fetch({
    userId: input.userId,
  });
  input.cartStore.setCart({
    id: cart?.id || null,
    items: cart?.items || null,
    userId: input.userId,
  });
};

export const addToCart = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  cartId: number;
  productId: number;
  quantity: number;
}) => {
  const cart = await input.apiContext.user.addToCart.fetch({
    cartId: input.cartId,
    productId: input.productId,
    quantity: input.quantity,
  });
  console.log(cart);
};
