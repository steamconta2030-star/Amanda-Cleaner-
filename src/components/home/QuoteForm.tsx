import { useEffect, useState } from "react";
import { useT } from "./lang";
import { waLink } from "./constants";

export function QuoteForm() {
  const { t, lang } = useT();
  const [name, setName] = useState("");
  const [service, setService] = useState(t.quote.services[0]);
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setService(t.quote.services[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      setError(t.quote.required);
      return;
    }
    setError("");
    const lines = [
      t.quote.msgTitle,
      "",
      `${t.quote.fName}: ${name.trim()}`,
      `${t.quote.fService}: ${service}`,
      `${t.quote.fBedrooms}: ${bedrooms}`,
      `${t.quote.fBathrooms}: ${bathrooms}`,
      `${t.quote.fAddress}: ${address.trim()}`,
    ];
    if (date) lines.push(`${t.quote.fDate}: ${date}`);
    if (notes.trim()) lines.push(`${t.quote.fNotes} ${notes.trim()}`);
    const url = waLink(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none";
  const labelCls = "block text-xs uppercase tracking-widest text-muted-foreground mb-2";

  return (
    <section id="quote" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.quote.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.quote.title1} <em className="italic text-primary">{t.quote.title2}</em>{t.quote.title3}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.quote.sub}
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-name">{t.quote.fName} *</label>
            <input id="q-name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required className={inputCls} />
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-service">{t.quote.fService}</label>
            <select id="q-service" value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
              {t.quote.services.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-bed">{t.quote.fBedrooms}</label>
            <select id="q-bed" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={inputCls}>
              {["1", "2", "3", "4", "5+"].map((n) => (<option key={n} value={n}>{n}</option>))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-bath">{t.quote.fBathrooms}</label>
            <select id="q-bath" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className={inputCls}>
              {["1", "2", "3", "4", "5+"].map((n) => (<option key={n} value={n}>{n}</option>))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-addr">{t.quote.fAddress} *</label>
            <input id="q-addr" type="text" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={120} required className={inputCls} />
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-date">{t.quote.fDate}</label>
            <input id="q-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="q-notes">{t.quote.fNotes}</label>
            <textarea id="q-notes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={4} placeholder={t.quote.fNotesPh} className={inputCls} />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {error && (<p role="alert" className="text-sm text-destructive">{error}</p>)}
            <button
              type="submit"
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {t.quote.submit}
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
