import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DISHES, type Dish } from "./menu";

type Lines = Record<string, number>;
interface BasketCtx {
  items: { dish: Dish; qty: number }[];
  count: number;
  subtotal: number;
  add: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
}

const Ctx = createContext<BasketCtx | null>(null);
const KEY = "korra-basket";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>({});
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) sessionStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const value = useMemo<BasketCtx>(() => {
    const items = Object.entries(lines)
      .map(([id, qty]) => ({ dish: DISHES.find((d) => d.id === id)!, qty }))
      .filter((l) => l.dish && l.qty > 0);
    return {
      items,
      count: items.reduce((s, l) => s + l.qty, 0),
      subtotal: items.reduce((s, l) => s + l.qty * l.dish.price, 0),
      add: (id, qty) => setLines((p) => ({ ...p, [id]: (p[id] ?? 0) + qty })),
      setQty: (id, qty) =>
        setLines((p) => {
          const n = { ...p };
          if (qty <= 0) delete n[id];
          else n[id] = qty;
          return n;
        }),
      remove: (id) =>
        setLines((p) => {
          const n = { ...p };
          delete n[id];
          return n;
        }),
      open,
      setOpen,
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBasket() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBasket must be inside BasketProvider");
  return c;
}
