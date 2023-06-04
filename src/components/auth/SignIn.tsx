import React, { use, useEffect } from "react";
import Link from "next/link";
import useInput from "~/hooks/useInput";
import * as validators from "~/utils/form-validation/form-validations";
import FormInput from "../ui/form/FormInput";
import ButtonPrimary from "../ui/buttons/ButtonPrimary";
import {
  loginUser,
  useAuthStore,
} from "~/utils/zustand/authStore/useAuthStore";
import { useRouter } from "next/router";

const SignIn = () => {
  const emailInput = useInput<string>(validators.emailValidator, "");
  const passwordInput = useInput<string>(validators.passwordValidator, "");

  const router = useRouter();

  const authStore = useAuthStore((s) => s);
  const { loggedIn, user } = authStore;

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (
      emailInput.error ||
      passwordInput.error ||
      !emailInput.value ||
      !passwordInput.value
    ) {
      emailInput.onBlur();
      passwordInput.onBlur();
      return;
    }
    loginUser(emailInput.value, passwordInput.value, authStore);
  };

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <div className="mt-[20vh] flex items-center">
      <div className="mx-auto w-fit min-w-[40vh] rounded-xl bg-primary px-8 py-8 shadow-primary-sm">
        <h2 className="mx-auto mb-8 bg-gradient-to-b from-primary to-secondary bg-clip-text text-center text-3xl font-medium text-transparent">
          Sign-In
        </h2>
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormInput
            {...emailInput}
            type="email"
            lable="Email"
            errorMessage="Please provide a valid email."
          />
          <FormInput
            {...passwordInput}
            type="password"
            lable="Password"
            errorMessage="Password must contain 8 characters."
          />

          <ButtonPrimary text="Submit" className="w-fit" />
          <p className="ml-auto mt-2 text-center text-sm">
            Not a member?{" "}
            <Link href={"/sign-up"} className="text-secondary">
              Sign-up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
