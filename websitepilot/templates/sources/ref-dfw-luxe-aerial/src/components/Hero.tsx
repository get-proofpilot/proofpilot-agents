import GoogleStarPill from './GoogleStarPill';

type Props = {
  headlineLead?: string;
  headlineAccent?: string;
  headlineTrail?: string;
  subhead?: string;
  imageUrl?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export default function Hero({
  headlineLead = 'We build DFW',
  headlineAccent = 'backyards',
  headlineTrail = 'that feel like resorts.',
  subhead = 'Custom pools, outdoor living, and concrete-luxe design for Dallas / Fort Worth homeowners who want it done right the first time.',
  imageUrl = '/placeholder-aerial.svg',
  primaryCta = 'Get a Free Quote',
  secondaryCta = 'See the Portfolio',
}: Props) {
  return (
    <section className="relative w-full min-h-[720px] md:min-h-[820px] overflow-hidden bg-navy">
      {/* Full-bleed aerial */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Drone aerial of finished backyard"
          className="w-full h-full object-cover"
        />
        {/* 138deg navy-to-transparent overlay (Anomaly Pool exact formula) */}
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-hero-bottom-fade" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pt-20 md:pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="display-headline text-white">
            {headlineLead}{' '}
            <span className="accent">{headlineAccent}</span>{' '}
            {headlineTrail}
          </h1>

          <p className="mt-6 max-w-xl font-body text-white/85 text-[17px] leading-relaxed">
            {subhead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#quote" className="btn-chunk btn-chunk--dark-bg">
              {primaryCta}
            </a>
            <a href="#portfolio" className="btn-chunk btn-chunk--ghost btn-chunk--dark-bg">
              {secondaryCta}
            </a>
          </div>

          <div className="mt-10">
            <GoogleStarPill />
          </div>
        </div>
      </div>
    </section>
  );
}
