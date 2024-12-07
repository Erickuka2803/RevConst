import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { UserProfile } from "~/components/profile/user-profile";
import { SubmissionForm } from "~/components/submissions/submission-form";
import { SubmissionList } from "~/components/submissions/submission-list";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - DRC Constitution Review Platform</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Your Profile</h2>
            <UserProfile />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Submit Feedback or Proposal</h2>
            <SubmissionForm />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Your Submissions</h2>
          <SubmissionList />
        </div>
      </main>
    </>
  );
}

export default Dashboard;