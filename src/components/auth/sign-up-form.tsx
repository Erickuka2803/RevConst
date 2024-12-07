import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Form } from "~/components/ui/form";
import { AuthError } from "./auth-error";
import { AuthSubmitButton } from "./auth-submit-button";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { PasswordStep } from "./steps/password-step";
import { useZodForm } from "~/hooks/use-zod-form";
import { type SignUpInput, signUpSchema } from "~/lib/auth/validation";

const STEPS = [
  {
    title: "Informations personnelles",
    component: PersonalInfoStep,
  },
  {
    title: "Sécurité",
    component: PasswordStep,
  },
] as const;

export function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useZodForm({
    schema: signUpSchema,
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const { mutate: createUser, isLoading } = api.user.create.useMutation({
    onSuccess: () => {
      void router.push("/auth/signin?registered=true");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const CurrentStepComponent = STEPS[currentStep].component;

  const handleNext = async () => {
    const isValid = await form.trigger(
      currentStep === 0
        ? ["firstName", "lastName", "email"]
        : ["password"]
    );

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: SignUpInput) => {
    setError(null);
    createUser(data);
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {error && <AuthError message={error} />}

      <div className="relative">
        <div className="absolute left-0 top-2 w-full">
          <div className="flex justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className={`flex-1 border-t-2 ${
                  index <= currentStep
                    ? "border-drc-blue"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className={`text-xs ${
                  index <= currentStep
                    ? "text-drc-blue"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <CurrentStepComponent form={form} />
      </div>

      <div className="flex justify-between space-x-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Retour
          </button>
        )}

        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto rounded-md bg-drc-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Suivant
          </button>
        ) : (
          <AuthSubmitButton
            isLoading={isLoading}
            loadingText="Création du compte..."
            text="Créer un compte"
          />
        )}
      </div>
    </Form>
  );
}