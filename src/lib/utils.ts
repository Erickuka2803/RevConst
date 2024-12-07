import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themes = [
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

export type Theme = typeof themes[number];