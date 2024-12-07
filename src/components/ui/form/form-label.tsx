import { type LabelHTMLAttributes } from "react";
import { cn } from "~/lib/utils/cn";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormLabel({ children, className, required, ...props }: FormLabelProps) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700", className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}