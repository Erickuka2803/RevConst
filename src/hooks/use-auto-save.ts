import { useEffect, useRef } from "react";
import { useDebounce } from "./use-debounce";

interface AutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => void | Promise<void>;
  debounceMs?: number;
}

export function useAutoSave<T>({ data, onSave, debounceMs = 1000 }: AutoSaveOptions<T>) {
  const debouncedData = useDebounce(data, debounceMs);
  const previousData = useRef(data);

  useEffect(() => {
    if (JSON.stringify(debouncedData) !== JSON.stringify(previousData.current)) {
      void onSave(debouncedData);
      previousData.current = debouncedData;
    }
  }, [debouncedData, onSave]);
}