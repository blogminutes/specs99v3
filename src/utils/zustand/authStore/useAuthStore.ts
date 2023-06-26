import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";
import { Dispatch, SetStateAction } from "react";

export type ApiContextType = ReturnType<typeof api.useContext>;

export const signUp = async (
  apiContext: ApiContextType,
  name: string,
  email: string,
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const res = await apiContext.authentication["sign-up"].fetch({
      name,
      email,
      password,
    });

    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    setIsLoading(false);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.message || "Something Went Wrong!");
    setIsLoading(false);
  }
};
