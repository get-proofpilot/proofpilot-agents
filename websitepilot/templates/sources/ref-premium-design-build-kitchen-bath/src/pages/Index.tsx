import Header from "../components/Header";
import Hero from "../components/Hero";
import AwardsPressRow from "../components/AwardsPressRow";
import PhilosophyStatement from "../components/PhilosophyStatement";
import ProjectCaseStudyGrid from "../components/ProjectCaseStudyGrid";
import BeforeAfterTransform from "../components/BeforeAfterTransform";
import DesignBuildSystem from "../components/DesignBuildSystem";
import TeamCraftsmanship from "../components/TeamCraftsmanship";
import FinancingPremium from "../components/FinancingPremium";
import EditorialQuote from "../components/EditorialQuote";
import ContactBespoke from "../components/ContactBespoke";
import Footer from "../components/Footer";

/**
 * Pre-composed bundle: ref-premium-design-build base
 *   (cincomosqueteros.co DNA — Manrope + Fraunces italic accent,
 *    black/cream/muted-gold)
 * specialized for KITCHEN & BATH REMODEL design-build studios.
 *
 * Section rhythm (12 sections):
 *   1.  Header                  — "Start a Project" + "by appointment" sublabel
 *   2.  Hero                    — commissioned kitchen photography placeholder,
 *                                 "Kitchens *designed* for the way you live."
 *   3.  AwardsPressRow          — NKBA / Houzz / Sub-Zero Wolf / press
 *   4.  PhilosophyStatement     — interior architecture, not cabinet swaps
 *   5.  ProjectCaseStudyGrid    — 6 kitchen + bath case studies
 *   6.  BeforeAfterTransform    [vertical] — kitchen/bath transformation slider
 *   7.  DesignBuildSystem       [vertical] — 5-phase Discovery → Reveal arc
 *   8.  TeamCraftsmanship       — designer / lead carpenter / project manager
 *   9.  FinancingPremium        [vertical] — up-to-60-month financing card
 *  10.  EditorialQuote          — single homeowner italic pull-quote
 *  11.  ContactBespoke          — "Begin the Conversation" form
 *  12.  Footer                  — luxe dark, multi-col
 *
 * SIGNATURE MOVES preserved from base:
 *  - Manrope sans + one Fraunces italic accent phrase per section
 *  - 4px-radius buttons — never pill, never sharp
 *  - Black / cream / muted gold palette (NOT a warm counter-tone — the kitchen
 *    palette holds in base; soft terracotta or sage stays optional per client)
 *  - "Start a Project" / "Begin the Conversation" CTAs — NEVER "Get a Quote"
 *  - Portfolio-first ordering: case studies BEFORE the design-build system
 *
 * KITCHEN/BATH SPECIALIZATIONS vs base:
 *  - Hero rewritten for kitchen/bath buyer language ("designed for the way you live")
 *  - Awards row swapped to NKBA / Houzz / Sub-Zero Wolf / interior-design press
 *  - Case studies use kitchen + bath rooms (not hardscape)
 *  - Before/after dragger inserted between portfolio and process — proof-of-work
 *    is the conversion centerpiece for remodel buyers
 *  - "Our Design-Build System" replaces the generic 5-step process with named
 *    phases tied to a 6-month commission calendar
 *  - Team is 3 people (designer / lead carpenter / project manager) not 3 generic
 *    "studio" roles — kitchen/bath buyers want to know exactly who's on their job
 *  - Financing card added — kitchen/bath ticket size warrants it
 *  - Owner twilight feature, capabilities list, generic process, and CTA band
 *    removed from base — the kitchen/bath rhythm is tighter (12 sections, not 13)
 *
 * DO NOT USE FOR: outdoor living / hardscape (use base bundle), tradespeople
 * (use ref-contractor-heritage), or production cabinet companies that don't do
 * full architectural plans.
 */
export default function Index() {
  return (
    <>
      <Header />
      <Hero />
      <AwardsPressRow />
      <PhilosophyStatement />
      <ProjectCaseStudyGrid />
      <BeforeAfterTransform />
      <DesignBuildSystem />
      <TeamCraftsmanship />
      <FinancingPremium />
      <EditorialQuote />
      <ContactBespoke />
      <Footer />
    </>
  );
}
