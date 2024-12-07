import { type PropsWithChildren } from "react";
import { cn } from "~/lib/utils/cn";

interface FormFieldProps extends PropsWithChildren {
  className?: string;
  error?: string;
}

export function FormField({ children, className, error }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}