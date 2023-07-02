import React, { useEffect, useState } from "react";
import Link from "next/link";
import useInput from "~/hooks/useInput";
import * as validators from "~/utils/form-validation/form-validations";
import { api } from "~/utils/api";
import { signUp } from "~/utils/zustand/authStore/useAuthStore";
import { useRouter } from "next/router";
import FormInput from "~/components/ui/form/FormInput";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import { useSession } from "next-auth/react";

const SignUpPage = () => {
  const emailInput = useInput<string>(validators.emailValidator, "");
  const passwordInput = useInput<string>(validators.passwordValidator, "");
  const nameInput = useInput<string>(validators.passwordValidator, "");

  const router = useRouter();
  const apiContext = api.useContext();

  const { status } = useSession();

  const [isLoading, setIsLoading] = useState(false);

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

    const res = await signUp(
      apiContext,
      nameInput.value,
      emailInput.value,
      passwordInput.value,
      setIsLoading
    );
    console.log(res);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="my-auto flex items-center py-[15vh]">
      <div className=" mx-auto w-[min(45vh,90vw)] rounded-xl bg-bg-primary px-[min(4vh,4vw)] py-[min(4vh,4vw)] shadow-primary-sm">
        <h2 className="mx-auto mb-8 bg-gradient-to-b from-primary to-secondary bg-clip-text text-center text-3xl font-medium text-transparent">
          Sign-Up
        </h2>
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormInput
            {...nameInput}
            type="text"
            lable="Name"
            errorMessage="Password must contain 3 characters."
          />
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

          <ButtonPrimary
            isLoading={isLoading}
            text="Submit"
            className="w-fit"
          />
          <p className="ml-auto mt-2 text-center text-sm">
            Already a member?{" "}
            <Link href={"/login"} className="text-secondary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
