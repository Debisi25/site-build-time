import { CATEGORIES, formatPrice, type Category, type Dish } from "@/lib/menu";

export function CategoryFilter({ value, onChange }: { value: "all" | Category; onChange: (c: "all" | Category) => void }) {
  return (
    <div className="flex gap-6 overflow-x-auto md:gap-10">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`eyebrow whitespace-nowrap border-b py-3 transition-colors ${value === c.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function MenuSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-4 border-b border-foreground/40 py-3">
      <span className="eyebrow text-muted-foreground">Search</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Prawns, pepper, jollof…"
        className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground/60 md:text-3xl"
      />
      {value && (
        <button onClick={() => onChange("")} className="eyebrow text-muted-foreground">Clear</button>
      )}
    </label>
  );
}

export function DishCard({ dish, index, onOpen }: { dish: Dish; index: number; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group grid w-full grid-cols-[96px_1fr] gap-5 border-b py-6 text-left animate-in fade-in duration-500 md:grid-cols-[160px_1fr_auto] md:gap-8"
    >
      <div className="overflow-hidden border p-1">
        <img src={dish.image} alt={dish.name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")} · {dish.category}</p>
        <h3 className="mt-2 font-display text-3xl leading-none md:text-4xl">{dish.name}</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
        <p className="mt-3 font-display text-xl md:hidden">{formatPrice(dish.price)}</p>
      </div>
      <p className="hidden self-center font-display text-2xl md:block">{formatPrice(dish.price)}</p>
    </button>
  );
}
