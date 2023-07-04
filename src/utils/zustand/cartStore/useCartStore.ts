import { CartProduct, Product, User } from "@prisma/client";
import { create } from "zustand";
import { ApiContextType } from "../authStore/useAuthStore";
import { toast } from "react-toastify";

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
    subtotal: number | null;
  }) => void;
  subtotal: number | null;
  cartIsLoading: boolean;
  setCartIsLoading: (cartisLoading: boolean) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  id: null,
  userId: null,
  user: null,
  items: null,
  setCart: ({ id, items, userId, subtotal }) => {
    set({ id, items, userId, subtotal });
  },
  subtotal: null,
  cartIsLoading: false,
  setCartIsLoading: (cartIsLoading) => {
    set({ cartIsLoading });
  },
}));

// export const getUserCart = async (input: {
//   apiContext: ApiContextType;
//   cartStore: CartStore;
//   userId: number;
// }) => {
//   const cart = await input.apiContext.user.getCart.fetch({
//     userId: input.userId,
//   });
//   input.cartStore.setCart({
//     id: cart?.id || null,
//     items: cart?.items || null,
//     userId: input.userId,
//   });
// };

export const addToCart = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  cartId: number;
  product: Product;
  quantity: number;
}) => {
  try {
    const { apiContext, cartId, cartStore, product, quantity } = input;

    cartStore.setCartIsLoading(true);

    const productExist = cartStore.items?.find(
      (item) => item.productId === product.id
    );

    if (!productExist) {
      const res = await apiContext.user.addToCart.fetch({
        cartId: cartId,
        productId: product.id,
        quantity: quantity,
      });

      cartStore.setCart({
        id: cartId,
        items: [
          ...(cartStore.items || []),
          { cartId, id: res.id, product, quantity, productId: product.id },
        ],
        subtotal: (cartStore.subtotal || 0) + quantity * product.price,
        userId: cartStore.userId,
      });

      toast.success("Item added to cart!");
    } else {
      toast.info("Product already exist!");
    }
    cartStore.setCartIsLoading(false);
  } catch (error) {
    input.cartStore.setCartIsLoading(false);
  }
};

export const removeFromCart = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  cartProduct: CartItem;
}) => {
  try {
    const { apiContext, cartStore, cartProduct } = input;

    cartStore.setCartIsLoading(true);

    await apiContext.user.removeFromCart.fetch({
      cartProductId: cartProduct.id,
    });

    const updatedCart = cartStore.items?.filter(
      (it) => it.productId !== cartProduct.productId
    );

    cartStore.setCart({
      id: cartStore.id,
      items: updatedCart || [],
      subtotal:
        (cartStore.subtotal || 0) -
        cartProduct.quantity * cartProduct.product.price,
      userId: cartStore.userId,
    });

    toast.success("Item removed from cart!");

    cartStore.setCartIsLoading(false);
  } catch (error) {
    input.cartStore.setCartIsLoading(false);
  }
};
