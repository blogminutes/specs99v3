import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mx-auto mb-8 flex w-full items-center rounded-xl p-2.5 px-8 shadow-primary-sm">
      <div>
        <Image
          src={"/specs99-logo.png"}
          alt="specs99 brand logo"
          width={144}
          height={32}
          className="h-8 w-36"
        />
      </div>
      <Link className="ml-auto" href={"/admin/products/create/product"}>
        Add Product
      </Link>
      <Link className="ml-auto" href={"/sign-up"}>
        Sign-up
      </Link>
      <Link className="ml-auto" href={"/sign-in"}>
        Sign-in
      </Link>
      <div className="flex items-center gap-3"></div>
    </nav>
  );
};

export default Navbar;
