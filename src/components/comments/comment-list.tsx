import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { formatDate, formatName } from "~/lib/utils/format";

interface CommentListProps {
  submissionId: string;
}

export function CommentList({ submissionId }: CommentListProps) {
  const [newComment, setNewComment] = useState("");
  const utils = api.useContext();

  const { data: comments, isLoading } = api.comment.getBySubmission.useQuery({
    submissionId,
  });

  const { mutate: addComment } = api.comment.create.useMutation({
    onSuccess: () => {
      setNewComment("");
      void utils.comment.getBySubmission.invalidate({ submissionId });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment({ submissionId, content: newComment });
    }
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Add Comment
        </Button>
      </form>

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {formatName(comment.user.firstName, comment.user.lastName)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}