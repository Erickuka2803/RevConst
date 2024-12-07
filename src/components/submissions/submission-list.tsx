import { api } from "~/utils/api";

export function SubmissionList() {
  const { data: submissions, isLoading } = api.submission.getUserSubmissions.useQuery();

  if (isLoading) {
    return <div>Loading submissions...</div>;
  }

  if (!submissions?.length) {
    return <div>No submissions yet.</div>;
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {submission.type}
            </span>
            <time className="text-sm text-gray-500">
              {new Date(submission.createdAt).toLocaleDateString()}
            </time>
          </div>
          <p className="mt-2 text-gray-700">{submission.content}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {submission.theme.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}