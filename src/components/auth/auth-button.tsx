import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function AuthButton() {
  const { data: sessionData } = useSession();

  return (
    <Button
      onClick={() => void (sessionData ? signOut() : signIn())}
      variant="outline"
    >
      {sessionData ? "Sign out" : "Sign in"}
    </Button>
  );
}