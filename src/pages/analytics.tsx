import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { SubmissionStats } from "~/components/analytics/submission-stats";
import { SubmissionTrends } from "~/components/analytics/charts/submission-trends";
import { DemographicCharts } from "~/components/analytics/charts/demographic-charts";

const Analytics: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Please sign in to view analytics.</div>;
  }

  return (
    <>
      <Head>
        <title>Analytics - DRC Constitution Review Platform</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Analytics Dashboard</h1>
        
        <div className="space-y-8">
          <SubmissionStats />
          <SubmissionTrends />
          <DemographicCharts />
        </div>
      </main>
    </>
  );
};

export default Analytics;