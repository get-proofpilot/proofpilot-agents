const CITIES = [
  'Southlake',
  'Westlake',
  'Grapevine',
  'Colleyville',
  'Keller',
  'Highland Park',
  'Flower Mound',
  'Trophy Club',
  'Fort Worth',
  'Arlington',
  'Mansfield',
  'Frisco',
  'Plano',
  'McKinney',
];

export default function ServiceArea() {
  return (
    <section className="relative bg-navy text-white section-pad overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-twilight" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 30%, rgba(76,168,222,0.25), transparent 40%), radial-gradient(ellipse at 80% 70%, rgba(76,168,222,0.2), transparent 40%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-10">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            Service area
          </p>
          <h2 className="section-headline text-white">
            We build across <span className="text-accent">Dallas / Fort Worth</span>.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {CITIES.map((c) => (
            <span
              key={c}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 font-body text-[14px] text-white/90 hover:bg-accent hover:border-accent transition"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
