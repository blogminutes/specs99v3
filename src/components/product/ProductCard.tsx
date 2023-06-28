import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactStars from "react-stars";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      href={"/"}
      className="flex h-full w-full cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-lg px-[min(.3vw,.3vh)] pt-[min(.3vw,.3vh)] text-center shadow-primary-sm"
    >
      <div className="rounded-lg bg-white">
        <Image
          src={product.coverImage}
          alt={product.brand + " " + product.model}
          width={200}
          height={200}
          className="h-[max(11vh,12vw)] w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-0.5 px-[min(1vw,1vh)]">
        <h3 className="text-base">
          <strong className="text-lg font-medium">{product.brand} -</strong>{" "}
          {product.model}
        </h3>
        <span className="text-sm">
          <strong className="font-medium">Lens:</strong> {product.lens}
        </span>
        <span className="text-sm">
          <strong className="font-medium">Size:</strong> {product.size}
        </span>
        <span className="text-sm">
          <strong className="font-medium">For:</strong> {product.gender}
        </span>
        <div className="my-1 flex items-center justify-center gap-2">
          <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-xl font-normal text-transparent">
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
        <span className="mx-auto -mt-1 flex items-center gap-1 text-[12px]">
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            size={12}
            value={4.5}
            color2={"#ffd700"}
          />{" "}
          (121)
        </span>
      </div>

      <div className="border-t py-[min(1vh,1vw)] ">
        <button className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-lg font-medium text-transparent">
          Add To Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
