import Link from "next/link";

export function AuthButtons() {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/signin"
        className="rounded-md border border-drc-blue px-4 py-2 text-sm font-medium text-drc-blue transition hover:bg-blue-50"
      >
        Se connecter
      </Link>
      <Link
        href="/auth/signup"
        className="rounded-md bg-drc-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
      >
        S'inscrire
      </Link>
    </div>
  );
}