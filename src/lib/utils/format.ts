export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-CD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function formatName(firstName: string, lastName: string, surname?: string): string {
  return [firstName, lastName, surname].filter(Boolean).join(" ");
}