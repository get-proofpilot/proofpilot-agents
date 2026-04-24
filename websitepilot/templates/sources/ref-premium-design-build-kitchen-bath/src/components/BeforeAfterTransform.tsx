/**
 * BeforeAfterTransform — kitchen/bath transformation slider, adapted from
 * `vertical/ConcreteBeforeAfterDragger.tsx`.
 *
 * The gold-on-cream palette of this preset replaces concrete's high-contrast
 * orange/black. Captions are written for kitchens and baths (not driveways).
 * Three pairs sit in a 2-up grid with the third pair spanning the full row,
 * so the page rhythm feels editorial instead of a tile grid.
 *
 * Photography intent: tightly-framed identical compositions before and after.
 * The drag is the proof — both halves should align so the transformation is
 * legible without commentary.
 */
import { useState, useCallback, useEffect, useRef } from "react";

type Pair = {
  before?: string;
  after?: string;
  caption?: string;
  beforeLabel?: string;
  afterLabel?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  italicAccent?: string;
  hint?: string;
  pairs?: Pair[];
  initialPercent?: number;
};

export default function BeforeAfterTransform({
  eyebrow = "Before. After.",
  heading = "The same room — only better.",
  italicAccent = "drag the slider to see the transformation.",
  hint = "← Drag to compare →",
  pairs = [
    {
      caption:
        "Hillcrest Kitchen — wall removed, beam concealed, full gut to the studs.",
    },
    {
      caption:
        "Park Avenue Primary Bath — tub niche replaced with a wet room and double vanity.",
    },
    {
      caption:
        "Tower Place Powder — original 1990s vanity replaced with a stone trough sink.",
    },
  ],
  initialPercent = 55,
}: Props) {
  return (
    <section className="section section-warm">
      <div className="container-wide">
        <div className="max-w-3xl mb-12">
          <p className="text-h4-label text-brand-gold mb-4">{eyebrow}</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-ink mb-5">{heading}</h2>
          <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold mb-3">
            {italicAccent}
          </p>
          <p className="text-h4-label text-brand-ink-muted">{hint}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pairs.map((p, i) => (
            <Dragger key={i} pair={p} initialPercent={initialPercent} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dragger({ pair, initialPercent }: { pair: Pair; initialPercent: number }) {
  const [pct, setPct] = useState(initialPercent);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPct(next);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setFromClientX(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [setFromClientX]);

  const beforeLabel = pair.beforeLabel ?? "Before";
  const afterLabel = pair.afterLabel ?? "After";

  return (
    <figure>
      <div
        ref={ref}
        onMouseDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          setFromClientX(e.touches[0].clientX);
        }}
        className="relative overflow-hidden rounded-card select-none cursor-ew-resize shadow-card-lift"
        style={{ aspectRatio: "16/10" }}
      >
        {/* Before — twilight gradient placeholder */}
        <div className="absolute inset-0 placeholder-twilight" />
        {pair.before && (
          <img
            src={pair.before}
            alt="before"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* After — architectural gradient placeholder, clipped */}
        <div
          className="absolute inset-0 placeholder-architectural"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        />
        {pair.after && (
          <img
            src={pair.after}
            alt="after"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          />
        )}

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] pointer-events-none bg-brand-gold-soft"
          style={{ left: `${pct}%`, boxShadow: "0 0 0 1px rgba(0,0,0,0.25)" }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center pointer-events-none bg-brand-gold text-brand-cream font-bold"
          style={{ left: `calc(${pct}% - 22px)`, boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }}
          aria-hidden
        >
          &#x21C6;
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 px-2 py-1 text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm bg-brand-black/70 text-brand-cream">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm bg-brand-gold text-brand-cream">
          {afterLabel}
        </span>
      </div>
      {pair.caption && (
        <figcaption className="mt-4 text-body-base text-brand-ink-soft">{pair.caption}</figcaption>
      )}
    </figure>
  );
}
