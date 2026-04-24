const STEPS = [
  {
    n: '01',
    title: 'Consult & Walkthrough',
    body: 'Free on-site visit. We measure, listen, and leave with a realistic scope and timeline.',
  },
  {
    n: '02',
    title: '3D Design & Proposal',
    body: 'Full 3D render of the finished yard, line-item proposal, and material board — not a napkin sketch.',
  },
  {
    n: '03',
    title: 'Excavate & Build',
    body: 'In-house crews dig, steel, plumb, gunite, tile, coping, and decking with weekly photo updates.',
  },
  {
    n: '04',
    title: 'Finish & Walk',
    body: 'Landscape, lighting, startup chemistry, and a final walk — we don\u2019t leave until it\u2019s right.',
  },
  {
    n: '05',
    title: 'Care Plan (Optional)',
    body: 'Weekly service keeps it pristine. Lifetime workmanship warranty on the build itself.',
  },
];

export default function Process() {
  return (
    <section className="bg-mist section-pad">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            How it works
          </p>
          <h2 className="section-headline">
            Your pristine backyard is just <span className="text-accent">5 steps</span> away.
          </h2>
        </div>

        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-stretch"
            >
              <div
                className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-2' : ''} rounded-xl overflow-hidden relative min-h-[220px] bg-gradient-to-br from-twilight via-navy to-accent-ink border border-navy/10`}
              >
                <div className="absolute inset-0 bg-hero-overlay" />
                <div className="absolute top-5 left-5 font-display text-white text-5xl leading-none">
                  {s.n}
                </div>
                <div className="absolute bottom-5 left-5 text-white/50 font-display text-sm">
                  [STEP PHOTO]
                </div>
              </div>

              <div
                className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1' : ''} flex flex-col justify-center bg-white rounded-xl border border-navy/10 p-7`}
              >
                <h3 className="card-headline mb-3">{s.title}</h3>
                <p className="font-body text-navy/75 text-[16px] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
