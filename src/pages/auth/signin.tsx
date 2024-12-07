import { type NextPage } from "next";
import Head from "next/head";
import { SignInForm } from "~/components/auth/sign-in-form";
import { AuthLayout } from "~/components/auth/auth-layout";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In - DRC Constitution Review Platform</title>
      </Head>
      <AuthLayout 
        title="Sign in to your account"
        subtitle="Enter your credentials to access your account"
      >
        <SignInForm />
      </AuthLayout>
    </>
  );
};

export default SignIn;