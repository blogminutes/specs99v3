import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactStars from "react-stars";
import { AiOutlineHeart } from "react-icons/ai";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.brand}/${product.model}`}
      className="relative flex h-full w-full cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-xl px-[min(.3vw,.3vh)] pb-[min(.8vh,.8vw)] pt-[min(.3vw,.3vh)] text-start shadow-primary-xsm"
    >
      <div className="absolute right-2 top-2">
        <Link
          className="flex h-[clamp(3vh,2rem,3vw)] w-[clamp(3vh,2rem,4.5vw)] items-center  justify-center rounded-full p-1 "
          href={"/sign-up"}
        >
          <AiOutlineHeart className="h-full w-full text-red-400" />
        </Link>{" "}
      </div>
      <div className="rounded-lg">
        <Image
          src={product.coverImage}
          alt={product.brand + " " + product.model}
          width={600}
          height={400}
          className="h-[clamp(14vh,15rem,18vw)] w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-0.5 px-[min(1vw,1vh)] pt-2">
        <h3 className="flex flex-col text-sm">
          <strong className="text-xs font-medium text-grey-light">
            {product.brand}{" "}
          </strong>
          <span className="text-xs">{product.model}</span>
        </h3>
        <span className="text-xs">
          <strong className="font-medium">Size:</strong> {product.size}
        </span>
        {/* <span className="text-sm"> {product.model}</span> */}
        {/* <span className="text-sm">
          <strong className="font-medium">Lens:</strong> {product.lens}
        </span>
        <span className="text-sm">
          <strong className="font-medium">For:</strong> {product.gender}
        </span> */}
        <div className="-mt-0.5 mb-0.5 flex items-center gap-2">
          <span className=" bg-clip-text text-base font-medium text-grey-medium">
            {product.price}{" "}
          </span>
          <span className="relative text-xs">
            {product.mrp}
            <span className="absolute left-[52%] top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-red-500"></span>
          </span>
          <span className="text-xs font-medium text-teal-700">
            ({Math.floor(100 - (product.price / product.mrp) * 100)}% off)
          </span>
        </div>
        <span className=" -mt-1 flex items-center gap-1 text-[10px]">
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

      {/* <div className="flex items-center border-t py-[min(.8vh,.8vw)] ">
        <button className="mx-auto bg-gradient-to-b from-primary to-secondary bg-clip-text text-lg font-medium text-transparent">
          Add To Cart
        </button>
      </div> */}
    </Link>
  );
};

export default ProductCard;
