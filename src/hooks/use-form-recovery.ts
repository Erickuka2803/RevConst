import { useState, useEffect } from "react";

interface UseFormRecoveryOptions<T> {
  formId: string;
  initialData: T;
  onRecover?: (data: T) => void;
}

export function useFormRecovery<T>({
  formId,
  initialData,
  onRecover,
}: UseFormRecoveryOptions<T>) {
  const [hasRecovered, setHasRecovered] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(`form-draft-${formId}`);
    if (savedData && !hasRecovered) {
      try {
        const parsedData = JSON.parse(savedData) as T;
        onRecover?.(parsedData);
        setHasRecovered(true);
      } catch (error) {
        console.error("Failed to recover form data:", error);
        localStorage.removeItem(`form-draft-${formId}`);
      }
    }
  }, [formId, hasRecovered, onRecover]);

  const saveFormData = (data: T) => {
    localStorage.setItem(`form-draft-${formId}`, JSON.stringify(data));
  };

  const clearSavedData = () => {
    localStorage.removeItem(`form-draft-${formId}`);
  };

  return { saveFormData, clearSavedData, hasRecovered };
}