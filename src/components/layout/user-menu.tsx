import { Fragment } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { type Session } from "next-auth";
import { NotificationBell } from "../notifications/notification-bell";
import { cn } from "~/lib/utils/cn";

interface UserMenuProps {
  session: Session;
}

export function UserMenu({ session }: UserMenuProps) {
  return (
    <div className="flex items-center space-x-4">
      <NotificationBell />
      <Menu as="div" className="relative">
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-drc-blue focus:ring-offset-2">
          <span className="sr-only">Ouvrir le menu utilisateur</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-drc-blue text-white">
            {session.user?.name?.[0] ?? "U"}
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={cn(
                    active ? "bg-gray-50" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Votre Profil
                </Link>
              )}
            </Menu.Item>
            {session.user.role === "ADMIN" && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/admin"
                    className={cn(
                      active ? "bg-gray-50" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Administration
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => void signOut()}
                  className={cn(
                    active ? "bg-gray-50" : "",
                    "block w-full px-4 py-2 text-left text-sm text-gray-700"
                  )}
                >
                  Se déconnecter
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}