import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { ProfileForm } from "~/components/profile/profile-form";

const Profile: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <>
      <Head>
        <title>Profile - DRC Constitution Review Platform</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>
        <ProfileForm />
      </main>
    </>
  );
};

export default Profile;