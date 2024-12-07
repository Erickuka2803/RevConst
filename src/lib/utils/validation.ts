import { z } from "zod";
import { THEMES } from "../constants/themes";
import { EDUCATION_LEVELS } from "../constants/education-levels";
import { PROVINCES } from "../constants/provinces";

export const submissionSchema = z.object({
  type: z.enum(["FEEDBACK", "PROPOSAL"], {
    required_error: "Please select a submission type",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }).max(5000, {
    message: "Content must not exceed 5000 characters",
  }),
  theme: z.array(z.enum(THEMES as unknown as [string, ...string[]])).min(1, {
    message: "Please select at least one theme",
  }),
  documents: z.array(z.string().url("Invalid document URL")).optional(),
});

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  surname: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  profession: z.string().min(2, "Profession is required"),
  education: z.enum(EDUCATION_LEVELS.map(e => e.id) as [string, ...string[]]),
  age: z.number().min(18, "Must be at least 18 years old"),
  village: z.string().optional(),
  town: z.string().min(2, "Town is required"),
  territory: z.string().min(2, "Territory is required"),
  province: z.enum(PROVINCES as unknown as [string, ...string[]]),
  country: z.string(),
  region: z.string(),
  nationalId: z.string().optional(),
  voterRegId: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
export type SubmissionFormData = z.infer<typeof submissionSchema>;