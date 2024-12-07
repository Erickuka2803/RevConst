import Image from "next/image";
import { cn } from "~/lib/utils/cn";

interface CountryFlagProps {
  className?: string;
}

export function CountryFlag({ className }: CountryFlagProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg shadow-lg", className)}>
      <Image
        src="/images/drc-flag.svg"
        alt="Drapeau de la République Démocratique du Congo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}