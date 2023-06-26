import React from "react";
import AdminSidebar from "./AdminSidebar";
import { withAuth } from "~/components/auth/withAuth";

export interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="mx-auto flex h-full min-h-[50rem] w-full">
      <AdminSidebar />
      <div className="w-[80%]">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
