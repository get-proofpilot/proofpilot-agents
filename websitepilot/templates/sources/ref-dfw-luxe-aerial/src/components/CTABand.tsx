export default function CTABand() {
  return (
    <section className="bg-accent section-pad">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="font-display text-white text-section-xl leading-[1.02]">
          Ready to break ground on the <span className="text-navy">backyard</span>?
        </h2>
        <p className="font-body text-white/90 text-[17px] mt-5 max-w-xl mx-auto">
          Free on-site consult. 3D render on approval. No high-pressure sales bit.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#quote"
            className="btn-chunk btn-chunk--ghost"
            style={{ boxShadow: '0 5px 0 0 #121A1E' }}
          >
            Start my quote
          </a>
          <a href="tel:" className="btn-chunk" style={{ boxShadow: '0 5px 0 0 #FFFFFF' }}>
            Call (000) 000-0000
          </a>
        </div>
      </div>
    </section>
  );
}
