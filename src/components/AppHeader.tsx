"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Trening" },
  { href: "/godfoten", label: "Godfoten" },
  { href: "/drillo", label: "Drillo" },
  { href: "/manc", label: "ManC" },
  { href: "/nff", label: "NFF" },
  { href: "/kamp", label: "Kamp" },
  { href: "/opplaering", label: "Opplæring" },
  { href: "/ordliste", label: "Ordliste" },
  { href: "/mindset", label: "Mindset" },
];

export const AppHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600">
            TP
          </span>
          <h1 className="text-lg font-bold text-zinc-900">Treningsplanlegger</h1>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">Staal J15-J16</span>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex gap-1 -mb-px">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                prefetch={false}
                className={`rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-black text-zinc-900"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
