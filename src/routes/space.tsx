import { createFileRoute } from "@tanstack/react-router";
import space from "@/assets/space.jpg";
import hero from "@/assets/hero.jpg";
import priv from "@/assets/private.jpg";
import fish from "@/assets/dish-fish.jpg";
import { CtaLink, PageHeader } from "@/components/korra/ui";

export const Route = createFileRoute("/space")({
  head: () => ({
    meta: [
      { title: "The Space — KORRA Lagos" },
      { name: "description", content: "Arched windows, clay, rattan and candlelight — step inside KORRA's dining rooms in Victoria Island." },
      { property: "og:title", content: "The Space — KORRA Lagos" },
      { property: "og:description", content: "Step inside KORRA's dining rooms in Victoria Island." },
    ],
  }),
  component: Space,
});

function Space() {
  return (
    <>
      <PageHeader eyebrow="The Space" title={<>Lit low,<br /><em>built for lingering</em></>}>
        Lime-washed walls, arched windows onto the city, rattan and clay made by hand in Abeokuta.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="border p-2"><img src={space} alt="Main dining room at dusk" loading="lazy" className="aspect-[16/9] w-full object-cover" /></div>
        <div className="mt-6 flex justify-between">
          <p className="eyebrow text-muted-foreground">The main room · 64 seats</p>
          <p className="eyebrow text-muted-foreground">Golden hour, 6:40pm</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4 md:pt-24">
          <h2 className="font-display text-5xl leading-none">The bar room</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">Rattan pendants, deep banquettes and a wall that says what we believe. Come early for zobo spritz; stay for whatever comes off the grill.</p>
        </div>
        <div className="border p-2 md:col-span-8"><img src={hero} alt="Bar room by candlelight" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
      </section>

      <section className="bg-espresso text-espresso-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-12 md:px-10">
          <div className="border border-espresso-foreground/20 p-2 md:col-span-7"><img src={priv} alt="Private dining table" loading="lazy" className="aspect-square w-full object-cover" /></div>
          <div className="flex flex-col justify-between md:col-span-5">
            <div className="border border-espresso-foreground/20 p-2 md:ml-16"><img src={fish} alt="Grilled croaker" loading="lazy" className="aspect-square w-full object-cover" /></div>
            <div className="mt-10">
              <h2 className="font-display text-5xl leading-none">The long table</h2>
              <p className="mt-6 max-w-sm leading-relaxed opacity-75">A private room for up to 18, with its own entrance and a menu shaped around your evening.</p>
              <div className="mt-8"><CtaLink to="/reservations">Reserve</CtaLink></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
