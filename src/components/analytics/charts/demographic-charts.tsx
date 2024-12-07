import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { api } from "~/utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DemographicCharts() {
  const { data, isLoading } = api.analytics.getSubmissionStats.useQuery();

  if (isLoading || !data) {
    return <div>Loading demographic data...</div>;
  }

  const educationData = {
    labels: Object.keys(data.educationDistribution),
    datasets: [
      {
        data: Object.values(data.educationDistribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const ageData = {
    labels: Object.keys(data.ageDistribution).map(age => `${age} years`),
    datasets: [
      {
        data: Object.values(data.ageDistribution),
        backgroundColor: [
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Education Distribution</h3>
        <Doughnut data={educationData} />
      </div>
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Age Distribution</h3>
        <Doughnut data={ageData} />
      </div>
    </div>
  );
}