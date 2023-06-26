import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

const ButtonPrimary: React.FC<{
  text: string;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  isLoading?: boolean;
}> = (props) => {
  return (
    <motion.button
      className={`relative ml-auto mt-6 w-fit overflow-hidden rounded-lg px-8 py-1 text-lg font-medium text-grey-medium shadow-primary-xsm ${props.className}`}
      type="submit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={props.isLoading}
    >
      {props.text}
      {props.isLoading && (
        <span className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-bg-primary">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#7cb567"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </span>
      )}
    </motion.button>
  );
};

export default ButtonPrimary;
