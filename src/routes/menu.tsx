import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { DISHES, type Category, type Dish } from "@/lib/menu";
import { PageHeader } from "@/components/korra/ui";
import { CategoryFilter, DishCard, MenuSearch } from "@/components/korra/MenuParts";
import { DishModal } from "@/components/korra/DishModal";
import { BasketButton, BasketDrawer } from "@/components/korra/BasketDrawer";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — KORRA Lagos" },
      { name: "description", content: "Suya, smoky jollof, grilled croaker and more — explore KORRA's Lagos-rooted menu." },
      { property: "og:title", content: "Menu — KORRA Lagos" },
      { property: "og:description", content: "Explore KORRA's Lagos-rooted dishes and drinks." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<"all" | Category>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Dish | null>(null);
  const close = useCallback(() => setActive(null), []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DISHES.filter(
      (d) =>
        (cat === "all" || d.category === cat) &&
        (!term || d.name.toLowerCase().includes(term) || d.description.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  return (
    <>
      <PageHeader eyebrow="The Menu" title={<>From the coals,<br /><em>the pot & the bar</em></>}>
        Dishes we grew up on, cooked with care and served to share.
      </PageHeader>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-12 md:px-10">
        <MenuSearch value={q} onChange={setQ} />
        <div className="mt-6 border-b">
          <CategoryFilter value={cat} onChange={setCat} />
        </div>
        {results.length ? (
          <div key={cat + q}>
            {results.map((d, i) => (
              <DishCard key={d.id} dish={d} index={i} onOpen={() => setActive(d)} />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center">
            <p className="eyebrow text-accent">No dishes found</p>
            <p className="mt-4 font-display text-4xl">Nothing on the pass for “{q}”.</p>
            <p className="mt-3 text-muted-foreground">Try another word — a dish, an ingredient, a flavour.</p>
          </div>
        )}
      </section>
      <DishModal dish={active} onClose={close} />
      <BasketButton />
      <BasketDrawer />
    </>
  );
}
