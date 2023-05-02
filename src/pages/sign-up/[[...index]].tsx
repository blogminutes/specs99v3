import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="flex min-h-[100vh] items-center justify-center">
    <SignUp
      appearance={{ elements: {} }}
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
    />
  </div>
);
export default SignUpPage;
