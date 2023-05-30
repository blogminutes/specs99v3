import React from "react";
import AdminSidebar from "./AdminSidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="container mx-auto flex h-11 min-h-[50rem] rounded-2xl shadow-primary-sm">
      <AdminSidebar />
      <div className="w-[80%]">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
