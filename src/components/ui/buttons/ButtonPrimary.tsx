import React, { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { Router, useRouter } from "next/router";
import { GrFormNext } from "react-icons/gr";

const ButtonPrimary: React.FC<{
  text: string;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  isLoading?: boolean;
  link?: string;
}> = (props) => {
  const router = useRouter();
  const onLinkClick = () => {
    router.push(props.link || "/");
  };
  return (
    <motion.button
      className={`relative  ml-auto mt-6 flex w-fit items-center gap-1 overflow-hidden border border-primary bg-gradient-to-b from-primary to-secondary bg-clip-text px-[clamp(4vh,.5rem,4vw)] py-1 text-lg font-medium text-grey-medium text-transparent shadow-primary-sm max-[600px]:text-sm ${
        props.className || ""
      }`}
      type="submit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={props.isLoading}
      onClick={props?.link ? onLinkClick : undefined}
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
      <GrFormNext className="text-xl text-primary max-[600px]:text-sm" />
    </motion.button>
  );
};

export default ButtonPrimary;
