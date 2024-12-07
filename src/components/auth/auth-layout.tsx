import { type PropsWithChildren } from "react";
import { CountryFlag } from "./country-flag";
import { cn } from "~/lib/utils/cn";

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
      <div className="flex min-h-screen">
        {/* Left side - DRC flag and info */}
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-800 p-12 lg:flex">
          <div className="space-y-8">
            <CountryFlag className="h-40 w-64" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-yellow-400">
                République Démocratique du Congo
              </h3>
              <div className="h-1 w-20 bg-drc-yellow" />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4 text-white">
              <h2 className="text-4xl font-bold leading-tight">
                Plateforme de Révision Constitutionnelle
              </h2>
              <p className="text-lg text-gray-300">
                Participez à la construction de l'avenir de notre nation
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-1 bg-drc-blue" />
                <span className="text-lg font-medium text-blue-400">Justice</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-1 bg-drc-yellow" />
                <span className="text-lg font-medium text-yellow-400">Paix</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-1 bg-drc-red" />
                <span className="text-lg font-medium text-red-400">Travail</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="h-2 flex-1 bg-drc-blue" />
            <div className="h-2 flex-1 bg-drc-yellow" />
            <div className="h-2 flex-1 bg-drc-red" />
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className={cn(
          "flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-12",
        )}>
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}