export const EDUCATION_LEVELS = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "university", label: "University" },
  { id: "postgraduate", label: "Postgraduate" },
] as const;

export type EducationLevel = typeof EDUCATION_LEVELS[number]["id"];