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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-1.5 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        Hopp til innhold
      </a>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600">
            TP
          </span>
          <h1 className="text-lg font-bold text-zinc-900">Treningsplanlegger</h1>
        </div>
        <span className="self-start rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 sm:self-auto">
          Staal J15-J16
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Hovednavigasjon"
          className="-mb-px flex gap-1 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 ${
                  isActive
                    ? "border-black bg-zinc-100/60 font-semibold text-zinc-900"
                    : "border-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
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
