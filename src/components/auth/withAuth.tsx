import { NextPage } from "next";
import { SessionContext, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type ComponentType, useEffect } from "react";

// const publicPaths = ["/", "/sign-in*", "/sign-up*"];
const adminPaths = ["/admin*"];

// const isPublic = (path: string) => {
//   return publicPaths.find((x) =>
//     path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
//   );
// };

const isAdminPath = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent: NextPage<P> = (props) => {
    const router = useRouter();
    const { status, data } = useSession();

    console.log(data);

    useEffect(() => {
      // Check if the user is authenticated
      // Redirect if not authenticated
      if (status === "unauthenticated") {
        router.push("/login"); // or any other route you want to redirect to
      }
    }, []);

    if (status === "loading") {
      return <div>Loading...</div>; // or a loading/error component if desired
    }

    if (status === "unauthenticated") {
      router.push("/login"); // or any other route you want to redirect to
    }

    if (
      isAdminPath(router.pathname) &&
      (status !== "authenticated" || data?.user.role !== "Admin")
    ) {
      router.push("/");
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
