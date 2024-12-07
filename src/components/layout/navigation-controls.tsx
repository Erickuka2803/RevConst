import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "~/lib/utils/cn";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Tableau de bord", href: "/dashboard" },
  { name: "Analyses", href: "/analytics" },
];

export function NavigationControls() {
  const router = useRouter();

  return (
    <nav className="flex justify-center border-t border-gray-200 py-4">
      <div className="flex space-x-16">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative px-3 py-2 text-lg font-medium transition-colors",
              router.pathname === item.href
                ? "text-drc-blue"
                : "text-gray-600 hover:text-gray-900",
              "after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-full after:origin-left after:scale-x-0",
              "after:bg-gradient-to-r after:from-drc-blue after:via-drc-yellow after:to-drc-red",
              "after:transition-transform after:duration-300 hover:after:scale-x-100",
              router.pathname === item.href && "after:scale-x-100"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}