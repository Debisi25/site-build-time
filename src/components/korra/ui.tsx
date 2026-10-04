import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function CtaLink({
  to,
  children,
  variant = "solid",
}: {
  to: "/menu" | "/reservations" | "/our-story" | "/space";
  children: ReactNode;
  variant?: "solid" | "ghost" | "dark";
}) {
  const base = "eyebrow inline-flex items-center justify-center px-7 py-4 transition-colors border";
  const v = {
    solid: "bg-espresso-foreground text-espresso border-espresso-foreground hover:bg-transparent hover:text-espresso-foreground",
    ghost: "border-espresso-foreground/50 text-espresso-foreground hover:bg-espresso-foreground hover:text-espresso",
    dark: "bg-espresso text-espresso-foreground border-espresso hover:bg-transparent hover:text-espresso",
  }[variant];
  return (
    <Link to={to} className={`${base} ${v}`}>
      {children}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-espresso text-espresso-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        <p className="eyebrow opacity-60 rise">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.95] md:text-8xl rise">{title}</h1>
        {children && <div className="mt-8 max-w-xl text-base leading-relaxed opacity-80">{children}</div>}
      </div>
    </section>
  );
}
