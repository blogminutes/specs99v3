import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { status, data } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b bg-bg-primary  px-[min(3vh,3vw)] shadow-primary-sm">
      <div>
        <Link href={"/"}>
          <Image
            src={"/specs99-logo.png"}
            alt="specs99 brand logo"
            width={144}
            height={32}
            // className=" max-[600px]:h-[min(6vh,6vw)] max-[600px]:w-[min(24vh,24vw)]"
            className="w-[15vh]"
          />
        </Link>
      </div>
      <Link className="ml-auto" href={"/admin/products/create"}>
        Add Product
      </Link>
      {status !== "authenticated" ? (
        <>
          <Link className="ml-auto" href={"/sign-up"}>
            Sign-up
          </Link>
          <Link className="ml-4" href={"/login"}>
            Login
          </Link>
        </>
      ) : (
        <button className="ml-4 cursor-pointer" onClick={handleLogout}>
          {" "}
          Logout
        </button>
      )}
      <div className="flex items-center gap-3"></div>
    </nav>
  );
};

export default Navbar;
