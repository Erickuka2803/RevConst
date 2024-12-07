import { Button } from "~/components/ui/button";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between space-x-4">
      {currentStep > 0 && (
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      )}
      {currentStep < totalSteps - 1 ? (
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      ) : (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Submitting...</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
      )}
    </div>
  );
}