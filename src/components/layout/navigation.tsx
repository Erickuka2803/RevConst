import Link from "next/link";
import { useSession } from "next-auth/react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NationalColorsBar } from "./national-colors-bar";
import { AppLogo } from "./app-logo";
import { UserMenu } from "./user-menu";
import { AuthButtons } from "./auth-buttons";
import { NavigationControls } from "./navigation-controls";

export function Navigation() {
  const { data: session } = useSession();

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <NationalColorsBar />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              {/* Top bar with logo and auth */}
              <div className="flex items-center justify-between py-4">
                <AppLogo />
                
                {/* Desktop auth menu */}
                <div className="hidden md:flex md:items-center md:space-x-4">
                  {session ? <UserMenu session={session} /> : <AuthButtons />}
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-drc-blue">
                    <span className="sr-only">Ouvrir le menu principal</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              {/* Navigation controls */}
              <NavigationControls />
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Accueil
              </Link>
              <Link
                href="/dashboard"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Tableau de bord
              </Link>
              <Link
                href="/analytics"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Analyses
              </Link>
            </div>
            {!session && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/auth/signin"
                    className="rounded-md border border-drc-blue px-4 py-2 text-center text-sm font-medium text-drc-blue transition hover:bg-blue-50"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="rounded-md bg-drc-blue px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-600"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}