import { FormField } from "~/components/ui/form/form-field";
import { FormLabel } from "~/components/ui/form/form-label";
import { Textarea } from "~/components/ui/textarea";

interface SubmissionContentProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SubmissionContent({
  value,
  onChange,
  error,
}: SubmissionContentProps) {
  return (
    <FormField error={error}>
      <FormLabel required>Content</FormLabel>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Enter your feedback or proposal here..."
        className="w-full"
      />
    </FormField>
  );
}