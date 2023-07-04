import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { useCartStore } from "~/utils/zustand/cartStore/useCartStore";

const UserDataFunctions = () => {
  const apiContext = api.useContext();

  const cartStore = useCartStore((c) => c);

  const { data } = useSession();

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
    }
  }, [data?.user, cartStore]);

  return null;
};

export default UserDataFunctions;
