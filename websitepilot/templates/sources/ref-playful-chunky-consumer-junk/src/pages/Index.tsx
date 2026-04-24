import Header from "../components/Header";
import Hero from "../components/Hero";
import MarqueeBar from "../components/MarqueeBar";
import MultiStepServiceTypeIntake from "../components/MultiStepServiceTypeIntake";
import JunkServicePhotoTiles from "../components/JunkServicePhotoTiles";
import JunkFlatRatePricingBand from "../components/JunkFlatRatePricingBand";
import TextAPhotoQuotePromise from "../components/TextAPhotoQuotePromise";
import ProcessCards from "../components/ProcessCards";
import ReviewsWithEmoji from "../components/ReviewsWithEmoji";
import ServiceArea from "../components/ServiceArea";
import FaqPlayful from "../components/FaqPlayful";
import CTABandCandy from "../components/CTABandCandy";
import FooterBright from "../components/FooterBright";

/**
 * Pre-composed bundle: ref-playful-chunky-consumer base + JUNK-REMOVAL vertical.
 *
 * Section rhythm tuned for residential + small-commercial junk-removal —
 * the lane where "we haul it / you smile" energy outsells everything else
 * and the differentiator is "text a photo, get a number, no sales call":
 *
 *   1.  Header                       — phone + GET INSTANT QUOTE.
 *   2.  Hero                         — character-led, "WE HAUL IT. YOU SMILE." + express-lane card.
 *   3.  MarqueeBar                   — candy-yellow sliding feature bullets (junk-flavored copy).
 *   4.  MultiStepServiceTypeIntake   [vertical] — 3-step intake (junk type → scale → contact).
 *   5.  JunkServicePhotoTiles        [vertical] — 9 photo tiles of junk types we handle.
 *   6.  JunkFlatRatePricingBand      [vertical] — "Starting at $X" transparent pricing band on dark.
 *   7.  TextAPhotoQuotePromise       [vertical] — "text a photo, quote in 10 min" promise.
 *   8.  ProcessCards                 — How It Works, 3 chunky-rounded steps on cream.
 *   9.  ReviewsWithEmoji             [base playful pattern] — dark + 3 emoji-led testimonials.
 *  10.  ServiceArea                  — pill grid + map placeholder.
 *  11.  FaqPlayful                   — junk-specific FAQs (what we take, won't take, timing, pricing).
 *  12.  CTABandCandy                 [base playful pattern] — candy-red end CTA with twinkle seams.
 *  13.  FooterBright                 — multi-col bright footer.
 *
 * DNA preserved (do NOT change):
 *   - Fira Sans 500–900 UPPERCASE on every display heading.
 *   - 5px button radius — chunky rectangles, NOT pills.
 *   - Navy + candy-yellow + red base; lime ("brand.go") added as the junk
 *     vertical's "go-energy" badge color (used on photo-tile flags + same-day pills).
 *   - Twinkle-light seam dividers between dark <-> light sections.
 */
export default function Index() {
  return (
    <div className="min-h-screen font-body text-brand-ink">
      <Header />
      <main>
        <Hero />
        <MarqueeBar />
        <MultiStepServiceTypeIntake />
        <JunkServicePhotoTiles />
        <JunkFlatRatePricingBand />
        <TextAPhotoQuotePromise />
        <ProcessCards />
        <ReviewsWithEmoji />
        <ServiceArea />
        <FaqPlayful />
        <CTABandCandy />
      </main>
      <FooterBright />
    </div>
  );
}
