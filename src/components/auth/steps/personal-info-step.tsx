import { type UseFormReturn } from "react-hook-form";
import { AuthFormField } from "../auth-form-field";
import { type SignUpInput } from "~/lib/auth/validation";

interface PersonalInfoStepProps {
  form: UseFormReturn<SignUpInput>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <AuthFormField
          id="firstName"
          label="Prénom"
          autoComplete="given-name"
          {...form.register("firstName")}
          error={form.formState.errors.firstName?.message}
        />

        <AuthFormField
          id="lastName"
          label="Nom"
          autoComplete="family-name"
          {...form.register("lastName")}
          error={form.formState.errors.lastName?.message}
        />
      </div>

      <AuthFormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
    </div>
  );
}