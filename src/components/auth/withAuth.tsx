import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type ComponentType, useEffect } from "react";

type WithAuthProps = {
  // Define any specific props your HOC needs
};
// const publicPaths = ["/", "/sign-in*", "/sign-up*"];
const adminPaths = ["/admin*"];

// const isPublic = (path: string) => {
//   return publicPaths.find((x) =>
//     path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
//   );
// };

const isAdmin = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthComponent: ComponentType<P> = (props) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (router) {
        if (
          isAdmin(router.pathname)
          // (status==="authenticated" || data. ?.prefs?.role !== "admin")
        ) {
          router.push("/sign-in");
        }
        // Your authentication logic goes here
        // For example, you can check if the user is authenticated and redirect if not
        if (status === "authenticated") {
          router.push("/sign-in");
        }

        // Render the wrapped component if authenticated, or show a loading state or error message
      }
    }, [status, router]);

    if (
      status === "authenticated" &&
      (isAdmin(router.pathname) || !isAdmin(router.pathname))
    ) {
      return <WrappedComponent {...props} />;
    }

    return <div>Loading...</div>; // or an error message
  };

  return AuthComponent;
};
