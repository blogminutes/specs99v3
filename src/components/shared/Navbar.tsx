import Image from "next/image";
import {
  SignIn,
  SignInButton,
  SignUp,
  SignOutButton,
  useAuth,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import React, { useEffect } from "react";
import { checkSquareApi } from "~/utils/zustand/test";

const Navbar = () => {
  const { isLoaded, userId, sessionId, getToken, isSignedIn } = useAuth();

  const { user } = useUser();

  useEffect(() => {
    checkSquareApi();
  }, []);

  return (
    <nav className="container mx-auto flex w-full items-center rounded-2xl p-2.5 px-8 shadow-primary-sm">
      <div>
        <Image
          src={"/specs99-logo.png"}
          alt="specs99 brand logo"
          width={144}
          height={32}
          className="h-8 w-36"
        />
      </div>
      <div className="ml-auto">{!isSignedIn && <SignInButton />}</div>
      <div className="flex items-center gap-3">
        <span>{user?.firstName}</span>
        {user?.profileImageUrl && (
          <Image
            src={user?.profileImageUrl}
            alt="Asas"
            width={42}
            height={42}
            className="h-10 w-10 rounded-full"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
