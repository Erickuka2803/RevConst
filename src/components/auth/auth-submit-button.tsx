import { Button } from "~/components/ui/button";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface AuthSubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export function AuthSubmitButton({ 
  isLoading, 
  loadingText, 
  text 
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner />
          <span>{loadingText}</span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
}