import { CartProduct, Product, User } from "@prisma/client";
import { create } from "zustand";
import { ApiContextType } from "../authStore/useAuthStore";
import { toast } from "react-toastify";

export interface CartItem {
  product: Product;
  id: number | null;
  cartId: number | null;
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number | null;
  userId: number | null;
  items: CartItem[] | null;
  subtotal: number | null;
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
  subtotal: 0,
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
  cartId: number | null;
  product: Product;
  quantity: number;
}) => {
  try {
    const { apiContext, cartId, cartStore, product, quantity } = input;

    cartStore.setCartIsLoading(true);

    const productExist = cartStore.items?.find(
      (item) => item.productId === product.id
    );

    if (!productExist && cartId) {
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
    } else if (!productExist && !cartId) {
      const updatedCart = {
        id: cartId,
        items: [
          ...(cartStore.items || []),
          { cartId, id: null, product, quantity, productId: product.id },
        ],
        subtotal: (cartStore.subtotal || 0) + quantity * product.price,
        userId: cartStore.userId,
      };
      cartStore.setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.success("Product already exist!");
    }
    cartStore.setCartIsLoading(false);
  } catch (error) {
    input.cartStore.setCartIsLoading(false);
  }
};

export const updateCartProductQuantity = async (input: {
  apiContext: ApiContextType;
  cartStore: CartStore;
  cartProduct: CartItem;
  quantity: number;
}) => {
  try {
    const { apiContext, cartStore, cartProduct, quantity } = input;

    cartStore.setCartIsLoading(true);

    if (cartProduct.id) {
      await apiContext.user.updateCartProduct.fetch({
        cartProductId: cartProduct.id,
        quantity: quantity,
      });

      let subtotal = 0;

      const updatedCart = cartStore.items?.map((it) => {
        if (it.id === cartProduct.id) {
          it.quantity = quantity;
          subtotal += it.quantity * it.product.price;
          return it;
        }
        subtotal += it.quantity * it.product.price;
        return it;
      });

      cartStore.setCart({
        id: cartStore.id,
        items: updatedCart || [],
        subtotal: subtotal,
        userId: cartStore.userId,
      });
    } else if (!cartProduct.id) {
      let subtotal = 0;

      const updatedCartItems = cartStore.items?.map((it) => {
        if (it.productId === cartProduct.productId) {
          it.quantity = quantity;
          subtotal += it.quantity * it.product.price;
          return it;
        }
        subtotal += it.quantity * it.product.price;
        return it;
      });

      const updatedCart = {
        id: cartStore.id,
        items: updatedCartItems || [],
        subtotal: subtotal,
        userId: cartStore.userId,
      };

      cartStore.setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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

    if (cartProduct.id)
      await apiContext.user.removeFromCart.fetch({
        cartProductId: cartProduct.id,
      });

    const updatedCartItems = cartStore.items?.filter(
      (it) => it.productId !== cartProduct.productId
    );

    cartStore.setCart({
      id: cartStore.id,
      items: updatedCartItems || [],
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
