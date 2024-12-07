import { type PropsWithChildren } from "react";
import { Navigation } from "./navigation";

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}