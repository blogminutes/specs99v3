import React, { useEffect } from "react";
import Link from "next/link";
import useInput from "~/hooks/useInput";
import * as validators from "~/utils/form-validation/form-validations";
import { api } from "~/utils/api";
import { signUp, useAuthStore } from "~/utils/zustand/authStore/useAuthStore";
import { useRouter } from "next/router";
import FormInput from "~/components/ui/form/FormInput";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";

const SignUp = () => {
  const emailInput = useInput<string>(validators.emailValidator, "");
  const passwordInput = useInput<string>(validators.passwordValidator, "");
  const nameInput = useInput<string>(validators.passwordValidator, "");

  const router = useRouter();
  const apiContext = api.useContext();

  const authStore = useAuthStore((s) => s);
  const { loggedIn, user } = authStore;

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (
      emailInput.error ||
      passwordInput.error ||
      nameInput.error ||
      !nameInput.value ||
      !emailInput.value ||
      !passwordInput.value
    ) {
      emailInput.onBlur();
      passwordInput.onBlur();
      nameInput.onBlur();
      return;
    }

    signUp(nameInput.value, emailInput.value, passwordInput.value, authStore);
  };

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <div className="mt-[20vh] flex items-center">
      <div className="mx-auto w-fit min-w-[40vh] rounded-xl bg-primary px-10 py-12 shadow-primary-sm">
        <h2 className="mx-auto mb-8 bg-gradient-to-b from-primary to-secondary bg-clip-text text-center text-3xl font-medium text-transparent">
          Sign-Up
        </h2>
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormInput
            {...nameInput}
            type="text"
            lable="Name"
            errorMessage="Password must contain 3 characters."
            labelColor="easd"
          />
          <FormInput
            {...emailInput}
            type="email"
            lable="Email"
            errorMessage="Please provide a valid email."
            labelColor="easd"
          />
          <FormInput
            {...passwordInput}
            type="password"
            lable="Password"
            errorMessage="Password must contain 8 characters."
            labelColor="easd"
          />

          <ButtonPrimary text="Submit" className="w-fit" />
          <p className="ml-auto mt-2 text-center text-sm">
            Already a member?{" "}
            <Link href={"/sign-in"} className="text-secondary">
              Sign-in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
