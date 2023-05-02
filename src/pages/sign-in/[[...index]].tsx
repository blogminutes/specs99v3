import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex min-h-[100vh] items-center justify-center">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);
export default SignInPage;
