import { type PropsWithChildren } from "react";

interface AuthCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}