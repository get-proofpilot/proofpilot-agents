/**
 * Partnerships — 10-logo grayscale strip. H2 centered. No copy.
 * Bears uses this for manufacturer/association credibility: Bradford White, A. O. Smith, etc.
 */
export default function Partnerships() {
  const count = 10;
  return (
    <section className="section-sm bg-brand-gray-tint">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-8">Our Awesome Partnerships</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {[...Array(count)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-btn bg-brand-white border border-brand-gray-soft flex items-center justify-center text-brand-gray-text text-xs uppercase font-bold"
            >
              Logo {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
