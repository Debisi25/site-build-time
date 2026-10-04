import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-10">
        <div className="font-display text-6xl tracking-[0.3em] md:text-8xl">KORRA</div>
        <div className="mt-14 grid gap-10 border-t border-espresso-foreground/15 pt-10 text-sm md:grid-cols-4">
          <div>
            <p className="eyebrow mb-4 opacity-60">Visit</p>
            <p>14 Akin Adesola Street</p>
            <p>Victoria Island, Lagos</p>
            <p className="mt-3 opacity-70">Tue – Sun · 12pm – 11pm</p>
          </div>
          <div>
            <p className="eyebrow mb-4 opacity-60">Contact</p>
            <a href="tel:+2348000000000" className="block hover:opacity-70">+234 800 000 0000</a>
            <a href="mailto:hello@korra.ng" className="block hover:opacity-70">hello@korra.ng</a>
          </div>
          <div>
            <p className="eyebrow mb-4 opacity-60">Explore</p>
            <div className="flex flex-col gap-1">
              <Link to="/menu" className="hover:opacity-70">Menu</Link>
              <Link to="/our-story" className="hover:opacity-70">Our Story</Link>
              <Link to="/space" className="hover:opacity-70">Space</Link>
              <Link to="/reservations" className="hover:opacity-70">Reservations</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4 opacity-60">Follow</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block hover:opacity-70">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="block hover:opacity-70">TikTok</a>
          </div>
        </div>
        <p className="eyebrow mt-16 opacity-50">© {new Date().getFullYear()} KORRA Lagos</p>
      </div>
    </footer>
  );
}
