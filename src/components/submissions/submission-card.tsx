import { type Submission } from "@prisma/client";
import { formatDate } from "~/lib/utils/format";
import { CommentList } from "~/components/comments/comment-list";

interface SubmissionCardProps {
  submission: Submission & {
    comments: Array<{
      id: string;
      content: string;
      createdAt: Date;
      user: {
        firstName: string;
        lastName: string;
      };
    }>;
  };
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {submission.type}
          </span>
          <time className="text-sm text-gray-500">
            {formatDate(submission.createdAt)}
          </time>
        </div>
        <p className="mt-4 text-gray-900">{submission.content}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {submission.theme.map((theme) => (
            <span
              key={theme}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {theme}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Comments</h4>
          <div className="mt-2">
            <CommentList submissionId={submission.id} />
          </div>
        </div>
      </div>
    </div>
  );
}