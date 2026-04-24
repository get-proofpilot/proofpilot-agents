import UtilityBar from '../components/UtilityBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PestEmergencyBand from '../components/PestEmergencyBand';
import ServiceRibbon from '../components/ServiceRibbon';
import Intro from '../components/Intro';
import Services from '../components/Services';
import TrustUSPs from '../components/TrustUSPs';
import MidCTABand from '../components/MidCTABand';
import PeaceOfMind from '../components/PeaceOfMind';
import Reviews from '../components/Reviews';
import Comparison from '../components/Comparison';
import SixStepProcess from '../components/SixStepProcess';
import ServiceArea from '../components/ServiceArea';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

/**
 * Pre-composed bundle: rugged-industrial base + PEST CONTROL vertical.
 *
 * Section rhythm tuned for residential pest control in scorpion/termite belt:
 *   1.  UtilityBar              — phone + Google rating ticker
 *   2.  Header                  — logo + nav + quote CTA
 *   3.  Hero                    — split hero w/ inline pest-service-type intake
 *   4.  PestEmergencyBand       [vertical] — "SAME-DAY" oversized kicker
 *   5.  ServiceRibbon           — pest service strip
 *   6.  Intro                   — family-led intro w/ "one family, one set of techs"
 *   7.  Services                — 3-card grid (General Pest / Scorpion / Termite)
 *   8.  TrustUSPs               — pet-safe, family-safe USPs
 *   9.  MidCTABand              [vertical] — bi-monthly $X simplicity band
 *  10.  PeaceOfMind             [vertical] — family team triple portrait
 *  11.  Reviews                 — Google reviews
 *  12.  Comparison              — us vs. national pest mill
 *  13.  SixStepProcess          — six-step pest treatment protocol
 *  14.  ServiceArea             — programmatic areas-served
 *  15.  FAQ                     [vertical] — pest-specific Qs (pet-safe, same-day, bi-monthly)
 *  16.  FinalCTA                — final book band
 *  17.  Footer
 *
 * Richardson v2 learnings baked in:
 *  - Hero leads with same-day + pet-safe (not chemical names).
 *  - PestEmergencyBand sits ABOVE services so emergency callers convert before scrolling.
 *  - Family team portrait row replaces single-founder photo.
 *  - Bi-monthly price is shown upfront in MidCTABand (no discovery-call gate).
 */
export default function Index() {
  return (
    <main className="bg-white">
      <UtilityBar />
      <Header />
      <Hero />
      <PestEmergencyBand />
      <ServiceRibbon />
      <Intro />
      <Services />
      <TrustUSPs />
      <MidCTABand />
      <PeaceOfMind />
      <Reviews />
      <Comparison />
      <SixStepProcess />
      <ServiceArea />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
