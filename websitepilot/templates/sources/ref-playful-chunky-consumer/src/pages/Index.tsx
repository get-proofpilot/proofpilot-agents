import Header from "../components/Header";
import Hero from "../components/Hero";
import MarqueeBar from "../components/MarqueeBar";
import IntroSplit from "../components/IntroSplit";
import ServicesPlayful from "../components/ServicesPlayful";
import BenefitsGrid from "../components/BenefitsGrid";
import CTABandCandy from "../components/CTABandCandy";
import ProcessCards from "../components/ProcessCards";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import ReviewsWithEmoji from "../components/ReviewsWithEmoji";
import ServiceArea from "../components/ServiceArea";
import FaqPlayful from "../components/FaqPlayful";
import CTAFinal from "../components/CTAFinal";
import FooterBright from "../components/FooterBright";

/**
 * Section order mirrors gosantabanana.com DNA (see ./DNA.md in this folder):
 *   1  Header (dark + navy)
 *   2  Hero (deep-navy radial + inline quote card + twinkle seam)
 *   3  MarqueeBar (candy-yellow sliding feature bullets)
 *   4  IntroSplit (cream + photo + mascot peek)
 *   5  ServicesPlayful (mid-blue, 4-card grid)
 *   6  BenefitsGrid (cream, alternating dark/white 6-tile grid)
 *   7  CTABandCandy (candy-red band with twinkle seams top/bottom)
 *   8  ProcessCards (cream, 3-step dark cards)
 *   9  BeforeAfterGallery (cream, 2x3 before/after placeholder grid)
 *  10  ReviewsWithEmoji (dark, 3 testimonial cards with emoji)
 *  11  ServiceArea (cream, city pills + map placeholder)
 *  12  FaqPlayful (cream, rounded accordion)
 *  13  CTAFinal (dark + twinkle seam, call/text/quote trio)
 *  14  FooterBright (darker, 4-col + utility strip)
 */
export default function Index() {
  return (
    <div className="min-h-screen font-body text-brand-ink">
      <Header />
      <main>
        <Hero />
        <MarqueeBar />
        <IntroSplit />
        <ServicesPlayful />
        <BenefitsGrid />
        <CTABandCandy />
        <ProcessCards />
        <BeforeAfterGallery />
        <ReviewsWithEmoji />
        <ServiceArea />
        <FaqPlayful />
        <CTAFinal />
      </main>
      <FooterBright />
    </div>
  );
}
