import { FormField } from "~/components/ui/form/form-field";
import { FormLabel } from "~/components/ui/form/form-label";
import { Select } from "~/components/ui/select";

interface SubmissionTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SubmissionTypeSelector({
  value,
  onChange,
  error,
}: SubmissionTypeSelectorProps) {
  return (
    <FormField error={error}>
      <FormLabel required>Type</FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      >
        <option value="FEEDBACK">Feedback</option>
        <option value="PROPOSAL">Proposal</option>
      </Select>
    </FormField>
  );
}