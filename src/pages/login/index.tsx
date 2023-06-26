import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import useInput from "~/hooks/useInput";
import * as validators from "~/utils/form-validation/form-validations";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import FormInput from "~/components/ui/form/FormInput";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import { toast } from "react-toastify";

const LoginPage = () => {
  const emailInput = useInput<string>(validators.emailValidator, "");
  const passwordInput = useInput<string>(validators.passwordValidator, "");

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();

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
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: emailInput.value,
      password: passwordInput.value,
    });
    if (res?.error) {
      toast.error(res.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const usersession = useSession();

  useEffect(() => {
    console.log(usersession);
  }, [usersession]);

  return (
    <div className="my-auto flex items-center">
      <div className="mx-auto w-[min(45vh,90vw)] rounded-xl bg-bg-primary px-[min(4vh,4vw)] py-[min(4vh,4vw)] shadow-primary-sm">
        <h2 className="mx-auto mb-8 bg-gradient-to-b from-primary to-secondary bg-clip-text text-center text-3xl font-medium text-transparent">
          Login
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

          <ButtonPrimary
            isLoading={isLoading}
            text="Submit"
            className="w-fit"
          />
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

export default LoginPage;
