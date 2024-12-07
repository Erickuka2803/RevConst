import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/utils/api";
import { Form } from "~/components/ui/form";
import { SubmissionTypeSelector } from "./submission-type-selector";
import { SubmissionContent } from "./submission-content";
import { ThemeSelector } from "./theme-selector";
import { DocumentUpload } from "./document-upload";
import { SubmissionSteps } from "./submission-steps";
import { StepNavigation } from "./step-navigation";
import { SuccessMessage } from "~/components/ui/success-message";
import { ErrorMessage } from "~/components/ui/error-message";
import { submissionSchema, type SubmissionFormData } from "~/lib/utils/validation";
import { useKeyboardNavigation } from "~/hooks/use-keyboard-navigation";
import { useFormRecovery } from "~/hooks/use-form-recovery";
import { useAutoSave } from "~/hooks/use-auto-save";

const INITIAL_FORM_DATA: SubmissionFormData = {
  type: "FEEDBACK",
  content: "",
  theme: [],
  documents: [],
};

export function SubmissionForm() {
  const [formData, setFormData] = useState<SubmissionFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const { mutate: createSubmission, isLoading } = api.submission.create.useMutation({
    onSuccess: () => {
      setFormData(INITIAL_FORM_DATA);
      setSuccess("Your submission has been received successfully!");
      setErrors({});
      setCurrentStep(0);
      clearSavedData();
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  const { saveFormData, clearSavedData } = useFormRecovery({
    formId: "submission",
    initialData: INITIAL_FORM_DATA,
    onRecover: (data) => {
      setFormData(data);
      setSuccess("Your previous draft has been recovered.");
    },
  });

  useAutoSave({
    data: formData,
    onSave: saveFormData,
    debounceMs: 1000,
  });

  useKeyboardNavigation({
    onNext: handleNext,
    onBack: handleBack,
    canGoNext: currentStep < steps.length - 1,
    canGoBack: currentStep > 0,
    isEnabled: !isLoading,
  });

  const steps = [
    {
      title: "Type",
      component: (
        <SubmissionTypeSelector
          value={formData.type}
          onChange={(type) => setFormData((prev) => ({ ...prev, type }))}
          error={errors.type}
        />
      ),
    },
    {
      title: "Content",
      component: (
        <SubmissionContent
          value={formData.content}
          onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
          error={errors.content}
        />
      ),
    },
    {
      title: "Themes",
      component: (
        <ThemeSelector
          selectedThemes={formData.theme}
          onChange={(theme) => setFormData((prev) => ({ ...prev, theme }))}
          error={errors.theme}
        />
      ),
    },
    {
      title: "Documents",
      component: (
        <DocumentUpload
          documents={formData.documents}
          onDocumentsChange={(documents) =>
            setFormData((prev) => ({ ...prev, documents }))
          }
        />
      ),
    },
  ];

  const validateStep = () => {
    try {
      switch (currentStep) {
        case 0:
          z.object({ type: submissionSchema.shape.type }).parse(formData);
          break;
        case 1:
          z.object({ content: submissionSchema.shape.content }).parse(formData);
          break;
        case 2:
          z.object({ theme: submissionSchema.shape.theme }).parse(formData);
          break;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          Object.fromEntries(
            error.errors.map((err) => [err.path[0], err.message])
          )
        );
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      const validatedData = submissionSchema.parse(formData);
      createSubmission(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          Object.fromEntries(
            error.errors.map((err) => [err.path[0], err.message])
          )
        );
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && <ErrorMessage message={errors.submit} />}
      {success && <SuccessMessage message={success} />}

      <SubmissionSteps steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {steps[currentStep].component}
        </motion.div>
      </AnimatePresence>

      <StepNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onBack={handleBack}
        onNext={handleNext}
        isSubmitting={isLoading}
      />

      <div className="text-sm text-gray-500">
        <p>Press ← and → arrow keys to navigate between steps</p>
        <p>Your progress is automatically saved</p>
      </div>
    </Form>
  );
}