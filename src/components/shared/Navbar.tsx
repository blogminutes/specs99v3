import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  logoutUser,
  useAuthStore,
} from "~/utils/zustand/authStore/useAuthStore";

const Navbar = () => {
  const authStore = useAuthStore((s) => s);
  const { loggedIn } = authStore;

  return (
    <nav className="flex w-full items-center rounded-t-xl p-3.5 px-8 shadow-primary-sm">
      <div>
        <Link href={"/"}>
          <Image
            src={"/specs99-logo.png"}
            alt="specs99 brand logo"
            width={144}
            height={32}
            className="h-8 w-36"
          />
        </Link>
      </div>
      <Link className="ml-auto" href={"/admin/products/create"}>
        Add Product
      </Link>
      {!loggedIn ? (
        <>
          <Link className="ml-4" href={"/sign-up"}>
            Sign-up
          </Link>
          <Link className="ml-4" href={"/sign-in"}>
            Sign-in
          </Link>
        </>
      ) : (
        <button
          className="ml-4 cursor-pointer"
          onClick={() => logoutUser(authStore)}
        >
          {" "}
          Logout
        </button>
      )}
      <div className="flex items-center gap-3"></div>
    </nav>
  );
};

export default Navbar;
