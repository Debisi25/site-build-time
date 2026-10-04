import { createFileRoute } from "@tanstack/react-router";
import story from "@/assets/story.jpg";
import hero from "@/assets/hero.jpg";
import egusi from "@/assets/dish-egusi.jpg";
import { CtaLink, PageHeader } from "@/components/korra/ui";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — KORRA Lagos" },
      { name: "description", content: "How Sunday tables in Lagos became KORRA: food, hospitality and the art of gathering." },
      { property: "og:title", content: "Our Story — KORRA Lagos" },
      { property: "og:description", content: "Where KORRA comes from, and why we cook the way we do." },
    ],
  }),
  component: Story,
});

const chapters = [
  { n: "I", title: "The table", text: "Every Sunday in Surulere, the table grew. Neighbours, cousins, the friend of a friend. Nobody was ever turned away, and nobody ever left hungry." },
  { n: "II", title: "The market", text: "We shop the way our mothers did — Mile 12 for pepper, Epe for fish, the women of Oyingbo for the yam. Good cooking starts with knowing who grew it." },
  { n: "III", title: "The welcome", text: "Hospitality in Lagos is loud, warm and generous. At KORRA it's also careful: a water glass refilled before you ask, a dish explained by the person who cooked it." },
];

function Story() {
  return (
    <>
      <PageHeader eyebrow="Our Story" title={<>A city that<br /><em>feeds you</em></>}>
        KORRA is a love letter to Lagos — its markets, its kitchens and its habit of turning dinner into an occasion.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="border p-2"><img src={hero} alt="KORRA dining room" loading="lazy" className="aspect-[16/8] w-full object-cover" /></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        {chapters.map((c, i) => (
          <div key={c.n} className="grid gap-6 border-t py-14 md:grid-cols-12">
            <p className="font-display text-5xl text-accent md:col-span-2">{c.n}</p>
            <h2 className="font-display text-5xl md:col-span-4">{c.title}</h2>
            <p className="max-w-lg leading-relaxed text-muted-foreground md:col-span-6">{c.text}</p>
            {i === 1 && (
              <div className="grid grid-cols-2 gap-4 md:col-span-8 md:col-start-5 md:mt-8">
                <div className="border p-2"><img src={story} alt="Chef plating suya" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
                <div className="mt-16 border p-2"><img src={egusi} alt="Egusi and pounded yam" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="bg-espresso text-espresso-foreground">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10">
          <p className="font-display text-4xl italic leading-tight md:text-6xl">“Come as a guest, leave as family.”</p>
          <div className="mt-12"><CtaLink to="/reservations">Reserve a table</CtaLink></div>
        </div>
      </section>
    </>
  );
}
