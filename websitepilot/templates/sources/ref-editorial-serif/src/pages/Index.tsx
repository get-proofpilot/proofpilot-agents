import Header from "../components/Header";
import Hero from "../components/Hero";
import SignatureStats from "../components/SignatureStats";
import Services from "../components/Services";
import Process from "../components/Process";
import Collection from "../components/Collection";
import Ethos from "../components/Ethos";
import EditorialQuote from "../components/EditorialQuote";
import Reviews from "../components/Reviews";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";

/**
 * Editorial-Serif reference page order — mirrors Kingswood Landscape.
 * DO NOT reorder casually. The hero→signature-stats→services→process→collection→
 * ethos→quote→reviews→cta→footer rhythm is the editorial-serif DNA.
 *
 * SIGNATURE MOVES:
 *  - Italic serif H1 ("Outdoor Space") paired with non-italic eyebrow ("Transform Your")
 *  - Floating subcopy + CTA card bottom-right over a full-bleed architectural photo
 *  - Monogram-crown divider between sections
 *  - "01 / 02 / 03" editorial numerals on process steps
 *  - 0px border-radius on every button, input, and card
 *
 * DO NOT USE FOR: trades (plumbing, HVAC, roofing), budget consumer, pure-SaaS.
 * Use SPARINGLY in production — luxury design-build, dental, medical, legal only.
 */
export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <SignatureStats />
      <Services />
      <Process />
      <Collection />
      <Ethos />
      <EditorialQuote />
      <Reviews />
      <CTABand />
      <Footer />
    </>
  );
}
