import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { AdminDashboard } from "~/components/admin/dashboard";

const Admin: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user || session.user.role !== "ADMIN") {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - DRC Constitution Review Platform</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
        <AdminDashboard />
      </main>
    </>
  );
};

export default Admin;