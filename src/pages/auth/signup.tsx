import { type NextPage } from "next";
import Head from "next/head";
import { SignUpForm } from "~/components/auth/sign-up-form";
import { AuthLayout } from "~/components/auth/auth-layout";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Créer un compte - Plateforme de Révision Constitutionnelle RDC</title>
      </Head>
      <AuthLayout 
        title="Créer votre compte"
        subtitle="Participez à la révision constitutionnelle de la RDC"
      >
        <SignUpForm />
      </AuthLayout>
    </>
  );
};

export default SignUp;