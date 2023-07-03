import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/utils/api";
import {
  getUserCart,
  useCartStore,
} from "~/utils/zustand/cartStore/useCartStore";

const UserDataFunctions = () => {
  const apiContext = api.useContext();

  const cartStore = useCartStore((c) => c);

  const { data } = useSession();

  useEffect(() => {
    if (!cartStore.id && data?.user.id) {
      getUserCart({ apiContext, cartStore, userId: data.user.id });
    }
  }, [data, cartStore]);

  return null;
};

export default UserDataFunctions;
