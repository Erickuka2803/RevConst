import { useState } from "react";
import { api } from "~/utils/api";
import { formatDate } from "~/lib/utils/format";

export function AdminDashboard() {
  const [filter, setFilter] = useState({
    status: "ALL",
    type: "ALL",
  });

  const { data: submissions, isLoading } = api.admin.getSubmissions.useQuery();
  const { mutate: updateStatus } = api.admin.updateSubmissionStatus.useMutation();

  if (isLoading) {
    return <div>Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <select
          value={filter.status}
          onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
          className="rounded-md border-gray-300"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select
          value={filter.type}
          onChange={(e) => setFilter((prev) => ({ ...prev, type: e.target.value }))}
          className="rounded-md border-gray-300"
        >
          <option value="ALL">All Types</option>
          <option value="FEEDBACK">Feedback</option>
          <option value="PROPOSAL">Proposal</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Content</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Themes</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions?.map((submission) => (
              <tr key={submission.id}>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{submission.type}</td>
                <td className="px-4 py-3 text-sm">{submission.content}</td>
                <td className="px-4 py-3 text-sm">
                  {submission.theme.join(", ")}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{submission.status}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {formatDate(submission.createdAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <select
                    value={submission.status}
                    onChange={(e) =>
                      updateStatus({
                        id: submission.id,
                        status: e.target.value as "PENDING" | "APPROVED" | "REJECTED",
                      })
                    }
                    className="rounded-md border-gray-300"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approve</option>
                    <option value="REJECTED">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}