/**
 * ConcreteBeforeAfterDragger — interactive before/after comparison slider.
 *
 * Source: https://concretefixers.com (Carolinas)
 * Signature move: a full-bleed before/after image with a vertical divider
 * handle the user drags. Site-copy pairs it with "Move Left & Right Over The
 * Images" instructional hint. Works for any vertical where proof-of-work
 * is visual AND dramatic (concrete leveling, driveway replacement, roof
 * restoration, pressure wash, car wraps, turf installs).
 *
 * Implementation: React state tracks a 0-100 percentage on mouse/touch drag,
 * and a clip-path on the "after" image reveals left of the handle.
 *
 * WHEN TO USE:
 *  - Concrete / pressure wash / turf / wraps / cleaning / roofing brands
 *  - Any project where the transformation is the sales pitch
 *  - Mid-page proof section — creates scroll stop and interaction
 *
 * WHEN NOT TO USE:
 *  - Services that don't photograph as a before/after (HVAC install internals)
 *  - Image-poor brands — needs 3+ well-aligned pairs to land
 *  - Emergency / repair verticals where speed matters more than beauty
 */
import { useState, useCallback, useEffect, useRef } from "react";

type Pair = {
  before: string;
  after: string;
  caption?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  hint?: string;
  pairs?: Pair[];
  initialPercent?: number;
  brand?: { ink?: string; accent?: string; surface?: string };
};

export default function ConcreteBeforeAfterDragger({
  eyebrow = "See the transformation",
  heading = "Before. After. And nothing hidden in between.",
  hint = "← Drag to see the difference →",
  pairs = [
    { before: "/gallery/before-01.jpg", after: "/gallery/after-01.jpg", caption: "Sunken driveway, leveled in 48 hours" },
    { before: "/gallery/before-02.jpg", after: "/gallery/after-02.jpg", caption: "Cracked patio, restored without replacement" },
    { before: "/gallery/before-03.jpg", after: "/gallery/after-03.jpg", caption: "Trip-hazard walkway, lifted flush" },
  ],
  initialPercent = 55,
  brand = { ink: "#1A1A1A", accent: "#F2A71B", surface: "#F4F1EB" },
}: Props) {
  const ink = brand.ink ?? "#1A1A1A";
  const accent = brand.accent ?? "#F2A71B";
  const surface = brand.surface ?? "#F4F1EB";

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p
            className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-[13px] tracking-[0.18em] uppercase font-semibold opacity-70">
            {hint}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pairs.map((p, i) => (
            <Dragger key={i} pair={p} initialPercent={initialPercent} accent={accent} ink={ink} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dragger({ pair, initialPercent, accent, ink }: { pair: Pair; initialPercent: number; accent: string; ink: string }) {
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
        className="relative overflow-hidden rounded-[6px] select-none cursor-ew-resize"
        style={{ aspectRatio: "16/10", background: "#000" }}
      >
        <img src={pair.before} alt="before" className="absolute inset-0 w-full h-full object-cover" />
        <img
          src={pair.after}
          alt="after"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        />
        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
          style={{ left: `${pct}%`, background: accent, boxShadow: "0 0 0 1px rgba(0,0,0,0.2)" }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center pointer-events-none"
          style={{ left: `calc(${pct}% - 20px)`, background: accent, color: ink, boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}
          aria-hidden
        >
          ⇆
        </div>
        {/* Labels */}
        <span
          className="absolute top-3 left-3 px-2 py-1 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm"
          style={{ background: "rgba(0,0,0,0.6)", color: "#FFF" }}
        >
          Before
        </span>
        <span
          className="absolute top-3 right-3 px-2 py-1 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm"
          style={{ background: accent, color: ink }}
        >
          After
        </span>
      </div>
      {pair.caption && (
        <figcaption className="mt-3 text-[14px] opacity-80">{pair.caption}</figcaption>
      )}
    </figure>
  );
}
