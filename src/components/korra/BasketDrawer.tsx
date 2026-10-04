import { useEffect, useState } from "react";
import { useBasket } from "@/lib/basket";
import { formatPrice } from "@/lib/menu";

export function BasketButton() {
  const { count, setOpen } = useBasket();
  return (
    <button
      onClick={() => setOpen(true)}
      className="eyebrow fixed bottom-5 right-5 z-30 flex items-center gap-3 border border-espresso-foreground/20 bg-espresso px-6 py-4 text-espresso-foreground transition-transform hover:-translate-y-0.5 md:bottom-8 md:right-8"
    >
      Basket
      <span className="font-display text-lg leading-none tracking-normal">{count}</span>
    </button>
  );
}

export function BasketDrawer() {
  const { items, subtotal, setQty, remove, open, setOpen } = useBasket();
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (!open) return setReview(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-espresso/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Basket"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b px-6 py-6">
          <h2 className="font-display text-4xl">{review ? "Your order" : "Basket"}</h2>
          <button onClick={() => setOpen(false)} className="eyebrow py-2">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-3xl">Your basket is empty</p>
              <p className="mt-3 text-sm text-muted-foreground">Choose a dish from the menu to begin.</p>
            </div>
          ) : (
            items.map(({ dish, qty }) => (
              <div key={dish.id} className="flex gap-4 border-b py-5">
                <img src={dish.image} alt={dish.name} className="h-20 w-20 flex-none object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <p className="font-display text-xl leading-tight">{dish.name}</p>
                    <p className="text-sm">{formatPrice(dish.price * qty)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatPrice(dish.price)} each</p>
                  {!review && (
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border">
                        <button className="h-9 w-9" onClick={() => setQty(dish.id, qty - 1)} aria-label="Decrease">−</button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button className="h-9 w-9" onClick={() => setQty(dish.id, qty + 1)} aria-label="Increase">+</button>
                      </div>
                      <button onClick={() => remove(dish.id)} className="eyebrow text-muted-foreground hover:text-foreground">Remove</button>
                    </div>
                  )}
                  {review && <p className="mt-2 text-xs">Qty {qty}</p>}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-6 py-6">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-display text-3xl">{formatPrice(subtotal)}</span>
            </div>
            {review ? (
              <>
                <p className="mt-4 text-sm text-muted-foreground">
                  Online ordering isn't live yet — please show this summary to your server or call us to place it.
                </p>
                <button onClick={() => setReview(false)} className="eyebrow mt-5 w-full border py-4">Edit basket</button>
              </>
            ) : (
              <button onClick={() => setReview(true)} className="eyebrow mt-5 w-full bg-espresso py-4 text-espresso-foreground hover:bg-accent transition-colors">
                Review order
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
