import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const left = [
  { to: "/menu", label: "Menu" },
  { to: "/our-story", label: "Our Story" },
] as const;
const right = [
  { to: "/space", label: "Space" },
  { to: "/reservations", label: "Reservations" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const linkCls = "eyebrow py-2 opacity-80 transition-opacity hover:opacity-100";
  const active = { className: "!opacity-100 underline underline-offset-8 decoration-1" };

  return (
    <header
      className={`${overHero ? "absolute inset-x-0 top-0 z-40" : "relative z-40 bg-espresso"} text-espresso-foreground`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 py-6 md:px-10">
        <div className="hidden gap-10 md:flex">
          {left.map((l) => (
            <Link key={l.to} to={l.to} className={linkCls} activeProps={active}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden" />
        <Link to="/" className="font-display text-3xl tracking-[0.35em] md:text-4xl" aria-label="KORRA home">
          KORRA
        </Link>
        <div className="hidden justify-end gap-10 md:flex">
          {right.map((l) => (
            <Link key={l.to} to={l.to} className={linkCls} activeProps={active}>
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className="eyebrow justify-self-end py-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div className="border-t border-espresso-foreground/15 bg-espresso px-6 pb-10 pt-6 md:hidden rise">
          {[...left, ...right].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block border-b border-espresso-foreground/10 py-4 font-display text-3xl"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
