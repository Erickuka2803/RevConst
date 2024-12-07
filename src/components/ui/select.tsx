import * as React from "react";
import { cn } from "~/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm",
          "focus:border-indigo-500 focus:ring-indigo-500",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Select.displayName = "Select";

export { Select };