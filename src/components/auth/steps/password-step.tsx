import { type UseFormReturn } from "react-hook-form";
import { AuthFormField } from "../auth-form-field";
import { PasswordStrengthIndicator } from "../password-strength-indicator";
import { type SignUpInput } from "~/lib/auth/validation";

interface PasswordStepProps {
  form: UseFormReturn<SignUpInput>;
}

export function PasswordStep({ form }: PasswordStepProps) {
  const password = form.watch("password");

  return (
    <div className="space-y-6">
      <div>
        <AuthFormField
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="new-password"
          {...form.register("password")}
          error={form.formState.errors.password?.message}
        />
        <PasswordStrengthIndicator password={password} />
      </div>

      <div className="rounded-md bg-blue-50 p-4">
        <div className="text-sm text-blue-700">
          <h4 className="font-medium">Le mot de passe doit contenir:</h4>
          <ul className="mt-2 list-inside list-disc">
            <li>Au moins 8 caractères</li>
            <li>Une lettre majuscule</li>
            <li>Une lettre minuscule</li>
            <li>Un chiffre</li>
          </ul>
        </div>
      </div>
    </div>
  );
}