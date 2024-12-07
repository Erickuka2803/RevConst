import Link from "next/link";
import { CountryFlag } from "../auth/country-flag";

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <CountryFlag className="h-16 w-16" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gradient">
          République Démocratique du Congo
        </h1>
        <p className="text-sm font-medium text-gray-600">
          Plateforme Congolaise pour la Révision Constitutionnelle
        </p>
      </div>
    </Link>
  );
}