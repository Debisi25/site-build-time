import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import story from "@/assets/story.jpg";
import jollof from "@/assets/dish-jollof.jpg";
import space from "@/assets/space.jpg";
import priv from "@/assets/private.jpg";
import { CtaLink } from "@/components/korra/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KORRA — Contemporary Lagos Restaurant" },
      { name: "description", content: "KORRA is a Lagos-rooted restaurant for food, hospitality and gathering. Reserve a table or book a private chef." },
      { property: "og:title", content: "KORRA — Contemporary Lagos Restaurant" },
      { property: "og:description", content: "Food rooted in Lagos. Reserve a table at KORRA." },
    ],
  }),
  component: Home,
});

const explore = [
  { to: "/menu", label: "Menu", line: "Explore the dishes.", img: jollof },
  { to: "/our-story", label: "Our Story", line: "Discover where KORRA comes from.", img: story },
  { to: "/space", label: "Space", line: "Experience the restaurant.", img: space },
  { to: "/reservations", label: "Reservations", line: "Reserve a table or request a private chef.", img: priv },
] as const;

function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-espresso text-espresso-foreground">
        <img src={hero} alt="Candlelit dining room at KORRA with jollof rice and grilled fish" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <p className="eyebrow opacity-70 rise">Victoria Island · Lagos</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] rise">
            Come hungry,<br /><em className="font-light">stay late.</em>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md leading-relaxed opacity-80">
              Lagos cooking, slow evenings and a table that always has room for one more.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaLink to="/reservations">Reserve a table</CtaLink>
              <CtaLink to="/menu" variant="ghost">Explore menu</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="relative md:col-span-5">
          <div className="border p-2">
            <img src={story} alt="Chef finishing beef suya" loading="lazy" width={1008} height={1312} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-6 hidden w-40 border bg-background p-2 md:block lg:-right-16 lg:w-52">
            <img src={jollof} alt="" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-accent">Our story</p>
          <h2 className="mt-5 font-display text-6xl leading-[0.95] md:text-7xl">Food rooted<br />in Lagos</h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            KORRA began with Sunday tables in Surulere — loud, generous, never in a hurry. We cook the food of
            this city with care and serve it the way Lagos taught us: as a reason to gather.
          </p>
          <Link to="/our-story" className="eyebrow mt-10 inline-block border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
            Our story →
          </Link>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-end justify-between border-b border-foreground/20 pb-6">
            <h2 className="font-display text-5xl md:text-6xl">Find your way in</h2>
            <p className="eyebrow hidden text-muted-foreground md:block">Four doors</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
            {explore.map((e, i) => (
              <Link
                key={e.to}
                to={e.to}
                className={`group block ${["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:-mt-24"][i]}`}
              >
                <div className="overflow-hidden border border-foreground/20 p-2">
                  <img src={e.img} alt="" loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i % 3 === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`} />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="eyebrow text-muted-foreground">0{i + 1}</p>
                    <h3 className="mt-1 font-display text-4xl md:text-5xl">{e.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.line}</p>
                  </div>
                  <span className="font-display text-3xl transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
