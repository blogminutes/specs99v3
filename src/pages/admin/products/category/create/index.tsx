import React from "react";
import CreateProduct from "~/components/admin/products/CreateProduct";
import AdminLayout from "~/components/admin/shared/AdminLayout";

const CreateCategoryPage = () => {
  return (
    <AdminLayout>
      <CreateProduct />
    </AdminLayout>
  );
};

export default CreateCategoryPage;
