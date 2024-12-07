import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Form } from "~/components/ui/form";
import { AuthFormField } from "./auth-form-field";
import { AuthSubmitButton } from "./auth-submit-button";
import { AuthError } from "./auth-error";
import { useZodForm } from "~/hooks/use-zod-form";
import { type SignInInput, signInSchema } from "~/lib/auth/validation";
import { AUTH_ERRORS } from "~/lib/auth/constants";

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useZodForm({
    schema: signInSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInput) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        setError(AUTH_ERRORS.INVALID_CREDENTIALS);
      } else if (result?.ok) {
        await router.push("/dashboard");
      }
    } catch (err) {
      setError(AUTH_ERRORS.SERVER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && <AuthError message={error} />}

      <div className="space-y-4">
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />

        <AuthFormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
          error={form.formState.errors.password?.message}
        />
      </div>

      <AuthSubmitButton
        isLoading={isLoading}
        loadingText="Signing in..."
        text="Sign in"
      />
    </Form>
  );
}