import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContainerPrimary: React.FC<Props> = ({ children }) => {
  return (
    <div className="px-[min(4vh,4vw)] max-[600px]:px-[min(2vh,2vw)]">
      {children}
    </div>
  );
};

export default ContainerPrimary;
