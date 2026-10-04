import { createFileRoute } from "@tanstack/react-router";
import space from "@/assets/space.jpg";
import priv from "@/assets/private.jpg";
import { PageHeader } from "@/components/korra/ui";
import { PrivateChefForm, ReservationForm } from "@/components/korra/Forms";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — KORRA Lagos" },
      { name: "description", content: "Reserve a table at KORRA in Victoria Island, or bring KORRA to your celebration with a private chef." },
      { property: "og:title", content: "Reservations — KORRA Lagos" },
      { property: "og:description", content: "Reserve a table or request a KORRA private chef." },
    ],
  }),
  component: Reservations,
});

function Reservations() {
  return (
    <>
      <PageHeader eyebrow="Reservations" title={<>Keep a seat<br /><em>for us</em></>}>
        Two ways to dine with KORRA — at our table in Victoria Island, or at yours.
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow text-accent">A · Reserve a table</p>
          <h2 className="mt-4 font-display text-6xl leading-none">Dinner at KORRA</h2>
          <div className="mt-10 border p-2"><img src={space} alt="KORRA dining room" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
          <p className="mt-6 text-sm text-muted-foreground">Tables are held for 15 minutes. For parties larger than 10, please request the long table.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <ReservationForm />
        </div>
      </section>

      <section className="bg-espresso text-espresso-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="eyebrow text-accent">B · Private dining</p>
            <h2 className="mt-4 font-display text-6xl leading-none">KORRA at<br /><em>your table</em></h2>
            <p className="mt-6 max-w-sm leading-relaxed opacity-75">
              Our chefs bring the KORRA kitchen to your home or venue — a menu built around your celebration, served the way we serve it here.
            </p>
            <div className="mt-10 border border-espresso-foreground/20 p-2"><img src={priv} alt="Private celebration table" loading="lazy" className="aspect-square w-full object-cover" /></div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-24">
            <PrivateChefForm />
          </div>
        </div>
      </section>
    </>
  );
}
