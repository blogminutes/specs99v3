import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import {
  removeFromCart,
  updateCartProductQuantity,
  useCartStore,
} from "~/utils/zustand/cartStore/useCartStore";
import Image from "next/image";
import ReactStars from "react-stars";
import { MdOutlineClose, MdDeleteOutline, MdAdd } from "react-icons/md";
import { GrFormSubtract, GrSubtract } from "react-icons/gr";
import { api } from "~/utils/api";

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
  const apiContext = api.useContext();

  const cartStore = useCartStore((c) => c);

  const { items: cartItems, subtotal } = useCartStore((c) => c);
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
          className="absolute right-0 z-20 flex h-full w-[clamp(20vh,30rem,90vw)] flex-col bg-white p-[min(3.5vh,3.5vw)] shadow-md"
        >
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-2xl">Cart</h3>
            <MdOutlineClose
              onClick={() => setOpen(false)}
              className="cursor-pointer text-2xl"
            />
          </div>
          <div className="flex grow flex-col gap-3 pt-4">
            {cartItems &&
              cartItems?.map((item) => (
                <div
                  className="flex w-full items-center rounded-lg shadow-primary-xsm"
                  key={item.id}
                >
                  <Image
                    src={item.product.coverImage}
                    alt="Cart Item Image"
                    width={200}
                    height={100}
                    className="h-[clamp(10vh,7rem,10vw)] w-[40%] border-r object-cover"
                  />
                  <div className="flex grow flex-col gap-0.5 px-[min(1vw,1vh)] py-2">
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
                  <div className="flex h-full flex-col justify-between gap-10 px-1 py-2">
                    <div className="flex flex-col items-center gap-1.5 text-grey-medium">
                      <button
                        onClick={() => {
                          if (item.quantity < 20) {
                            updateCartProductQuantity({
                              apiContext,
                              cartProduct: item,
                              cartStore,
                              quantity: item.quantity + 1,
                            });
                          }
                        }}
                        className="flex h-4 w-4 items-center justify-center rounded-full border"
                      >
                        <MdAdd className="cursor-pointer text-lg" />
                      </button>
                      <span className="text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateCartProductQuantity({
                              apiContext,
                              cartProduct: item,
                              cartStore,
                              quantity: item.quantity - 1,
                            });
                          }
                        }}
                        className="flex h-4 w-4 items-center justify-center rounded-full border"
                      >
                        <GrFormSubtract className="cursor-pointer text-lg text-grey-medium" />
                      </button>
                    </div>
                    <MdDeleteOutline
                      onClick={() => {
                        removeFromCart({
                          apiContext,
                          cartProduct: item,
                          cartStore: cartStore,
                        });
                      }}
                      className="block cursor-pointer text-lg text-grey-light"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="flex h-fit items-center justify-between border-t pt-4">
            <h3 className="text-base">Subtotal</h3>
            <h3 className="text-base">Rs. {subtotal}</h3>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cart;
