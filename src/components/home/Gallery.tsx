import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useT } from "./lang";
import beforePantry from "../../assets/before-pantry.jpg.asset.json";
import afterPantry from "../../assets/after-pantry.jpg.asset.json";
import beforeCooktop from "../../assets/before-cooktop.jpg.asset.json";
import afterCooktop from "../../assets/after-cooktop.jpg.asset.json";
import beforeSink from "../../assets/before-sink.jpg.asset.json";
import afterSink from "../../assets/after-sink.jpg.asset.json";
import beforeMaster from "../../assets/before-master-bedroom.jpg.asset.json";
import afterMaster from "../../assets/after-master-bedroom.jpg.asset.json";
import beforeKids from "../../assets/before-kids-bedroom.jpg.asset.json";
import afterKids from "../../assets/after-kids-bedroom.jpg.asset.json";

export function Gallery() {
  const { t } = useT();
  const pairs = [
    { before: beforePantry.url, after: afterPantry.url, caption: t.gallery.captions[0] },
    { before: beforeCooktop.url, after: afterCooktop.url, caption: t.gallery.captions[1] },
    { before: beforeSink.url, after: afterSink.url, caption: t.gallery.captions[2] },
    { before: beforeMaster.url, after: afterMaster.url, caption: t.gallery.captions[3] },
    { before: beforeKids.url, after: afterKids.url, caption: t.gallery.captions[4] },
  ];
  const slides = pairs.flatMap((p, i) => [
    { src: p.before, label: t.gallery.before, caption: p.caption, pair: i },
    { src: p.after, label: t.gallery.after, caption: p.caption, pair: i },
  ]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const titleId = useId();
  const descId = useId();
  const liveMsg = useMemo(() => {
    if (openIndex === null) return "";
    const s = slides[openIndex];
    return `${s.label}. ${s.caption}. ${openIndex + 1} ${t.gallery.of ?? "of"} ${slides.length}.`;
  }, [openIndex, slides, t.gallery]);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openAt = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = e.currentTarget;
    setOpenIndex(index);
  };
  const close = () => setOpenIndex(null);
  const next = () => setOpenIndex((i) => (i === null ? i : (i + 1) % slides.length));
  const prev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + slides.length) % slides.length));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      openerRef.current?.focus?.();
      return;
    }
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (active === first || !dialogRef.current.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const current = openIndex !== null ? slides[openIndex] : null;
  const closeLabel = t.gallery.close ?? "Close";
  const prevLabel = t.gallery.prev ?? "Previous image";
  const nextLabel = t.gallery.next ?? "Next image";

  return (
    <section id="gallery" className="border-t border-border" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.gallery.tag}</span>
          <h2 id="gallery-heading" className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.gallery.title1} <em className="italic text-primary">{t.gallery.title2}</em> {t.gallery.title3}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.gallery.sub}
          </p>
        </div>

        <ul className="space-y-16 md:space-y-24" role="list">
          {pairs.map((p, i) => (
            <li key={i}>
              <figure className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <button
                  type="button"
                  onClick={(e) => openAt(i * 2, e)}
                  className="group relative overflow-hidden rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${t.gallery.open ?? "Open"}: ${t.gallery.before} — ${p.caption}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={p.before}
                    alt={`${t.gallery.before} — ${p.caption}`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs uppercase tracking-widest text-foreground shadow-sm">
                    {t.gallery.before}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => openAt(i * 2 + 1, e)}
                  className="group relative overflow-hidden rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${t.gallery.open ?? "Open"}: ${t.gallery.after} — ${p.caption}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={p.after}
                    alt={`${t.gallery.after} — ${p.caption}`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs uppercase tracking-widest text-background shadow-sm">
                    {t.gallery.after}
                  </span>
                </button>
                <figcaption className="md:col-span-2 border-t border-foreground/15 pt-4 text-xs uppercase tracking-widest text-muted-foreground">
                  0{i + 1} · {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && current && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm focus:outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          onClick={close}
          onKeyDown={onDialogKeyDown}
        >
          <div className="sr-only" aria-live="polite" aria-atomic="true">{liveMsg}</div>

          <h2 id={titleId} className="sr-only">{current.label} — {current.caption}</h2>
          <p id={descId} className="sr-only">
            {t.gallery.dialogHint ?? "Use left and right arrow keys to navigate. Press Escape to close."}
          </p>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={closeLabel}
          >
            <span aria-hidden="true" className="text-xl leading-none">×</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8"
            aria-label={prevLabel}
            aria-controls={titleId}
          >
            <span aria-hidden="true" className="text-2xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8"
            aria-label={nextLabel}
            aria-controls={titleId}
          >
            <span aria-hidden="true" className="text-2xl leading-none">›</span>
          </button>

          <div
            className="relative mx-6 flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={`${current.label} — ${current.caption}`}
              className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain"
            />
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-widest ${
                  current.label === t.gallery.after
                    ? "bg-white text-black"
                    : "bg-white/15 text-white"
                }`}
              >
                {current.label}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70">{current.caption}</span>
              <span className="text-xs uppercase tracking-widest text-white/50" aria-hidden="true">
                {String(openIndex! + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
