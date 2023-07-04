import React from "react";
import AdminSidebar from "./AccountSidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="mx-auto h-full w-full p-20">
      <div className="flex min-h-[70vh] rounded-xl shadow-primary-md">
        <AdminSidebar />
        <div className="grow rounded-xl">{props.children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
