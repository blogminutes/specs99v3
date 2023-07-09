import { CaretRightIcon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  {
    category: "Products",
    href: "",
  },
  {
    category: "Users",
    childrens: [
      {
        name: "Add Product",
        href: "/admin/products/create",
        icon: <PlusIcon width={14} height={14} />,
      },
      {
        name: "asa Products",
        href: "/admin/products/create",
        icon: <Pencil2Icon width={14} height={14} />,
      },
    ],
  },
  {
    category: "Orders",
    childrens: [
      {
        name: "Add Product",
        href: "/admin/products/create",
        icon: <PlusIcon width={14} height={14} />,
      },
      {
        name: "Edit Products",
        href: "/admin/products/create",
        icon: <Pencil2Icon width={14} height={14} />,
      },
    ],
  },
  {
    category: "Inventory",
    childrens: [
      {
        name: "Add Product",
        href: "/admin/products/create",
        icon: <PlusIcon width={14} height={14} />,
      },
      {
        name: "Edit Products",
        href: "/admin/products/create",
        icon: <Pencil2Icon width={14} height={14} />,
      },
    ],
  },
];

interface ISidebarLink {
  category: string;
  childrens?: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
}

const AccountSidebar = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex w-[20%] flex-col gap-4 border-r border-r-[#dee2e6] p-4 py-8">
      {sidebarLinks.map((link) => (
        <LinkTree category={link} key={link.category} />
      ))}
      <div className="mx-auto mt-auto w-full select-none rounded-lg px-6 py-1 shadow-primary-xsm	">
        <span className="flex w-full cursor-pointer items-center gap-2 text-lg font-normal">
          <IoLogOutOutline width={22} height={22} className="ml-1" />
          Logout
        </span>
      </div>
    </div>
  );
};

export default AccountSidebar;

const LinkTree: React.FC<{ category: ISidebarLink }> = (props) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const { category } = props;
  const [open, setOpen] = useState(false);
  return (
    <div
      ref={parent}
      className="mx-auto w-full select-none rounded-lg px-6 py-1 shadow-primary-sm"
    >
      <span
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center gap-2 text-lg font-normal"
      >
        <CaretRightIcon
          width={22}
          height={22}
          style={{
            transform: !open ? "rotate(0deg)" : "rotate(90deg)",
            transition: "all .3s",
          }}
        />
        {category.category}
      </span>
      {open && category.childrens && (
        <div className="flex flex-col gap-2.5 py-2 pl-7">
          {category.childrens.map((link) => (
            <Link
              href={link.href}
              className="flex items-center gap-1.5 text-sm"
              key={link.href}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
