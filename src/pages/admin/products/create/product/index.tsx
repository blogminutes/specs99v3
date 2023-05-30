import React from "react";
import CreateProduct from "~/components/admin/products/CreateProduct";
import AdminLayout from "~/components/admin/shared/AdminLayout";

const AddProductPage = () => {
  return (
    <AdminLayout>
      <CreateProduct />
    </AdminLayout>
  );
};

export default AddProductPage;
