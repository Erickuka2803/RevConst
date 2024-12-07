import { type PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface AuthProviderProps extends PropsWithChildren {
  session: Session | null;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}