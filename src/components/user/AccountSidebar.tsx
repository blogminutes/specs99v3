import { CaretRightIcon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

const sidebarLinks = [
  {
    category: "Products",
    childrens: [
      {
        name: "Add Product",
        href: "/admin/products/create",
        icon: <PlusIcon width={14} height={14} />,
      },
      {
        name: "Edit Products",
        href: "/admin/products/category/create",
        icon: <Pencil2Icon width={14} height={14} />,
      },
      {
        name: "Add Category",
        href: "/admin/products/category/create",
        icon: <PlusIcon width={14} height={14} />,
      },
    ],
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
  childrens: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
}

const AccountSidebar = () => {
  return (
    <div className="flex w-[20%] flex-col gap-4 border-r border-r-[#dee2e6] p-4 py-8">
      {sidebarLinks.map((link) => (
        <LinkTree category={link} key={link.category} />
      ))}
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
      className="mx-auto w-full select-none rounded-lg px-6 py-1 shadow-primary-xsm	"
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
      {open && (
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
