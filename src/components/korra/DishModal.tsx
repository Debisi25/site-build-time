import { useEffect, useState } from "react";
import { useBasket } from "@/lib/basket";
import { formatPrice, type Dish } from "@/lib/menu";

export function DishModal({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const { add } = useBasket();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!dish) return;
    setQty(1);
    setAdded(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-8">
      <div className="absolute inset-0 bg-espresso/80 animate-in fade-in duration-300" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dish.name}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-background animate-in fade-in slide-in-from-bottom-6 duration-300 md:grid-cols-2"
      >
        <button
          onClick={onClose}
          className="eyebrow absolute right-4 top-4 z-10 bg-background/90 px-4 py-2"
          aria-label="Close"
        >
          Close
        </button>
        <img src={dish.image} alt={dish.name} className="aspect-square w-full object-cover md:aspect-auto md:h-full" />
        <div className="flex flex-col p-6 md:p-10">
          <p className="eyebrow text-accent">{dish.category}</p>
          <h2 className="mt-3 font-display text-5xl leading-none">{dish.name}</h2>
          <p className="mt-3 font-display text-2xl">{formatPrice(dish.price)}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{dish.description}</p>
          {dish.notes && <p className="eyebrow mt-6 border-t pt-4 text-muted-foreground">{dish.notes}</p>}
          <div className="mt-auto pt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center border">
                <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                <span className="w-10 text-center">{qty}</span>
                <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
              </div>
              <button
                onClick={() => {
                  add(dish.id, qty);
                  setAdded(true);
                  setTimeout(onClose, 600);
                }}
                className="eyebrow h-12 flex-1 bg-espresso text-espresso-foreground transition-colors hover:bg-accent"
              >
                {added ? "Added" : `Add to basket · ${formatPrice(dish.price * qty)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
