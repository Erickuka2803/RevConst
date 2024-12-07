import { type InputHTMLAttributes } from "react";
import { Input } from "~/components/ui/input";

interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthFormField({ label, error, ...props }: AuthFormFieldProps) {
  return (
    <div>
      <label 
        htmlFor={props.id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <Input error={error} {...props} />
      </div>
    </div>
  );
}