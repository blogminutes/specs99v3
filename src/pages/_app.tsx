import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/shared/Navbar";

const publicPages = ["/", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        elements: {},
      }}
    >
      <main className="bg-primary pt-8">
        <Navbar />
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl={"/"} />
            </SignedOut>
          </>
        )}
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
