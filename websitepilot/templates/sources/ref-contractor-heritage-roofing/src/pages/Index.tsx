import PromoBarTop from "../components/PromoBarTop";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBarIcons from "../components/TrustBarIcons";
import RoofingSignatureSystem from "../components/RoofingSignatureSystem";
import Services from "../components/Services";
import RoofingTeamLedProcess from "../components/RoofingTeamLedProcess";
import CouponsGrid from "../components/CouponsGrid";
import FinancingCallout from "../components/FinancingCallout";
import ServiceAreaMap from "../components/ServiceAreaMap";
import RoofingVisualizerCta from "../components/RoofingVisualizerCta";
import FAQLongFormSEO from "../components/FAQLongFormSEO";
import DarkContactBand from "../components/DarkContactBand";
import Footer from "../components/Footer";

/**
 * Pre-composed bundle: contractor-heritage base + ROOFING vertical patterns.
 *
 * Section rhythm tuned for roofing/exterior contractors:
 *   1.  PromoBarTop                — heritage promo strip
 *   2.  Header                     — logo + nav + CTA
 *   3.  Hero                       — split hero with inline quote form (Hook DNA)
 *   4.  TrustBarIcons              — 4-icon trust band
 *   5.  RoofingSignatureSystem     — named "Protect Your Nest"-style system block
 *   6.  Services                   — 3-card services grid (roofing, siding, gutters)
 *   7.  RoofingTeamLedProcess      — team-led process with headshots + quotes
 *   8.  CouponsGrid                — heritage coupon grid
 *   9.  FinancingCallout           — roofing financing band ($3k+ ticket)
 *  10.  ServiceAreaMap             — areas served programmatic surface
 *  11.  RoofingVisualizerCta       — "Try Before You Buy" visualizer band
 *  12.  FAQLongFormSEO             — 12-15 SEO FAQ accordion
 *  13.  DarkContactBand            — final CTA dark band
 *  14.  Footer
 *
 * DO NOT reorder casually — promo → hero → trust → signature-system rhythm
 * is what makes this read as a roofing-vertical specialization rather than
 * a generic Bears Plumbing clone.
 */
export default function Index() {
  return (
    <>
      <PromoBarTop />
      <Header />
      <Hero />
      <TrustBarIcons />
      <RoofingSignatureSystem
        brand={{
          ink: "#231F20",
          primary: "#EF3E33",
          primaryInk: "#FFFFFF",
          surface: "#F4F6F8",
          accent: "#231F20",
        }}
      />
      <Services />
      <RoofingTeamLedProcess
        brand={{ ink: "#231F20", accent: "#EF3E33", surface: "#F4F6F8", card: "#FFFFFF" }}
      />
      <CouponsGrid />
      <FinancingCallout />
      <ServiceAreaMap />
      <RoofingVisualizerCta
        brand={{ ink: "#231F20", primary: "#EF3E33", primaryInk: "#FFFFFF", surface: "#F4F6F8" }}
      />
      <FAQLongFormSEO />
      <DarkContactBand />
      <Footer />
    </>
  );
}
