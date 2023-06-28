import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/shared/Navbar";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";
import { useEffect, useRef } from "react";

const roboto = Roboto({
  weight: ["400", "500", "300", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref]);
  return (
    <SessionProvider session={pageProps.session}>
      <main
        className={`min-h-[100vh] bg-bg-primary p-8 text-[#343a40]   max-[1200px]:p-0 ${roboto.className}`}
      >
        <div
          ref={ref}
          className="relative mx-auto max-h-[calc(100vh-4rem)] overflow-auto rounded-2xl shadow-primary-sm max-[1200px]:h-fit max-[1200px]:max-h-fit"
        >
          <ToastContainer position="bottom-left" />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
