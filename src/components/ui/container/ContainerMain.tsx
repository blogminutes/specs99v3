import React, { HTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
};

const ContainerMain: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={
        "mx-auto flex w-full grow flex-col gap-[min(8vh,8vw)] py-[min(6vh,6vw)] max-[900px]:gap-[min(12vh,12vw)]" +
        " " +
        className
      }
    >
      {children}
    </div>
  );
};

export default ContainerMain;
