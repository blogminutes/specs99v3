import { CartProduct, User } from "@prisma/client";
import { create } from "zustand";
import { ApiContextType } from "../authStore/useAuthStore";

type CartStore = {
  id: number | null;
  userId: number | null;
  user: User | null;
  items: CartProduct[] | null;
  setCart: (input: {
    id: number | null;
    userId: number | null;
    user: User | null;
    items: CartProduct[] | null;
  }) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  id: null,
  userId: null,
  user: null,
  items: null,
  setCart: () => {},
}));

export const getUserCart = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  userId: number;
}) => {
  const cart = await input.apiContext.user.getCart.fetch({
    userId: input.userId,
  });
  console.log(cart);
};
