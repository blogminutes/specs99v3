import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "~/utils/zustand/cartStore/useCartStore";
import Image from "next/image";
import ReactStars from "react-stars";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

const variantsBg = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const variantsBody = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Cart: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const { items: cartItems } = useCartStore((c) => c);
  return (
    <>
      <motion.div
        animate={open ? "open" : "closed"}
        variants={{
          open: { pointerEvents: "all" },
          closed: { pointerEvents: "none" },
        }}
        className="fixed right-0 top-0 z-50 h-[100vh] w-[100%]"
      >
        <motion.div
          onClick={() => setOpen(false)}
          animate={open ? "open" : "closed"}
          variants={variantsBg}
          className="bg-blur absolute z-10 h-full w-full bg-grey-light bg-opacity-40 backdrop-blur-[2px]"
        ></motion.div>
        <motion.div
          animate={open ? "open" : "closed"}
          variants={variants}
          transition={{ type: "tween" }}
          className="absolute right-0 z-20 h-full w-[clamp(20vh,30rem,90vw)] bg-white p-[min(3.5vh,3.5vw)] shadow-md"
        >
          <h3 className="border-b pb-4 text-2xl">Cart</h3>
          <div className="flex flex-col gap-3 pt-4">
            {cartItems &&
              cartItems?.map((item) => (
                <div
                  className="flex w-full rounded-lg shadow-primary-xsm"
                  key={item.id}
                >
                  <Image
                    src={item.product.coverImage}
                    alt="Cart Item Image"
                    width={200}
                    height={100}
                    className="h-[clamp(10vh,7rem,10vw)] w-[40%] border-r object-cover"
                  />
                  <div className="flex flex-col gap-0.5 px-[min(1vw,1vh)] py-2">
                    <h3 className="flex flex-col text-sm">
                      <strong className="text-xs font-medium text-grey-light">
                        {item.product.brand}{" "}
                      </strong>
                      <span className="text-xs">{item.product.model}</span>
                    </h3>
                    <span className="text-xs">
                      <strong className="font-medium">Size:</strong>{" "}
                      {item.product.size}
                    </span>
                    {/* <span className="text-sm"> {item.product.model}</span> */}
                    {/* <span className="text-sm">
          <strong className="font-medium">Lens:</strong> {item.product.lens}
        </span>
        <span className="text-sm">
          <strong className="font-medium">For:</strong> {item.product.gender}
        </span> */}
                    <div className="-mt-0.5 mb-0.5 flex items-center gap-2">
                      <span className=" bg-clip-text text-base font-medium text-grey-medium">
                        {item.product.price}{" "}
                      </span>
                      <span className="relative text-xs">
                        {item.product.mrp}
                        <span className="absolute left-[52%] top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-medium text-teal-700">
                        (
                        {Math.floor(
                          100 - (item.product.price / item.product.mrp) * 100
                        )}
                        % off)
                      </span>
                    </div>
                    <span className=" -mt-1 flex items-center gap-1 text-[10px]"></span>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cart;
