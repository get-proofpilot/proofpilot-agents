import Header from "../components/Header";
import Hero from "../components/Hero";
import AwardsPressRow from "../components/AwardsPressRow";
import PhilosophyStatement from "../components/PhilosophyStatement";
import ProjectCaseStudyGrid from "../components/ProjectCaseStudyGrid";
import OwnerTwilightFeature from "../components/OwnerTwilightFeature";
import CapabilitiesList from "../components/CapabilitiesList";
import TeamCraftsmanship from "../components/TeamCraftsmanship";
import ProcessPremium from "../components/ProcessPremium";
import EditorialQuote from "../components/EditorialQuote";
import CTABandBespoke from "../components/CTABandBespoke";
import ContactBespoke from "../components/ContactBespoke";
import Footer from "../components/Footer";

/**
 * Premium-Design-Build reference page order — Cinco Mosqueteros rhythm
 * normalized to the editorial preset:
 *   header → hero → awards → philosophy → portfolio → owner feature →
 *   capabilities → team → process → quote → CTA band → contact → footer
 *
 * SIGNATURE MOVES:
 *  - Modern sans (Manrope) + italic Fraunces accent phrases
 *  - 4px-radius buttons — not pill, not sharp
 *  - Black / cream / muted gold palette (not Cinco green)
 *  - Portfolio-first (NOT service-first) ordering
 *  - Owner twilight cutout — the Get Local Leads signature beat
 *  - "Start a Project" and "Begin the Conversation" CTAs (never "Get a Quote")
 *
 * DO NOT USE FOR: trades (plumbing, HVAC, roofing), budget consumer,
 * pure-SaaS. Use specifically for $50K+ design-build firms with
 * commissioned architectural or aerial photography.
 */
export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <AwardsPressRow />
      <PhilosophyStatement />
      <ProjectCaseStudyGrid />
      <OwnerTwilightFeature />
      <CapabilitiesList />
      <TeamCraftsmanship />
      <ProcessPremium />
      <EditorialQuote />
      <CTABandBespoke />
      <ContactBespoke />
      <Footer />
    </>
  );
}
