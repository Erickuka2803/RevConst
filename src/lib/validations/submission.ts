import { z } from "zod";
import { themes } from "~/lib/utils";

export const submissionSchema = z.object({
  type: z.enum(["FEEDBACK", "PROPOSAL"], {
    required_error: "Please select a submission type",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }),
  theme: z.array(z.enum(themes as unknown as [string, ...string[]])).min(1, {
    message: "Please select at least one theme",
  }),
  documents: z.array(z.string()),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;