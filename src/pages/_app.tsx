import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/shared/Navbar";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getUser, useAuthStore } from "~/utils/zustand/authStore/useAuthStore";

const roboto = Roboto({
  weight: ["400", "500", "300", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const authPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const MyApp: AppType = ({ Component, pageProps }) => {
  const authStore = useAuthStore((s) => s);

  useEffect(() => {
    getUser(authStore);
  }, []);

  return (
    <main
      className={`min-h-[100vh] bg-primary pt-8 text-[#343a40] ${roboto.className}`}
    >
      <div className="container mx-auto">
        <ToastContainer position="bottom-left" />
        <Navbar />
        <Component {...pageProps} />
      </div>
    </main>
  );
};

export default api.withTRPC(MyApp);
