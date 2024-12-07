import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && !router.pathname.startsWith("/auth")) {
      void router.push("/auth/signin");
    }
  }, [status, router]);

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}

export function useAdmin() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role !== "ADMIN") {
      void router.push("/");
    }
  }, [user, isLoading, router]);

  return {
    isAdmin: user?.role === "ADMIN",
    isLoading,
  };
}