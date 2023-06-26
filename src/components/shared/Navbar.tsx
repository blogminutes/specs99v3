import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center rounded-t-xl bg-bg-primary p-3.5 px-8 shadow-primary-sm">
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
      {status !== "authenticated" ? (
        <>
          <Link className="ml-4" href={"/sign-up"}>
            Sign-up
          </Link>
          <Link className="ml-4" href={"/login"}>
            Login
          </Link>
        </>
      ) : (
        <button className="ml-4 cursor-pointer" onClick={() => signOut()}>
          {" "}
          Logout
        </button>
      )}
      <div className="flex items-center gap-3"></div>
    </nav>
  );
};

export default Navbar;
