import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import {
  Cart,
  CartItem,
  useCartStore,
} from "~/utils/zustand/cartStore/useCartStore";

const UserDataFunctions = () => {
  const apiContext = api.useContext();

  const cartStore = useCartStore((c) => c);

  const { data, status } = useSession();

  useEffect(() => {
    if (!cartStore.id && data?.user.id && data.user.cart) {
      let subtotal = 0;
      data.user.cart.items.forEach((item) => {
        subtotal += item.quantity * item.product.price;
      });
      cartStore.setCart({
        id: data.user.cart?.id,
        items: data.user.cart?.items,
        userId: data.user.id,
        subtotal,
      });
    } else if (!cartStore.items && !data?.user && status === "loading") {
      const cart: Cart | null = JSON.parse(localStorage.getItem("cart") || "");
      if (cart)
        cartStore.setCart({
          id: null,
          items: cart.items,
          subtotal: cart.subtotal,
          userId: null,
        });
    }
  }, [data?.user]);

  return null;
};

export default UserDataFunctions;
