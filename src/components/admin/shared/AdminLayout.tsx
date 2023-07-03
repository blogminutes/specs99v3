import React from "react";
import AdminSidebar from "./AdminSidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="mx-auto h-full  min-h-[50rem] w-full p-20">
      <div className="flex rounded-xl shadow-primary-md">
        <AdminSidebar />
        <div className="grow rounded-xl">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
