export const THEMES = [
  "Education",
  "Health",
  "Energy",
  "Infrastructure",
  "Security",
  "Economy",
  "Gender Equality",
  "Justice",
  "Employment",
  "Strong Institutions",
  "Inequalities",
  "Climate",
] as const;

export type Theme = typeof THEMES[number];