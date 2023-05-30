import { create } from "zustand";
import { Client, Account } from "appwrite";
const client = new Client();
const account = new Account(client);
import { toast } from "react-toastify";
import { IAuthStore, IUser } from "./authTypes";

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64751786b57ca0d8e835"); // Your project ID

export const useAuthStore = create<IAuthStore>((set) => ({
  loggedIn: false,
  user: null,
  setUser: (loggedIn, user) => {
    set({ loggedIn, user });
  },
}));

export const getUser = async (authStore: IAuthStore) => {
  try {
    const userDetails = await account.get();
    authStore.setUser(true, userDetails);
  } catch (error: any) {
    authStore.setUser(true, null);
    // toast.error(error?.message || "Something Went Wrong!");
  }
};

export const loginUser = async (
  email: string,
  password: string,
  authStore: IAuthStore
) => {
  try {
    await account.createEmailSession(email, password);
    const userDetails = await account.get();
    authStore.setUser(true, userDetails);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.message || "Something Went Wrong!");
  }
};
