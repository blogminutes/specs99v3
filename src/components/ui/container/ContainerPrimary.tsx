import React, { HTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
};

const ContainerPrimary: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-[min(6vh,6vw)] px-[min(8vh,8vw)] py-[min(5vh,5vw)] max-[900px]:gap-[min(12vh,12vw)] max-[600px]:px-[min(3vh,3vw)]">
      {children}
    </div>
  );
};

export default ContainerPrimary;
