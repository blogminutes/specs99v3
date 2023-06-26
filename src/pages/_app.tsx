import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/shared/Navbar";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";

const roboto = Roboto({
  weight: ["400", "500", "300", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={pageProps?.session}>
      <main
        className={`min-h-[100vh] bg-bg-primary p-8 text-[#343a40]   max-[1200px]:p-0 ${roboto.className}`}
      >
        <div className="relative mx-auto flex h-[calc(100vh-4rem)]  flex-col overflow-auto rounded-2xl shadow-primary-sm max-[1200px]:min-h-[100vh]">
          <ToastContainer position="bottom-left" />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
