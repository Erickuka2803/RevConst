import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { api } from "~/utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function SubmissionStats() {
  const { data: stats, isLoading } = api.analytics.getSubmissionStats.useQuery();

  if (isLoading || !stats) {
    return <div>Loading statistics...</div>;
  }

  const themeData = {
    labels: Object.keys(stats.themeDistribution),
    datasets: [
      {
        data: Object.values(stats.themeDistribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const provinceData = {
    labels: Object.keys(stats.provinceDistribution),
    datasets: [
      {
        label: "Submissions by Province",
        data: Object.values(stats.provinceDistribution),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Submissions by Theme</h3>
          <div className="h-64">
            <Doughnut data={themeData} />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Submissions by Province</h3>
          <div className="h-64">
            <Bar data={provinceData} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <h4 className="text-sm font-medium text-blue-900">Total Submissions</h4>
          <p className="mt-2 text-3xl font-bold text-blue-900">
            {stats.totalSubmissions}
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <h4 className="text-sm font-medium text-green-900">Approved</h4>
          <p className="mt-2 text-3xl font-bold text-green-900">
            {stats.approvedSubmissions}
          </p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-4">
          <h4 className="text-sm font-medium text-yellow-900">Pending</h4>
          <p className="mt-2 text-3xl font-bold text-yellow-900">
            {stats.pendingSubmissions}
          </p>
        </div>
      </div>
    </div>
  );
}