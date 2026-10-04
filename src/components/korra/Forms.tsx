import { useState, type ReactNode } from "react";

const inputCls =
  "w-full border-b border-foreground/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-accent";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const today = () => new Date().toISOString().slice(0, 10);
const TIMES = ["12:30", "13:30", "14:30", "18:00", "19:00", "19:30", "20:00", "20:30", "21:30"];

function Summary({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-8 border-t">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 border-b py-3">
          <dt className="eyebrow text-muted-foreground">{k}</dt>
          <dd className="text-right">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ReservationForm() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ date: "", time: "", guests: "2", name: "", email: "", phone: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  if (step === 2)
    return (
      <div className="rise">
        <p className="eyebrow text-accent">Thank you, {f.name.split(" ")[0]}</p>
        <h3 className="mt-4 font-display text-5xl leading-none">Table request received</h3>
        <p className="mt-4 text-muted-foreground">We'll confirm by email at {f.email} shortly.</p>
        <Summary rows={[["Date", new Date(f.date).toDateString()], ["Time", f.time], ["Guests", f.guests], ["Phone", f.phone]]} />
        <button className="eyebrow mt-8 border-b border-foreground pb-1" onClick={() => { setStep(0); setF({ ...f, date: "", time: "" }); }}>Make another request</button>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep((s) => s + 1);
      }}
      className="space-y-8"
    >
      <p className="eyebrow text-muted-foreground">Step {step + 1} of 2 · {step === 0 ? "When" : "Who"}</p>
      {step === 0 ? (
        <>
          <Field label="Date"><input required type="date" min={today()} value={f.date} onChange={set("date")} className={inputCls} /></Field>
          <div>
            <span className="eyebrow text-muted-foreground">Preferred time</span>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {TIMES.map((t) => (
                <button type="button" key={t} onClick={() => setF({ ...f, time: t })}
                  className={`border py-3 text-sm transition-colors ${f.time === t ? "border-espresso bg-espresso text-espresso-foreground" : "border-foreground/25 hover:border-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Field label="Guests">
            <select value={f.guests} onChange={set("guests")} className={inputCls}>
              {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} {i ? "guests" : "guest"}</option>)}
            </select>
          </Field>
          <button disabled={!f.date || !f.time} className="eyebrow w-full bg-espresso py-5 text-espresso-foreground transition-colors hover:bg-accent disabled:opacity-40">Continue</button>
        </>
      ) : (
        <>
          <Field label="Full name"><input required value={f.name} onChange={set("name")} className={inputCls} autoComplete="name" /></Field>
          <Field label="Email"><input required type="email" value={f.email} onChange={set("email")} className={inputCls} autoComplete="email" /></Field>
          <Field label="Phone"><input required type="tel" value={f.phone} onChange={set("phone")} className={inputCls} autoComplete="tel" /></Field>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} className="eyebrow border px-6 py-5">Back</button>
            <button className="eyebrow flex-1 bg-espresso py-5 text-espresso-foreground transition-colors hover:bg-accent">Request table</button>
          </div>
        </>
      )}
    </form>
  );
}

export function PrivateChefForm() {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ date: "", type: "Birthday", guests: "", location: "", name: "", email: "", phone: "", details: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  if (done)
    return (
      <div className="rise">
        <p className="eyebrow text-accent">Request received</p>
        <h3 className="mt-4 font-display text-5xl leading-none">We'll be in touch</h3>
        <p className="mt-4 max-w-md opacity-75">
          Thank you, {f.name.split(" ")[0]}. Our events team will review your request and follow up within two working days to
          shape the menu and confirm availability.
        </p>
        <Summary rows={[["Event", f.type], ["Date", new Date(f.date).toDateString()], ["Guests", f.guests], ["Location", f.location]]} />
      </div>
    );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="grid gap-8 sm:grid-cols-2">
      <Field label="Event date"><input required type="date" min={today()} value={f.date} onChange={set("date")} className={inputCls} /></Field>
      <Field label="Event type">
        <select value={f.type} onChange={set("type")} className={inputCls}>
          {["Birthday", "Wedding", "Anniversary", "Corporate dinner", "Family gathering", "Other"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Number of guests"><input required type="number" min={2} value={f.guests} onChange={set("guests")} className={inputCls} /></Field>
      <Field label="Location"><input required value={f.location} onChange={set("location")} placeholder="Ikoyi, Lekki…" className={inputCls} /></Field>
      <Field label="Full name"><input required value={f.name} onChange={set("name")} className={inputCls} /></Field>
      <Field label="Email"><input required type="email" value={f.email} onChange={set("email")} className={inputCls} /></Field>
      <Field label="Phone"><input required type="tel" value={f.phone} onChange={set("phone")} className={inputCls} /></Field>
      <div className="sm:col-span-2">
        <Field label="Tell us about the event"><textarea rows={3} value={f.details} onChange={set("details")} className={inputCls} /></Field>
      </div>
      <button className="eyebrow bg-espresso-foreground py-5 text-espresso transition-colors hover:bg-accent hover:text-accent-foreground sm:col-span-2">Request a chef</button>
    </form>
  );
}
