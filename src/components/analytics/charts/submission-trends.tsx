import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { api } from "~/utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SubmissionTrends() {
  const { data, isLoading } = api.analytics.getSubmissionTrends.useQuery();

  if (isLoading || !data) {
    return <div>Loading trends...</div>;
  }

  const dates = Object.keys(data.dailySubmissions);
  const submissions = Object.values(data.dailySubmissions);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Daily Submissions",
        data: submissions,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Submission Trends (Last 30 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <Line data={chartData} options={options} />
    </div>
  );
}