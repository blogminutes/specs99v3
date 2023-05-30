import React from "react";
import Link from "next/link";
import useInput from "~/hooks/useInput";
import * as validators from "~/utils/form-validation/form-validations";
import FormInput from "../ui/form/FormInput";
import ButtonPrimary from "../ui/buttons/ButtonPrimary";
import { api } from "~/utils/api";

const SignUp = () => {
  const emailInput = useInput(validators.emailValidator, "");
  const passwordInput = useInput(validators.passwordValidator, "");
  const nameInput = useInput(validators.passwordValidator, "");
  const apiContext = api.useContext();

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (emailInput.error || passwordInput.error) {
      emailInput.onBlur();
      passwordInput.onBlur();
      return;
    }
    const res = await apiContext.authentication["sign-up"].fetch({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

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
