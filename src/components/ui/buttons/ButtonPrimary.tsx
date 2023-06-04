import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";

const ButtonPrimary: React.FC<{
  text: string;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
}> = (props) => {
  return (
    <motion.button
      className={`ml-auto mt-6 w-fit rounded-lg px-8 py-1 text-lg font-medium text-grey-medium shadow-primary-xsm ${props.className}`}
      type="submit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {props.text}
    </motion.button>
  );
};

export default ButtonPrimary;
