import React from "react";
import withAuth from "~/components/auth/withAuth";
import AccountLayout from "~/components/user/AccountLayout";

const index = () => {
  return (
    <AccountLayout>
      <div>index</div>
    </AccountLayout>
  );
};

export default withAuth(index);
