import { useRouter } from "next/router";
import React, { ComponentType, useEffect } from "react";
import { useAuthStore } from "~/utils/zustand/authStore/useAuthStore";

type WithAuthProps = {
  // Define any specific props your HOC needs
};
const publicPaths = ["/", "/sign-in*", "/sign-up*"];
const adminPaths = ["/admin*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

const isAdmin = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export const withAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthComponent: ComponentType<P> = (props) => {
    const { loggedIn, user } = useAuthStore((s) => s);
    const router = useRouter();

    useEffect(() => {
      if (router) {
        if (
          isAdmin(router.pathname) &&
          (!loggedIn || user?.prefs?.role !== "admin")
        ) {
          router.push("/sign-in");
        }
        // Your authentication logic goes here
        // For example, you can check if the user is authenticated and redirect if not
        if (!loggedIn) {
          router.push("/sign-in");
        }

        // Render the wrapped component if authenticated, or show a loading state or error message
      }
    }, [loggedIn, router]);

    if (
      loggedIn &&
      ((isAdmin(router.pathname) && user?.prefs?.role === "admin") ||
        !isAdmin(router.pathname))
    ) {
      return <WrappedComponent {...props} />;
    }

    return <div>Loading...</div>; // or an error message
  };

  return AuthComponent;
};
