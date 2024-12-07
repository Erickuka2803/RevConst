import { type PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useAuth } from "~/lib/auth/hooks";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface ProtectedRouteProps extends PropsWithChildren {
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || (requireAdmin && user.role !== "ADMIN")) {
    void router.push("/auth/signin");
    return null;
  }

  return <>{children}</>;
}