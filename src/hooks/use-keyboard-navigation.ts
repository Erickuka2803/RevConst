import { useEffect } from "react";

interface UseKeyboardNavigationOptions {
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isEnabled?: boolean;
}

export function useKeyboardNavigation({
  onNext,
  onBack,
  canGoNext,
  canGoBack,
  isEnabled = true,
}: UseKeyboardNavigationOptions) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "Enter":
          if (canGoNext) {
            e.preventDefault();
            onNext();
          }
          break;
        case "ArrowLeft":
        case "Backspace":
          if (canGoBack) {
            e.preventDefault();
            onBack();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onBack, canGoNext, canGoBack, isEnabled]);
}