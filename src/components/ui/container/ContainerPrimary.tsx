import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContainerPrimary: React.FC<Props> = ({ children }) => {
  return (
    <div className="px-[min(8vh,8vw)] max-[600px]:px-[min(3vh,3vw)]">
      {children}
    </div>
  );
};

export default ContainerPrimary;
