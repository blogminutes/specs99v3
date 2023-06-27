import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      href={"/"}
      className="flex w-[max(22vh,22vw)] cursor-pointer flex-col gap-2 overflow-hidden rounded-lg px-[min(.5vw,.5vh)] pb-[min(1vw,1vh)] pt-[min(.5vw,.5vh)] shadow-primary-sm"
    >
      <div>
        <Image
          src={product.coverImage}
          alt={product.brand + " " + product.model}
          width={200}
          height={200}
          className="h-[max(10vh,10vw)] w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col px-[min(1vw,1vh)]">
        <h3 className="text-base">
          <strong className="text-lg">{product.brand} -</strong> {product.model}
        </h3>
        <span className="text-sm">
          <strong>Size:</strong> {product.size}
        </span>
        <span className="text-sm">
          <strong>For:</strong> {product.gender}
        </span>
        <div className="my-1 flex items-center justify-start gap-2">
          <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-xl font-medium text-secondary">
            {product.price}{" "}
          </span>
          <span className="relative text-[16px]">
            {product.mrp}
            <span className="absolute left-[52%] top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-red-500"></span>
          </span>
          <span className="text-sm font-medium">
            ({Math.floor(100 - (product.price / product.mrp) * 100)}%)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
