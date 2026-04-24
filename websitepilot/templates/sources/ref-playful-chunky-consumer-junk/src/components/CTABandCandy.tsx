export default function CTABandCandy() {
  return (
    <section className="relative" aria-label="Same-day junk pickup CTA">
      <div className="lights-divider" aria-hidden />
      <div className="bg-brand-accent">
        <div className="mx-auto max-w-[1320px] px-6 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="kicker text-white/80">Same-Day Available</div>
            <h2 className="display-h1 text-white mt-2">
              {/* {{CTA-H2}} */}
              Pile in the Way? Text Us a Photo Right Now.
            </h2>
            <p className="text-white/90 mt-3 text-[17px] max-w-2xl leading-relaxed">
              {/* {{CTA-P}} */}
              Snap. Send. Sorted. We&rsquo;ll text you a flat-rate quote in 10 minutes — and most days we can have a truck on your driveway today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a href="sms:{{PHONE-RAW}}" className="btn-primary btn-xl">📱 Text a Photo</a>
            <a href="tel:{{PHONE-RAW}}" className="btn-ghost-light">
              {/* {{PHONE-DISPLAY}} */}555-000-0000
            </a>
          </div>
        </div>
      </div>
      <div className="lights-divider" aria-hidden />
    </section>
  );
}
