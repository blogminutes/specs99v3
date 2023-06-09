import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useCartStore } from "~/utils/zustand/cartStore/useCartStore";
import Cart from "./Cart";

const Navbar = () => {
  const { status, data } = useSession();

  const { items } = useCartStore((c) => c);

  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between overflow-hidden border-b bg-bg-primary px-[min(8vh,8vw)] shadow-primary-sm  max-[600px]:px-[min(3vh,3vw)]">
      <div>
        <Link href={"/"}>
          <Image
            src={"/specs99-logo.png"}
            alt="specs99 brand logo"
            width={144}
            height={32}
            className="w-[15vh]"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <>
          <Link
            className="flex h-9 w-9 items-center justify-center rounded-full p-2 shadow-primary-md"
            href={"/sign-up"}
          >
            <AiOutlineHeart className="h-full w-full" />
          </Link>
          <button
            onClick={() => setCartIsOpen(!cartIsOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full p-2 shadow-primary-md"
          >
            <BsCart2 className="h-full w-full" />
            {items && (
              <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-grey-primary text-center text-xs text-white">
                {items.length}
              </span>
            )}
          </button>
          <Link
            className="flex h-9 w-9 items-center justify-center rounded-full p-2 shadow-primary-md"
            href={"/account/profile"}
          >
            <AiOutlineUser className="h-full w-full" />
          </Link>
        </>
      </div>
      <Cart open={cartIsOpen} setOpen={setCartIsOpen} />
    </nav>
  );
};

export default Navbar;
